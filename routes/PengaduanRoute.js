import express from "express";
import{
  getPengaduanById, getPengaduan, savePengaduan, updatePengaduan, deletePengaduan,
  getMasyarakatById, getMasyarakat, saveMasyarakat, updateMasyarakat, deleteMasyarakat,
  getPetugasById, getPetugas, savePetugas, updatePetugas, deletePetugas,
  getTanggapanById, getTanggapan, saveTanggapan, updateTanggapan, deleteTanggapan,
} from "../controllers/PengaduanController.js";

const router = express.Router();

router.get('/pengaduan', getPengaduan);
router.get('/pengaduan/:id', getPengaduanById);
router.post('/pengaduan', savePengaduan);
router.patch('/pengaduan/:id', updatePengaduan);
router.delete('/pengaduan/:id', deletePengaduan);


router.get('/masyarakat', getMasyarakat);
router.get('/masyarakat/:id', getMasyarakatById);
router.post('/masyarakat', saveMasyarakat);
router.patch('/masyarakat/:id', updateMasyarakat);
router.delete('/masyarakat/:id', deleteMasyarakat);

router.get('/petugas', getPetugas);
router.get('/petugas/:id', getPetugasById);
router.post('/petugas', savePetugas);
router.patch('/petugas/:id', updatePetugas);
router.delete('/petugas/:id', deletePetugas);

router.get('/tanggapan', getTanggapan);
router.get('/tanggapan/:id', getTanggapanById);
router.post('/tanggapan', saveTanggapan);
router.patch('/tanggapan/:id', updateTanggapan);
router.delete('/tanggapan/:id', deleteTanggapan);

export default router;