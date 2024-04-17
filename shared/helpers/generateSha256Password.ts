import { createHash } from "crypto";

/**
 * generate a salted sha256 string.
 * @param key
 * @param salt
 */
export const generateSha256Password = (key: string, salt?: string): string => {
    const secret: string = salt || "4ac1af3e9cfedb03cf34e3ccb464a8a93d1b2135";
    return createHash("sha256").update(key + secret).digest("hex");
};