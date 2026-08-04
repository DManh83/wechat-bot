/**
 * Whitelist configuration
 * Users (wcId) that should use OpenClaw instead of Coze
 */
export const WCID_WHITELIST: string[] = [
    // Example: "wxid_abc123",
    // Add more wcIds as needed
    "wxid_1nogz86qv4v622",
    "wxid_ekofjru65keh21",
]

/**
 * Check if a wcId is in the whitelist
 */
export const isWhitelisted = (wcId: string): boolean => {
    return WCID_WHITELIST.includes(wcId)
}

