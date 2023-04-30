import {connection} from "~/server/db/connection";
import {Model, DataTypes} from "sequelize";

class Navigation extends Model{}

Navigation.init({
    navigationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    navigationName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    navigationSlug: {
        type: DataTypes.STRING(255)
    },
    navigationType: {
        type: DataTypes.ENUM('menu', 'item', 'subitem'),
        defaultValue: 'item'
    },
    navigationParent: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    navigationTarget: {
        type: DataTypes.STRING(255),
        defaultValue: null,
        allowNull: true
    },
    navigationOrder: {
        type: DataTypes.TINYINT.UNSIGNED,
        defaultValue: 1
    },
    navigationExtra: {
        type: DataTypes.TEXT,
        defaultValue: null,
        allowNull: true,
        get(){
            return JSON.parse(this.getDataValue('navigationExtra'))
        }
    },

}, {
    sequelize: connection,
    timestamps: false,
    tableName: 'navigations'
})

export default Navigation
