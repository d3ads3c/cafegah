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

    // Try each header
    for (const header of ipHeaders) {
        const value = req.headers.get(header);
        if (value) {
            // x-forwarded-for can contain multiple IPs separated by commas
            const ips = value.split(',').map(ip => ip.trim());
            
            // Find first non-localhost IP
            for (const ip of ips) {
                if (!isLocalhost(ip)) {
                    return ip;
                }
            }
        }
    }

    // If we only found localhost IPs or no headers, return empty string
    // This prevents sending "::1" or "127.0.0.1" when we should have a real client IP
    // In production behind a proxy, headers should be set with the real client IP
    return '';
}

/**
 * Check if an IP address is localhost
 */
function isLocalhost(ip: string): boolean {
    if (!ip) return true;
    
    // Remove port if present
    const ipWithoutPort = ip.split(':')[0];
    
    // Check for IPv4 localhost
    if (ipWithoutPort === '127.0.0.1' || ipWithoutPort === 'localhost') {
        return true;
    }
    
    // Check for IPv6 localhost
    if (ipWithoutPort === '::1' || ipWithoutPort === '::ffff:127.0.0.1') {
        return true;
    }
    
    // Check for private network ranges
    if (ipWithoutPort.startsWith('192.168.') || 
        ipWithoutPort.startsWith('10.') || 
        ipWithoutPort.startsWith('172.16.') || 
        ipWithoutPort.startsWith('172.17.') || 
        ipWithoutPort.startsWith('172.18.') || 
        ipWithoutPort.startsWith('172.19.') || 
        ipWithoutPort.startsWith('172.20.') || 
        ipWithoutPort.startsWith('172.21.') || 
        ipWithoutPort.startsWith('172.22.') || 
        ipWithoutPort.startsWith('172.23.') || 
        ipWithoutPort.startsWith('172.24.') || 
        ipWithoutPort.startsWith('172.25.') || 
        ipWithoutPort.startsWith('172.26.') || 
        ipWithoutPort.startsWith('172.27.') || 
        ipWithoutPort.startsWith('172.28.') || 
        ipWithoutPort.startsWith('172.29.') || 
        ipWithoutPort.startsWith('172.30.') || 
        ipWithoutPort.startsWith('172.31.')) {
        // These are private IPs, but we'll return them as they might be valid in some contexts
        return false;
    }
    
    return false;
}

