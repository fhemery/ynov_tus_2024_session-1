import {ReceiptPrinter} from "../src/ReceiptPrinter";
import {Receipt} from "../src/model/Receipt";
import {Product} from "../src/model/Product";

describe('Receipt printer', () => {
    let receiptPrinter : ReceiptPrinter;

    beforeEach(() => {
        receiptPrinter = new ReceiptPrinter();
    })

    it('should return an empty receipt with 0 as total when no product', () => {
       const printedReceipt = receiptPrinter.printReceipt(new Receipt());

       expect(printedReceipt).toMatchSnapshot();
    });

    it('should return a single product in the receipt when there is one product', () => {
        const receipt = new Receipt();
        receipt.addProduct(new Product("Apples", 2), 3, 2.50, 7.50 );

        const printedReceipt = receiptPrinter.printReceipt(receipt);

        expect(printedReceipt).toMatchSnapshot();
    });
});
