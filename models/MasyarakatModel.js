import {Sequelize} from "sequelize";
 import db from "../config/Database.js";

 const {DataTypes} = Sequelize;

 const pengaduan = db.define('pengaduan',{
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

 export default pengaduan;


(async()=>{
    await db.sync();
})();