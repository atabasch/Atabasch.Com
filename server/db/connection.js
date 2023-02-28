import {Sequelize} from "sequelize"
const sequelize = new Sequelize({
    host:       process.env.DB_HOST || 'localhost',
    database:   process.env.DB_NAME || '',
    username:   process.env.DB_USER || 'root',
    password:   process.env.DB_PASS || '',
    port:       process.env.DB_PORT || 3306,
    dialect:    "mysql"
})

export const connection = sequelize
