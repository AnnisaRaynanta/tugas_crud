import {Sequelize} from "sequelize";

const db = new Sequelize('pengaduan_annisa', 'root', '',{
    host: 'localhost',
    dialect: "mysql"
});

export default db;