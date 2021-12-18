
/**
 * Evaluates whether the given year, month, and day parts form a valid Julian date.
 * 
 * Assumes dates are between Jan 1, 1 A.D. and any time in the future, using a modern Julian calendar.
 * 
 * Accounts for leap years.
 * 
 * Equivalent to checking (up to) all permutations of inputs to {@lnk isValidOrderedDate()}
 * 
 * @param {int} candidatePartA year, month, or day part of the candidate date
 * @param {int} candidatePartB year, month, or day part of the candidate date
 * @param {int} candidatePartC year, month, or day part of the candidate date
 * @returns true if the parts form a valid date, false otherwise
 */
function isValidDate(candidatePartA, candidatePartB, candidatePartC) {
    if (isValidOrderedDate(candidatePartA, candidatePartB, candidatePartC)) return true;
    if (isValidOrderedDate(candidatePartA, candidatePartC, candidatePartB)) return true;
    if (isValidOrderedDate(candidatePartB, candidatePartA, candidatePartC)) return true;
    if (isValidOrderedDate(candidatePartB, candidatePartC, candidatePartA)) return true;
    if (isValidOrderedDate(candidatePartC, candidatePartB, candidatePartA)) return true;
    if (isValidOrderedDate(candidatePartC, candidatePartA, candidatePartB)) return true;
    return false;
}


/**
 * Evaluates whether the given year, month, and day parts form a valid Julian date.
 * 
 * Assumes dates are between Jan 1, 1 A.D. and any time in the future, using a modern Julian calendar.
 * 
 * Accounts for leap years.
 * 
 * @param {int} candidatePartA year, month, or day part of the candidate date
 * @param {int} candidatePartB year, month, or day part of the candidate date
 * @param {int} candidatePartC year, month, or day part of the candidate date
 * @returns true if the parts form a valid date, false otherwise
 */
function isValidOrderedDate(candidateYear, candidateMonth, candidateDay) {
    return isValidYear(candidateYear) && isValidMonth(candidateMonth) && isValidDay(candidateYear, candidateMonth, candidateDay);
}


/**
 * Evaluates if the given year is valid.
 * 
 * @param {int} candidateYear candidate year for evaluating
 * @returns true if the given year is valid
 */
function isValidYear(candidateYear) {
    return candidateYear >= 1;
}


/**
 * Evaluates whether the given month is a valid modern Julian month.
 * 
 * @param {int} candidateMonth candidate month for evaluating
 * @returns true if the given year is valid
 */
function isValidMonth(candidateMonth) {
    return (candidateMonth >= 1) && (candidateMonth <= 12);
}


/**
 * Evaluates whether the given day is a valid modern Julian day.
 * 
 * Accounts for leap years.
 * 
 * @param {int} year year in which the candidate day occurs
 * @param {int} month month in which the candidate day occurs
 * @param {int} candidateDay candidate day for evaluating
 * @returns true if the given day is valid
 */
function isValidDay(year, month, candidateDay) {
    return (candidateDay >= 1) && (candidateDay <= getDaysInMonth(year, month));
}


const MONTHS_OF_30_DAYS = [4, 6, 9, 11];

/**
 * Gets the number of days in the Julian month.
 * 
 * Accounts for leap years
 * 
 * @param {int} year year in which the month occurs
 * @param {int} month month for which to retrieve days
 * @returns number of days in the given month
 */
function getDaysInMonth(year, month) {
    if (month === 2) {
        if ((year % 4) === 0) return 28;
        else return 29;
    
    } else if (month in MONTHS_OF_30_DAYS) return 30;
    else return 31;
}


// TESTS, which would normally be executed using a framework like jest, but
//  which I wanted to keep in an interview format.
function testIsValidDay_leapYear_february_29th_returnsFalse() {
    assertFalse(() => isValidDay(2020, 2, 29), 'testIsValidDay_leapYear_february_29th_returnsFalse');
}


function testIsValidDay_nonLeapYear_february_29th_returnsTrue() {
    assertTrue(() => isValidDay(2021, 2, 29), 'testIsValidDay_nonLeapYear_february_29th_returnsTrue');
}


function testIsValidDay_nonPositive_returnsFalse() {
    assertFalse(() => isValidDay(generateSimpleYear(), generateSimpleMonth(), -1*generateSimpleDay()), 'testIsValidDay_nonPositive_returnsFalse');
}


function testIsValidDay_overMonthsDays_returnsFalse() {
    assertFalse(() => isValidDay(generateSimpleYear(), generateSimpleMonth(), generateIntBetween(100, 1000)), 'testIsValidDay_nonPositive_returnsFalse');
}


function testIsValidDay_standardCase_returnsTrue() {
    assertTrue(() => isValidDay(generateSimpleYear(), generateSimpleMonth(), generateSimpleDay()), 'testIsValidDay_nonPositive_returnsFalse');
}


function testIsValidMonth_nonPositive_returnsFalse() {
    assertFalse(() => isValidMonth(-1*generateSimpleMonth()), 'testIsValidMonth_nonPositive_returnsFalse');
}


