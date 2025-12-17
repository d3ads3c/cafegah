/**
 * Utility functions for managing universal user cookie for chat
 */

/**
 * Generate a unique user ID for chat tracking
 */
export function generateUserId(): string {
    // Generate a random ID: timestamp + random string
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 15);
    return `chat_${timestamp}_${randomStr}`;
}

/**
 * Get or create a universal user ID cookie
 * This cookie persists across sessions to track the same user
 */
export function getOrCreateUserId(): string {
    if (typeof window === 'undefined') {
        return generateUserId();
    }

    const cookieName = 'ChatUserId';
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === cookieName && value) {
            return decodeURIComponent(value);
        }
    }

    // Cookie doesn't exist, create a new one
    const newUserId = generateUserId();
    // Set cookie to expire in 1 year
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    document.cookie = `${cookieName}=${encodeURIComponent(newUserId)}; Path=/; Max-Age=${365 * 24 * 60 * 60}; SameSite=Lax`;
    
    return newUserId;
}

