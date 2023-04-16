import {connection} from "~/server/db/connection";
import {Model, DataTypes} from "sequelize";

class Contact extends Model{}

Contact.init({

    contactId:  {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement: true
    },
    contactTitle:   {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    contactSender:  {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    contactSubject: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    contactEmail:   {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    contactPhone:   {
        type: DataTypes.STRING(32),
        allowNull: true,
        defaultValue: true
    },
    contactContent: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    contactMedia:   {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    contactExtra:   {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    contactStatus:  {
        type: DataTypes.ENUM('unread', 'read', 'answered', 'transferred', 'marked'), // okunmadı, okundu, cevaplandı, transfer edildi, işaretlenddi (favori-dikkat çekici)
        allowNull: false,
        defaultValue: 'unread'

    },
    contactCreatedAt:   {type: DataTypes.DATE},
    contactDeletedAt:   {type: DataTypes.DATE},
    contactAnsweredAt:  {type: DataTypes.DATE, allowNull:true, defaultValue: null},

}, {
    sequelize: connection,
    tableName: 'contacts',
    timestamps: true,
    createdAt: 'contactCreatedAt',
    updatedAt: false,
    deletedAt: 'contactDeletedAt',
})

export default Contact
