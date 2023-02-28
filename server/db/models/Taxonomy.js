import {connection} from "~/server/db/connection"
import {Model, DataTypes, Op} from "sequelize"
// import Term from "~/server/db/models/Term";

class Taxonomy extends Model{}

Taxonomy.init({
    taxId:             {
        type:       DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    taxTitle:          {
        type:       DataTypes.STRING(128),
        allowNull: false,
        validate: {
            len: { msg: "3 ile 60 karakter arasında bir taksonomi adı girin", args: [3, 60] }
        }
    },
    taxSlug:           {
        type:       DataTypes.STRING(128),
        defaultValue: '',
        unique: {
            args: [true],
            msg: 'Aynı slug var.'
        }
    },
    taxTitleSingular:          {
        type:       DataTypes.STRING(128),
        allowNull: false,
        validate: {
            len: { msg: "3 ile 60 karakter arasında bir taksonomi adı girin", args: [3, 60] }
        }
    },
    taxTitlePlural:          {
        type:       DataTypes.STRING(128),
        allowNull: false,
        validate: {
            len: { msg: "3 ile 60 karakter arasında bir taksonomi adı girin", args: [3, 60] }
        }
    },
    taxDescription:    {
        type:       DataTypes.STRING(512),
        allowNull: true,
        defaultValue: null
    },
    taxIcon:    {
        type:       DataTypes.STRING(64),
        allowNull: true,
        defaultValue: null
    },
    taxStatus:         {
        type:       DataTypes.BOOLEAN,
        defaultValue: true
    },
},{
    sequelize: connection,
    tableName: "taxonomies",
    timestamps: false,
});
// Taxonomy.hasMany(Term, { as: 'terms', sourceKey: 'taxId', foreignKey: 'taxId', onDelete: 'CASCADE' })
export default Taxonomy
