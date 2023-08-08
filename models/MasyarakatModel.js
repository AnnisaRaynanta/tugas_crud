import {Sequelize} from "sequelize";
 import db from "../config/Database.js";

 const {DataTypes} = Sequelize;

 const masyarakat = db.define('masyarakat',{
    nik: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nama: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    telp: DataTypes.STRING,
  
 },{
    freezeTableName: true
 });

 export default masyarakat;


(async()=>{
    await db.sync();
})();