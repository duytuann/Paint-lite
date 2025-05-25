/**
 * Converts a hex color string to RGB string format
 * @param hex - Hex color string (with or without #)
 * @returns RGB string in format "r, g, b" (e.g., "255, 0, 0")
 * @see https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 */
export const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0, 0, 0";

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `${r}, ${g}, ${b}`;
};

/**
 * Creates RGBA string with opacity
 * @param hex - Hex color string
 * @param opacity - Opacity value (0-100)
 * @returns RGBA string in format "rgba(r, g, b, alpha)"
 */
export const hexToRgba = (hex: string, opacity: number): string => {
  const rgb = hexToRgb(hex);
  const alpha = Math.max(0, Math.min(100, opacity)) / 100;
  return `rgba(${rgb}, ${alpha})`;
};

/**
 * Validates if a string is a valid hex color
 * @param hex - String to validate
 * @returns True if valid hex color
 * @see https://medium.com/@harmoniacodes/using-regular-expressions-to-check-for-valid-hex-values-672eb089b5b0
 */
export const isValidHex = (hex: string): boolean => {
  return /^#?([A-F0-9]{6}|[A-F0-9]{3})$/i.test(hex);
};

/**
 * Normalizes hex color (adds # if missing, converts 3-digit to 6-digit)
 * @param hex - Hex color string
 * @returns Normalized hex color string
 */
export const normalizeHex = (hex: string): string => {
  // Remove # if present
  let normalized = hex.replace("#", "");

  // Convert 3-digit to 6-digit
  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Add # prefix
  return `#${normalized}`;
};
