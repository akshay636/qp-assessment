/**
 * Check a passed in variable is not undefined or null or empty
 * @param value
 * @param emptyCheck
 */
export function isDefined(value: string | number, checkIsValueEmpty = false) {
    if (checkIsValueEmpty) {
        return typeof value !== "undefined" && value !== "" && value !== null;
    }
    return typeof value !== "undefined";
}
