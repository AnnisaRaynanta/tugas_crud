import {Sequelize} from "sequelize";
 import db from "../config/Database.js";

 const {DataTypes} = Sequelize;

 const pengaduan = db.define('pengaduan',{
    id_tanggapan: DataTypes.INTEGER,
    id_pengaduan: DataTypes.INTEGER,
    tgl_tanggapan: DataTypes.DATEONLY,
    tanggapan: DataTypes.TEXT,
    id_petugas: DataTypes.INTEGER,
    
 },{
    freezeTableName: true
 });

 export default pengaduan;


(async()=>{
    await db.sync();
})();