import {Teller} from "../src/model/Teller";
import {FakeCatalog} from "./FakeCatalog";
import {ShoppingCart} from "../src/model/ShoppingCart";
import {Product} from "../src/model/Product";
import {ProductUnit} from "../src/model/ProductUnit";
import {SpecialOfferType} from "../src/model/SpecialOfferType";
import {Receipt} from "../src/model/Receipt";

describe('Teller', () => {
    let teller: Teller;
    let catalog: FakeCatalog;

    beforeEach(()=> {
        catalog = new FakeCatalog();
        teller = new Teller(catalog);
    });

    it('should return an empty receipt for an empty basket', () => {
        // ARRANGE
        const shoppingCart = new ShoppingCart();

        // ACT
        const receipt = teller.checksOutArticlesFrom(shoppingCart);

        // ASSERT
        expect(receipt.getTotalPrice()).toBe(0);
        expect(receipt.getDiscounts()).toHaveLength(0);
        expect(receipt.getItems()).toHaveLength(0);
    });

    it('should return the right data for one product', () => {
        // ARRANGE
        let apples = new Product("Apples", ProductUnit.Kilo);
        catalog.addProduct(apples, 5);
        const shoppingCart = new ShoppingCart();
        shoppingCart.addItem(apples);

        // ACT
        const receipt = teller.checksOutArticlesFrom(shoppingCart);

        // ASSERT
        expect(receipt.getTotalPrice()).toBe(5);
        expect(receipt.getItems()).toHaveLength(1);
        expect(receipt.getItems()[0].product).toEqual(apples);

        // To avoid ! White box testing on private fields !
        // expect(receipt).toMatchSnapshot();
    });

    describe('when we have one product with one discount', () => {
        let receipt: Receipt;
        let apples: Product;
        beforeEach(()=> {
            // ARRANGE
            apples = new Product("Apples", ProductUnit.Kilo);
            catalog.addProduct(apples, 5);

            const shoppingCart = new ShoppingCart();
            shoppingCart.addItem(apples);
            teller.addSpecialOffer(SpecialOfferType.TenPercentDiscount, apples, 10);

            // ACT
            receipt = teller.checksOutArticlesFrom(shoppingCart);
        });

        it('should return the right price with the discount included', () => {
            expect(receipt.getTotalPrice()).toBe(4.50);
        });

        it('should have the right item', () => {
            expect(receipt.getItems()).toHaveLength(1);
            expect(receipt.getItems()[0].product).toEqual(apples);
        });

        // Add more expects regarding returned discounts
    });


});
