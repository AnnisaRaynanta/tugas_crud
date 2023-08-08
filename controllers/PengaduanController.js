
import path from "path";
import fs from "fs";
import pengaduan from "../models/PengaduanModel.js";
import masyarakat from "../models/MasyarakatModel.js";
import petugas from "../models/PetugasModel.js";
import tanggapan from "../models/TanggapanModel.js";


// controller pengaduan

export const getPengaduan = async(req, res)=>{
    try {
        const response = await pengaduan.findAll();
        res.json(response);
    }  catch (error){
        console.log(error.message);
    }
}
export const getPengaduanById = async(req, res)=>{
    try {
        const response = await pengaduan.findOne({
            where:{
                id_pengaduan : req.params.id
            }
        });
        res.json(response);
    }  catch (error){
        console.log(error.message);
    }
}

export const savePengaduan = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "Tidak ada data pengaduan"});
    const nik = req.body.nik;
    const isi = req.body.isi;
    const status = "belum"
    const file = req.files.file;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"});

    file.mv (`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try{
            await pengaduan.create({nik: nik, isi_laporan: isi, foto: url, status: status});
            res.status(201).json({msg: "Pengaduan Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updatePengaduan = async(req, res)=>{
    const product = await pengaduan.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!pengaduan) return res.status(404).json({msg: "No Data Found"});
    let fileName = "";
    if(req.files === null){
        fileName = pengaduan.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg:"Image must be less than 5 MB"});

        const filepath = `./public/images/${pengaduan.image}`;
        fs.unlinkSync(filepath);

        file.mv (`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
           
        })
    }
    const tgl_pengaduan = req.body.tgl_pengaduan;
    const nik = req.body.nik;
    const isi = req.body.isi;
    const status = req.body.status;
   
   ;
    try{
        await pengaduan.update({tgl_pengaduan: tgl_pengaduan, nik: nik, isi_laporan: isi_laporan, status: status},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Pengaduan Update Successfuly"});
    } catch (error) {
        console.log(error.message);
    }

}

export const deletePengaduan = async(req, res)=>{
    const pengaduan = await pengaduan.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!pengaduan) return res.status(404).json({msg: "No Data Found"});
    try{
        const filepath = `./public/images/${pengaduan.image}`;
        fs.unlinkSync(filepath);
        await pengaduan.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Pengaduan Deleted Successfuly"});
    }catch (error) {
        console.log(error.message);
    }
}

// controller masyarakat

export const getMasyarakat = async(req, res)=>{
    try {
        const response = await masyarakat.findAll();
        res.json(response);
    }  catch (error){
        console.log(error.message);
    }
}
export const getMasyarakatById = async(req, res)=>{
    try {
        const response = await masyarakat.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    }  catch (error){
        console.log(error.message);
    }
}

export const saveMasyarakat = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const name = req.body.name;
    const nik = req.body.nik;
    const username = req.body.username;
    const password = req.body.password;
    const telp = req.body.telp;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg:"Image must be less than 5 MB"});

    file.mv (`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try{
            await masyarakat.create({name: name, nik:nik, username:username, password:password, telp:telp });
            res.status(201).json({msg: "masyarakat Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateMasyarakat = async(req, res)=>{
    const product = await masyarakat.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!masyarakat) return res.status(404).json({msg: "No Data Found"});
    let fileName = "";
    if(req.files === null){
        fileName = masyarakat.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg:"Image must be less than 5 MB"});

        const filepath = `./public/images/${masyarakat.image}`;
        fs.unlinkSync(filepath);

        file.mv (`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
           
        })
    }
    const name = req.body.name;
    const nik = req.body.nik;
    const username = req.body.username;
    const password = req.body.password;
    const telp = req.body.telp;
    try{
        await masyarakat.update({name: name, nik:nik, username:username, password:password, telp:telp},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Masyarakat Update Successfuly"});
    } catch (error) {
        console.log(error.message);
    }

}

export const deleteMasyarakat = async(req, res)=>{
    const masyarakat = await masyarakat.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!masyarakat) return res.status(404).json({msg: "No Data Found"});
    try{
        const filepath = `./public/images/${masyarakat.image}`;
        fs.unlinkSync(filepath);
        await masyarakat.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Masyarakat Deleted Successfuly"});
    }catch (error) {
        console.log(error.message);
    }
}

// controller petugas

