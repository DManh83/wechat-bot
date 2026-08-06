import axios, { AxiosInstance } from "axios"

// OpenClaw HTTP API configuration
// Use local gateway: http://127.0.0.1:18789 or remote: https://openclaw.dadaex.cn
const OPENCLAW_HTTP_URL = process.env.OPENCLAW_HTTP_URL || "https://openclaw.dadaex.cn"
const OPENCLAW_TOKEN = process.env.OPENCLAW_TOKEN

export interface OpenClawMessage {
    role: string
    content: string
}

export interface OpenClawContentBlock {
    type: string
    text?: string
}

export interface OpenClawOutputMessage {
    type: string
    id?: string
    role?: string
    content?: OpenClawContentBlock[]
    phase?: string
    status?: string
}

export interface OpenClawResponse {
    id?: string
    object?: string
    created_at?: number
    status?: string
    model?: string
    output?: OpenClawOutputMessage[]
    usage?: {
        input_tokens: number
        output_tokens: number
        total_tokens: number
    }
    error?: string
}

class OpenClawService {
    private client: AxiosInstance

    constructor() {
        this.client = axios.create({
            baseURL: OPENCLAW_HTTP_URL,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENCLAW_TOKEN}`,
            },
            timeout: 600000, // 10 minutes timeout for AI responses
        })
    }

    /**
     * Send chat message to OpenClaw with conversation context
     * Uses x-openclaw-session-key header for session management
     * Each customer (wcId) has their own persistent conversation window on OpenClaw side
     */
    async chatWithContext(nickName: string, content: string, key: string): Promise<string> {
        const sessionKey = key
        const userId = key

        // Build messages for context
        const messages: OpenClawMessage[] = [{ role: nickName, content }]

        const response = await this.chatCompletion(sessionKey, userId, messages)
        return response
    }

    /**
     * Send chat message to OpenClaw HTTP API and get AI response
     * Uses /v1/responses endpoint with session key header
     */
    async chatCompletion(sessionKey: string, userId: string, messages: OpenClawMessage[], instructions?: string): Promise<string> {
        try {
            // Build input from messages
            const input = messages.map((m) => `${m.role === "system" ? "" : m.role + ": "}${m.content}`).join("\n")

            // Build request body
            const requestBody: Record<string, unknown> = {
                model: "openclaw/default",
                input,
                user: userId,
                stream: false,
            }

            // Only add instructions on first request of session
            if (instructions) {
                requestBody.instructions = instructions
            }

            // Set session key header
            const headers: Record<string, string> = {}
            headers["x-openclaw-session-key"] = sessionKey

            const response = await this.client.post<OpenClawResponse>("/v1/responses", requestBody, { headers })
            console.log("OpenClaw response:", response.data)
            if (response.status !== 200) {
                throw new Error(`OpenClaw API Error: HTTP ${response.status}`)
            }

            // Extract content from response
            // Response format: output[0].content[0].type === "output_text" && output[0].content[0].text
            let content: string | null = null

            const output = response.data.output
            if (output && output.length > 0) {
                const message = output[0]
                if (message.content && message.content.length > 0) {
                    const textBlock = message.content.find((block) => block.type === "output_text")
                    if (textBlock?.text) {
                        content = textBlock.text
                    }
                }
            }

            // Fallback: check for output_text directly
            if (!content && (response.data as any).output_text) {
                content = (response.data as any).output_text
            }

            if (!content) {
                throw new Error("No content in OpenClaw response")
            }

            return content
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status
                const data = error.response?.data
                // Check if API returned a failure status in body (HTTP 200 but status=failed)
                if (data?.status === "failed") {
                    const errorDetail =
                        typeof data?.error === "object" ? data.error?.message || JSON.stringify(data.error) : data?.error || "Unknown error"
                    throw new Error(`OpenClaw API failed: ${errorDetail}`)
                }
                if (status === 401) {
                    throw new Error("OpenClaw authentication failed. Check your token.")
                }
                if (status === 404) {
                    throw new Error("OpenClaw API not found. Check your OPENCLAW_HTTP_URL.")
                }
                if (status != null) {
                    const errorDetail =
                        typeof data?.error === "object" ? data.error?.message || JSON.stringify(data.error) : data?.error || error.message
                    throw new Error(`OpenClaw API error (HTTP ${status}): ${errorDetail}`)
                }
            }
            throw error
        }
    }

    /**
     * Send a simple chat message and get response (no context/history)
     */
    async chat(sessionKey: string, userId: string, content: string): Promise<string> {
        return this.chatCompletion(sessionKey, userId, [{ role: "user", content }])
    }
}

let openclawServiceInstance: OpenClawService | null = null

export const getOpenClawService = (): OpenClawService => {
    if (!openclawServiceInstance) {
        openclawServiceInstance = new OpenClawService()
    }
    return openclawServiceInstance
}

export default OpenClawService

