import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Formats a phone number string to Brazilian format: XX XXXXX-XXXX
 * Removes all non-digit characters and applies formatting based on length
 * @param value - The phone number string to format
 * @returns Formatted phone number string
 */
export function formatPhoneNumber(value: string): string {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '')

    // Apply mask based on length
    if (digits.length <= 2) {
        return digits
    } else if (digits.length <= 7) {
        return `${digits.slice(0, 2)} ${digits.slice(2)}`
    } else if (digits.length <= 11) {
        return `${digits.slice(0, 2)} ${digits.slice(2, 7)}-${digits.slice(7)}`
    } else {
        // Limit to 11 digits (Brazilian format: XX XXXXX-XXXX)
        return `${digits.slice(0, 2)} ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
    }
}

/**
 * Formats a price number to Brazilian format with comma as decimal separator
 * @param price - The price number to format
 * @returns Formatted price string (e.g., "99,90" for 99.9)
 */
export function formatPrice(price: number): string {
    return price.toFixed(2).replace('.', ',')
}
