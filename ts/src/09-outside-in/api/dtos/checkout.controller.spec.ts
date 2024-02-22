import {CheckoutController} from "../checkout.controller";
import {CheckoutRequestDto} from "./checkout-request.dto";

describe('CheckoutController', () => {

    it('should throw a BadRequestException if the basketId is not provided', () => {
        const ctrl = new CheckoutController();
        const request: CheckoutRequestDto = {
            paymentDetails: {},
            shippingDetails: {}
        } as CheckoutRequestDto;


        expect(() => ctrl.checkout(request)).toThrowError('basketId is required');
    })
});
