export function isLeapYear(year: number): boolean {
    if (isDividableBy(year, 400)) {
        return true;
    }
    if (isDividableBy(year, 100)) {
        return false;
    }
    return isDividableBy(year, 4);
}

function isDividableBy(year: number, diviser: number): boolean {
    return year % diviser === 0;
}
