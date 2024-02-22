import {CheckoutRequestDto} from "./dtos/checkout-request.dto";
import {CheckoutResponseDto} from "./dtos/checkout-response.dto";
import {BadRequestException} from "./dtos/bad-request-exception";

export class CheckoutController {

    checkout(request: CheckoutRequestDto): CheckoutResponseDto {
        if (!request.basketId) {
            throw new BadRequestException('basketId is required');
        }
        return {} as CheckoutResponseDto;
    }
}
