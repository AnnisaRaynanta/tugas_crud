import {Sequelize} from "sequelize";
 import db from "../config/Database.js";

 const {DataTypes} = Sequelize;

 const pengaduan = db.define('pengaduan',{
    id_pengaduan:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tgl_pengaduan: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    nik: DataTypes.CHAR,
    isi_laporan: DataTypes.TEXT,
    foto: DataTypes.STRING,
    status: DataTypes.STRING
 },{
    freezeTableName: true
 });

 export default pengaduan;


(async()=>{
    await db.sync();
})();