import {connection} from "~/server/db/connection"
import {Model, DataTypes} from "sequelize"
// import User from "~/server/db/models/User";


class UserData extends Model{}
UserData.init({
    userId : {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
    },
    userFirstname : {
        type: DataTypes.STRING(25),
        allowNull: true,
        defaultValue: null
    },
    userLastname : {
        type: DataTypes.STRING(25),
        allowNull: true,
        defaultValue: null
    },
    userBirthdate : {
        type: DataTypes.DATE,
    },
    userGender : {
        type: DataTypes.ENUM('none', 'male', 'female'),
        defaultValue: 'none'
    },
    userLangCode : {
        type: DataTypes.STRING(4),
        defaultValue: "tr"
    },
    userTimezone : {
        type: DataTypes.STRING(50),
        defaultValue: "Europe/Istanbul"
    },
},{
    sequelize: connection,
    tableName: "user_data",
    timestamps: false
});
// UserData.belongsTo(User, { as:'user', foreignKey: 'userId', targetKey:'userId' })
export default UserData;
