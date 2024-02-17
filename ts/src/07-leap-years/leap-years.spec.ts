import {isLeapYear} from "./is-leap.year";

describe('Leap years', () => {

    it('should return true if dividable by 4', () => {
        expect(isLeapYear(2004)).toBe(true);
    });

    it('should return false if not dividable by 4', () => {
        expect(isLeapYear(2003)).toBe(false);
    });

    it('should return true if dividable by 400', () => {
        expect(isLeapYear(2000)).toBe(true);
    });

    it('should return false if dividable by 100 and not 400', () => {
        expect(isLeapYear(2100)).toBe(false);
    });
});
