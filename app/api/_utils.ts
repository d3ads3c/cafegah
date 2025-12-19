import { NextRequest } from "next/server";

/**
 * Extract client IP address from request headers
 * Checks multiple headers and filters out localhost addresses
 * Returns empty string if only localhost IPs are found
 */
export function getClientIp(req: NextRequest): string {
    // List of headers to check (in order of preference)
    const ipHeaders = [
        'x-forwarded-for',
        'x-real-ip',
        'cf-connecting-ip', // Cloudflare
        'x-client-ip',
        'x-forwarded',
        'forwarded-for',
        'forwarded'
    ];

    // Collect all IPs from all headers first
    const allIps: string[] = [];
    
    for (const header of ipHeaders) {
        const value = req.headers.get(header);
        if (value) {
            // x-forwarded-for can contain multiple IPs separated by commas
            const ips = value.split(',').map(ip => ip.trim()).filter(ip => ip.length > 0);
            allIps.push(...ips);
        }
    }

    // Find first non-localhost IP from all collected IPs
    // In x-forwarded-for, the rightmost IP is usually the original client IP
    // But we'll check all IPs and return the first valid (non-localhost) one
    for (const ip of allIps) {
        if (!isLocalhost(ip)) {
            return ip;
        }
    }

    // If we only found localhost IPs or no headers, return empty string
    // This prevents sending "::1", "::ffff:127.0.0.1", or "127.0.0.1" when we should have a real client IP
    // In production behind a proxy, headers should be set with the real client IP
    return '';
}

/**
 * Check if an IP address is localhost or server IP
 */
function isLocalhost(ip: string): boolean {
    if (!ip) return true;
    
    // Trim whitespace
    const trimmedIp = ip.trim();
    
    // Check for exact localhost strings
    if (trimmedIp === 'localhost' || trimmedIp === '::1') {
        return true;
    }
    
    // Check for IPv4 localhost (127.0.0.1) - exact match or with port
    if (trimmedIp === '127.0.0.1' || trimmedIp.startsWith('127.0.0.1:')) {
        return true;
    }
    
    // Check for IPv6-mapped IPv4 localhost (::ffff:127.0.0.1)
    // This format appears when IPv4 is mapped to IPv6
    if (trimmedIp === '::ffff:127.0.0.1' || 
        trimmedIp.startsWith('::ffff:127.0.0.1:') ||
        trimmedIp.startsWith('[::ffff:127.0.0.1]')) {
        return true;
    }
    
    // Check for IPv6 localhost variations (::1 with or without brackets/port)
    if (trimmedIp.startsWith('::1') || trimmedIp.startsWith('[::1]')) {
        return true;
    }
    
    // More comprehensive check for IPv6-mapped IPv4 addresses
    // Pattern: ::ffff:127.0.0.1 or [::ffff:127.0.0.1]:port
    if (trimmedIp.includes('::ffff:127.0.0.1')) {
        return true;
    }
    
    // Check if the IP ends with 127.0.0.1 (for IPv6-mapped addresses)
    // Split by colons and check the last part
    const parts = trimmedIp.split(':');
    const lastPart = parts[parts.length - 1];
    // Remove port if present (format: ip:port)
    const ipPart = lastPart.split('/')[0].split('%')[0];
    if (ipPart === '127.0.0.1') {
        return true;
    }
    
    return false;
}

