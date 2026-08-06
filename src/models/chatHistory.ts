import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../config/database"

interface chatHistoryAttributes {
    id: number
    msgId: string
    wId: string
    fromWxId: string | null
    content: string
    reply: string | null
    createdAt?: Date
    updatedAt?: Date
}

interface chatHistoryCreationAttributes extends Optional<chatHistoryAttributes, "id" | "reply" | "createdAt" | "updatedAt"> {}

class chatHistory extends Model<chatHistoryAttributes, chatHistoryCreationAttributes> {}

chatHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        msgId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        wId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        fromWxId: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        reply: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "chatHistory",
        tableName: "chat_history",
        timestamps: true,
    }
)

export default chatHistory

