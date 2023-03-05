import {connection} from "@/server/db/connection"
import {Model, DataTypes} from "sequelize"

class Config extends Model {}

Config.init({
    configId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    configKey: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    configValue: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    configDescription: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    configOrder: {
        type: DataTypes.TINYINT.UNSIGNED,
        defaultValue: 255
    }
}, {
    sequelize: connection,
    tableName: 'configs',
    timestamps: false
})

export default Config
