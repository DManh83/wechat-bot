import { Request, Response } from "express"
import { getEyunService } from "../../services/eyunService"

// ===== Contact List =====
export const initAddressList = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId } = req.body
        const result = await eyun.initAddressList({ wId })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const getAddressList = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId } = req.body
        const result = await eyun.queryFriendList({ wId })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const getContact = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId } = req.body
        const result = await eyun.getContact({ wId, wcId })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const getContactPlus = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId } = req.body
        const result = await eyun.getContactPlus({ wId, wcId })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

// ===== Friend Operations =====
export const searchUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId } = req.body
        const result = await eyun.searchUser({ wId, wcId })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, v1, v2, type, verify } = req.body
        const result = await eyun.addUser({ wId, v1, v2, type, verify })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const acceptUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, v1, v2, type = 3 } = req.body
        const result = await eyun.acceptUser({ wId, v1, v2, type })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const delContact = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId } = req.body
        const result = await eyun.delContact({ wId, wcId })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

// ===== Friend Settings =====
export const modifyRemark = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, remark } = req.body
        const result = await eyun.modifyFriendRemark({ wId, wcId, remark })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const setFriendPermission = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, type } = req.body
        const result = await eyun.setFriendPermission({ wId, wcId, type })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const setTop = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, operType } = req.body
        const result = await eyun.setTop({ wId, wcId, operType })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const setDisturb = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, chatRoomId, type } = req.body
        const result = await eyun.setDisturb({ wId, chatRoomId, type })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const userPrivacySettings = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, privacyType, switchType } = req.body
        const result = await eyun.userPrivacySettings({ wId, privacyType, switchType })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const sendHeadImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, path } = req.body
        const result = await eyun.sendHeadImage({ wId, path })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const checkZombie = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId } = req.body
        const result = await eyun.checkZombie({ wId, wcId })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const getQrCode = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId } = req.body
        const result = await eyun.getQrCode({ wId })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