function testIsValidMonth_tooHigh_returnsFalse() {
    assertFalse(() => isValidMonth(generateIntBetween(13, 100)), 'testIsValidMonth_tooHigh_returnsFalse');
}


function testIsValidMonth_standardCase_returnsTrue() {
    assertTrue(() => isValidMonth(generateSimpleMonth()), 'testIsValidMonth_standardCase_returnsTrue');
}


function isValidYear_nonPositive_returnsFalse() {
    assertFalse(() => isValidYear(-1*generateSimpleYear()), 'isValidYear_nonPositive_returnsFalse');
}


function isValidYear_positive_returnsTrue() {
    assertTrue(() => isValidYear(generateSimpleYear()), 'isValidYear_positive_returnsTrue');
}


function isValidOrderedDate_invalidYear_returnsFalse() {
    assertFalse(() => isValidOrderedDate(-1*generateSimpleYear(), getDaysInMonth(), generateSimpleDay()), 'isValidOrderedDate_invalidYear_returnsFalse');
}


function isValidOrderedDate_invalidMonth_returnsFalse() {
    assertFalse(() => isValidOrderedDate(generateSimpleYear(), -1*getDaysInMonth(), generateSimpleDay()), 'isValidOrderedDate_invalidMonth_returnsFalse');
}


function isValidOrderedDate_invalidDay_returnsFalse() {
    assertFalse(() => isValidOrderedDate(generateSimpleYear(), getDaysInMonth(), -1*generateSimpleDay()), 'isValidOrderedDate_invalidDay_returnsFalse');
}


function isValidDate_yyyy_mm_dd_returnsTrue() {
    assertTrue(() => isValidDate(generateSimpleYear(), generateSimpleMonth(), generateSimpleDay()), 'isValidDate_yyyy_mm_dd_returnsTrue');
}


function isValidDate_yyyy_dd_mm_returnsTrue() {
    assertTrue(() => isValidDate(generateSimpleYear(), generateSimpleDay(), generateSimpleMonth()), 'isValidDate_yyyy_dd_mm_returnsTrue');
}


function isValidDate_mm_yyyy_dd_returnsTrue() {
    assertTrue(() => isValidDate(generateSimpleMonth(), generateSimpleYear(), generateSimpleDay()), 'isValidDate_mm_yyyy_dd_returnsTrue');
}


function isValidDate_mm_dd_yyyy_returnsTrue() {
    assertTrue(() => isValidDate(generateSimpleMonth(), generateSimpleDay(), generateSimpleYear()), 'isValidDate_mm_dd_yyyy_returnsTrue');
}


function isValidDate_dd_mm_yyyy_returnsTrue() {
    assertTrue(() => isValidDate(generateSimpleDay(), generateSimpleMonth(), generateSimpleYear()), 'isValidDate_dd_mm_yyyy_returnsTrue');
}


function isValidDate_dd_yyyy_mm_returnsTrue() {
    assertTrue(() => isValidDate(generateSimpleDay(), generateSimpleYear(), generateSimpleMonth()), 'isValidDate_dd_yyyy_mm_returnsTrue');
}

// other combinations are harder to test for falsity because
//  they may be valid dates even if the source of the values
//  are not valid dates, e.g. 01, 01, 01 is a valid date
//  even if the inputs are all based on Jan, Jan, Jan rather
//  than year 01, january, 1st


function assertFalse(test, name) {
    assertCase(test() === false, 'false', 'true', name);
}


function assertTrue(test, name) {
    assertCase(test() === true, 'true', 'false', name);
}


function assertCase(passes, expected, actual, name) {
    if (!passes) throw new Error(`Failed: ${name}. Expected ${expected} but got ${actual}`)
}


function generateSimpleYear() {
    return generateIntBetween(1, 2023);
}


function generateSimpleMonth() {
    return generateIntBetween(1, 13);
}


function generateSimpleDay() {
    return generateIntBetween(1, 28);
}


function generateIntBetween(lowerInclusive, upperExclusive) {
    return Math.floor(Math.round(upperExclusive - lowerInclusive)*Math.random()) + lowerInclusive;
}


testIsValidDay_leapYear_february_29th_returnsFalse();
testIsValidDay_nonLeapYear_february_29th_returnsTrue();
testIsValidDay_nonPositive_returnsFalse();
testIsValidDay_overMonthsDays_returnsFalse();
testIsValidDay_standardCase_returnsTrue();
testIsValidMonth_nonPositive_returnsFalse();
testIsValidMonth_tooHigh_returnsFalse();
testIsValidMonth_standardCase_returnsTrue();
isValidYear_nonPositive_returnsFalse();
isValidYear_positive_returnsTrue();
isValidOrderedDate_invalidYear_returnsFalse();
isValidOrderedDate_invalidMonth_returnsFalse();
isValidDate_yyyy_mm_dd_returnsTrue();
isValidDate_yyyy_dd_mm_returnsTrue();
isValidDate_mm_yyyy_dd_returnsTrue();
isValidDate_mm_dd_yyyy_returnsTrue();
isValidDate_dd_yyyy_mm_returnsTrue();
console.log('All tests passed! When can you start?');