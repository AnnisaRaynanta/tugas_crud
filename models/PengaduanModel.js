import {Sequelize} from "sequelize";
 import db from "../config/Database.js";

 const {DataTypes} = Sequelize;

 const pengaduan = db.define('pengaduan',{
    id_pengaduan: DataTypes.INTEGER,
    tgl_pengaduan: DataTypes.DATEONLY,
    nik: DataTypes.CHAR,
    isi_laporan: DataTypes.TEXT,
    foto: DataTypes.STRING,
    status: DataTypes.ENUM("0", "proses", "selesai")
 },{
    freezeTableName: true
 });

 export default pengaduan;


(async()=>{
    await db.sync();
})();