require('dotenv').config(); // 1. Load variabel dari .env
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); // 2. Paksa DNS Google/Cloudflare

const mongoose = require('mongoose');
const Scheduled = require('./models/scheduledModel');

const scheduledData = [
    { kegiatan: "TournamentBH", tanggal: "2026-12-24", waktu: "19.00", status: "belum" },
    { kegiatan: "HBDKaela", tanggal: "2026-08-30", waktu: "10.00", status: "selesai" },
    { kegiatan: "HUT-RI", tanggal: "2026-08-17", waktu: "09.00", status: "selesai" },
    { kegiatan: "Easter", tanggal: "2026-04-05", waktu: "13.00", status: "selesai" },
    { kegiatan: "WebinarAI", tanggal: "2026-05-10", waktu: "11.00", status: "selesai" },
    { kegiatan: "RapatPAW", tanggal: "2026-09-10", waktu: "14.00", status: "selesai" },
    { kegiatan: "UjianWeb", tanggal: "2026-10-15", waktu: "08.00", status: "belum" },
    { kegiatan: "WorkshopAPI", tanggal: "2026-11-01", waktu: "10.00", status: "belum" },
    { kegiatan: "GatheringDev", tanggal: "2026-11-12", waktu: "15.30", status: "belum" },
    { kegiatan: "Hackathon", tanggal: "2026-11-20", waktu: "09.00", status: "belum" },
    { kegiatan: "Natal", tanggal: "2026-12-25", waktu: "07.00", status: "belum" },
    { kegiatan: "TahunBaru", tanggal: "2026-12-31", waktu: "23.59", status: "belum" },
    { kegiatan: "EvaluasiProject", tanggal: "2026-01-15", waktu: "09.00", status: "selesai" },
    { kegiatan: "KuisBasisData", tanggal: "2026-02-20", waktu: "13.00", status: "selesai" },
    { kegiatan: "PraktikumSistem", tanggal: "2026-03-10", waktu: "10.00", status: "selesai" },
    { kegiatan: "BimbinganTA", tanggal: "2026-06-18", waktu: "11.00", status: "selesai" },
    { kegiatan: "SubmitTugas1", tanggal: "2026-07-01", waktu: "23.59", status: "selesai" },
    { kegiatan: "PresentasiPAW", tanggal: "2026-10-05", waktu: "08.30", status: "selesai" },
    { kegiatan: "ReviewCode", tanggal: "2026-11-05", waktu: "16.00", status: "belum" },
    { kegiatan: "SertifikasiCloud", tanggal: "2026-12-10", waktu: "13.30", status: "belum" }
];

const seedDB = async () => {
    try {
        // Ambil MONGODB_URI dari .env
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Terhubung ke MongoDB Atlas...');

        await Scheduled.deleteMany();
        await Scheduled.insertMany(scheduledData);

        console.log('Berhasil mengimpor 20 data ke MongoDB Atlas!');
        process.exit();
    } catch (error) {
        console.error('Gagal melakukan seeding:', error);
        process.exit(1);
    }
};

seedDB();