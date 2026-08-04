/**
 * Blacklist configuration
 * Users (wcId) that should NOT receive any response
 */
export const WCID_BLACKLIST: string[] = [
    // Example: "wxid_abc123",
    // Add more wcIds as needed
    // "wxid_ekofjru65keh21",
    "weixin",
]

/**
 * Check if a wcId is in the blacklist
 */
export const isBlacklisted = (wcId: string): boolean => {
    return WCID_BLACKLIST.includes(wcId)
}

