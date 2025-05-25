/**
 * Generates a random UUID v4 string
 * @returns True a random UUID v4 string
 * @see https://www.geeksforgeeks.org/how-to-create-a-guid-uuid-in-javascript/
 */
export function generateUUIDv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
