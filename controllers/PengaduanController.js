
import path from "path";
import fs from "fs";
import pengaduan from "../models/PengaduanModel.js";


export const getPengaduans = async(req, res)=>{
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
                id : req.params.id
            }
        });
        res.json(response);
    }  catch (error){
        console.log(error.message);
    }
}

export const savePengaduan = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const name = req.body.title;
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
            await pengaduan.create({name: name, image: fileName, url: url});
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
    const name = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try{
        await pengaduan.update({name: name, image: fileName, url: url},{
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