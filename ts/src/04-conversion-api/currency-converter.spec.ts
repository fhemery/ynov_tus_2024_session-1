import { ConversionRateApi } from "./external/conversion-rate-api";
import { CurrencyConverter } from "./currency-converter";
import { Currency } from "./model/currency";
import { Money } from "./model/money";
import {CurrencyIsoCode} from "./external/currency-iso-code";

export class FakeCurrencyApi {
  getRate(source: CurrencyIsoCode, target: CurrencyIsoCode): number {
    return 0;
  }
}

describe("CurrencyConverter", function () {
  it("is initialized", () => {
    const converter = new CurrencyConverter(new ConversionRateApi());
    expect(converter).toBeTruthy();
  });
  it("does work (with a spy on top on real object)", () => {
    const conversionRateApi = new ConversionRateApi();
    const spy = jest.spyOn(conversionRateApi, "getRate")
        .mockReturnValue(2);
    // conversionRateApi.getRate = jest.fn().mockReturnValue(2);
    // We could do this as well: conversionRateApi.getRate = () => 2;
    const converter = new CurrencyConverter(conversionRateApi);

    const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar));
    expect(result).toEqual(new Money(4, Currency.Euro));
    expect(spy).toHaveBeenCalledWith(CurrencyIsoCode.USD, CurrencyIsoCode.EUR);
  });

  it("does work (with a mock object)", () => {
    const conversionRateApi: ConversionRateApi = {
        getRate: jest.fn().mockReturnValue(2)
    };
    const converter = new CurrencyConverter(conversionRateApi);

    const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar));
    expect(result).toEqual(new Money(4, Currency.Euro));
    expect(conversionRateApi.getRate).toHaveBeenCalledWith(CurrencyIsoCode.USD, CurrencyIsoCode.EUR);
  });
});
