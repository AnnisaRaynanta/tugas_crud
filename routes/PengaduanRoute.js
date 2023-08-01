import express from "express";
import{
  getPengaduanById, getPengaduans, savePengaduan, updatePengaduan, deletePengaduan
} from "../controllers/PengaduanController.js";

const router = express.Router();

router.get('/pengaduans', getPengaduans);
router.get('/pengaduans/:id', getPengaduanById);
router.post('/pengaduans', savePengaduan);
router.patch('/pengaduans/:id', updatePengaduan);
router.delete('/pengaduans/:id', deletePengaduan);


export default router;