export const getPetugas = async(req, res)=>{
    try {
        const response = await petugas.findAll();
        res.json(response);
    }  catch (error){
        console.log(error.message);
    }
}
export const getPetugasById = async(req, res)=>{
    try {
        const response = await petugas.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    }  catch (error){
        console.log(error.message);
    }
}

export const savePetugas = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const id_petugas = req.body.id_petugas;
    const nama_petugas = req.body.nama_petugas;
    const username = req.body.username;
    const password = req.body.password;
    const telp = req.body.telp;
    const level = req.body.level;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg:"Image must be less than 5 MB"});

    file.mv (`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try{ 
            await petugas.create({id_petugas:id_petugas, nama_petugas:nama_petugas, username:username, password:password, telp:telp, level:level});
            res.status(201).json({msg: "Petugas Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updatePetugas = async(req, res)=>{
    const product = await petugas.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!petugas) return res.status(404).json({msg: "No Data Found"});
    let fileName = "";
    if(req.files === null){
        fileName = petugas.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg:"Image must be less than 5 MB"});

        const filepath = `./public/images/${petugas.image}`;
        fs.unlinkSync(filepath);

        file.mv (`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
           
        })
    }
    const id_petugas = req.body.id_petugas;
    const nama_petugas = req.body.nama_petugas;
    const username = req.body.username;
    const password = req.body.password;
    const telp = req.body.telp;
    const level = req.body.level;
    try{
        await petugas.update({id_petugas:id_petugas, nama_petugas:nama_petugas, username:username, password:password, telp:telp, level:level},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Petugas Update Successfuly"});
    } catch (error) {
        console.log(error.message);
    }

}

export const deletePetugas = async(req, res)=>{
    const masyarakat = await petugas.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!petugas) return res.status(404).json({msg: "No Data Found"});
    try{
        const filepath = `./public/images/${petugas.image}`;
        fs.unlinkSync(filepath);
        await petugas.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Petugas Deleted Successfuly"});
    }catch (error) {
        console.log(error.message);
    }
}

// controller tanggapan

export const getTanggapan = async(req, res)=>{
    try {
        const response = await tanggapan.findAll();
        res.json(response);
    }  catch (error){
        console.log(error.message);
    }
}
export const getTanggapanById = async(req, res)=>{
    try {
        const response = await tanggapan.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    }  catch (error){
        console.log(error.message);
    }
}

export const saveTanggapan = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const id_tanggapan = req.body.id_tanggapan;
    const id_pengaduan = req.body.id_pengaduan;
    const tgl_tanggapan = req.body.tgl_tanggapan;
    const tanggapan = req.body.tanggapan;
    const id_petugas = req.body.id_petugas;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg:"Image must be less than 5 MB"});

    file.mv (`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try{
            await tanggapan.create({id_tanggapan:id_tanggapan, id_pengaduan:id_pengaduan, tgl_tanggapan:tgl_tanggapan, id_petugas:id_petugas});
            res.status(201).json({msg: "Tanggapan Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateTanggapan = async(req, res)=>{
    const product = await tanggapan.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!tanggapan) return res.status(404).json({msg: "No Data Found"});
    let fileName = "";
    if(req.files === null){
        fileName = tanggapan.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg:"Image must be less than 5 MB"});

        const filepath = `./public/images/${tanggapan.image}`;
        fs.unlinkSync(filepath);

        file.mv (`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
           
        })
    }
    const id_tanggapan = req.body.id_tanggapan;
    const id_pengaduan = req.body.id_pengaduan;
    const tgl_tanggapan = req.body.tgl_tanggapan;
    const tanggapan = req.body.tanggapan;
    const id_petugas = req.body.id_petugas;
    try{
        await tanggapan.update({id_tanggapan:id_tanggapan, id_pengaduan:id_pengaduan, tgl_tanggapan:tgl_tanggapan, id_petugas:id_petugas},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Tanggapan Update Successfuly"});
    } catch (error) {
        console.log(error.message);
    }

}

export const deleteTanggapan = async(req, res)=>{
    const masyarakat = await tanggapan.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!tanggapan) return res.status(404).json({msg: "No Data Found"});
    try{
        const filepath = `./public/images/${tanggapan.image}`;
        fs.unlinkSync(filepath);
        await tanggapan.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Tanggapan Deleted Successfuly"});
    }catch (error) {
        console.log(error.message);
    }
}

