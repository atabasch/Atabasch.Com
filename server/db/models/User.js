import {connection} from "~/server/db/connection"
import {Model, DataTypes} from "sequelize"

class User extends Model {}

User.init({
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    userUsername: {
        type: DataTypes.STRING(26),
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: { args: true, msg: 'Lütfen geçerli bir kullanıcı adı girin' },
            len: { args: [[3, 26]], msg: 'Kullanıcı adı 3 ila 26 karaktere uzunluğunda olmalıdır.' },
        }
    },
    userPassword: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    userEmail: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
    },
    userStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    userLevel: {
        type: DataTypes.TINYINT.UNSIGNED,
        defaultValue: 0
    },
    userCover: {
        type: DataTypes.STRING(128),
        allowNull: true,
        defaultValue: null
    },
    userDisplayName: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null
    },
    userCreatedAt: { type: DataTypes.DATE },
    userUpdatedAt: { type: DataTypes.DATE },
    userDeletedAt: { type: DataTypes.DATE },
    userLoggedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
}, {
    sequelize: connection,
    tableName: 'users',
    timestamps: true,
    createdAt: 'userCreatedAt',
    updatedAt: 'userUpdatedAt',
    deletedAt: 'userDeletedAt',
})

export default User
