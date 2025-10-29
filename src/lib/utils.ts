import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a new CLEAR ID
 * Format: <FirstTwoLettersOfName>-<SCHOOL>-<LEVEL>-<5DigitHash>
 * Example: JO-SOS-UG-16383
 */
export function getNewClearId(fullName: string, schoolShort: string, educationLevel: string): string {
  if (!fullName || !schoolShort || !educationLevel) {
    throw new Error("Missing parameters for CLEAR ID generation");
  }

  // Extract first two letters of name (uppercase)
  const namePart = fullName.trim().slice(0, 2).toUpperCase();

  // Clean and uppercase school + level
  const schoolPart = schoolShort.trim().toUpperCase();
  const levelPart = educationLevel.trim().toUpperCase();

  // Generate random 5-digit number
  const randomPart = Math.floor(10000 + Math.random() * 90000);

  // Combine into CLEAR ID
  return `${namePart}-${schoolPart}-${levelPart}-${randomPart}`;
}
