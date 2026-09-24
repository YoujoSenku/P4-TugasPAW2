// Mini Project - Pertemuan 3-4: RESTful API CRUD dengan Express.js
// Entitas: scheduled (id, kegiatan, tanggal)
//
// TODO scheduled: lengkapi setiap handler di bawah ini sesuai komentar.
// Jalankan dengan: npm install && npm start

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let scheduled = [
  { id: 1, kegiatan: "TournamentBH", tanggal: "24 Desember 2026", waktu: '19.00', status : 'Belum' },
  { id: 2, kegiatan: "HBDKaela", tanggal: "30 Augustus 2026", waktu: '10.00', status : 'selesai' },
  { id: 3, kegiatan: "HUT-RI", tanggal: "17 Augustus 2026", waktu: '09.00', status : 'selesai' },
  { id: 4, kegiatan: "Easter", tanggal: "05 April 2026", waktu: '13.00', status : 'selesai' },
];

// TODO 1: GET /scheduled -> kirim seluruh data sebagai JSON
app.get("/scheduled", (req, res) => {
  // lengkapi di sini
  res.json(scheduled);
});

// Latihan 1
// Buat fungsi untuk mengambil data scheduled Selesai, dgn alamat : /scheduled/selesai
app.get("/scheduled/selesai", (req, res) => {
  const data = scheduled.filter((m) => m.status === "selesai");
  if (!data) return res.status(404).json({ message: 'Data tidak ditemukan'})
  res.json(data);
})

// TODO 2: GET /scheduled/:id -> cari data berdasarkan id,
// kirim 404 dengan { message: 'Data tidak ditemukan' } jika tidak ada
app.get("/scheduled/:id", (req, res) => {
  // lengkapi di sini
  const id = parseInt (req.params.id);
  const data = scheduled.find((m) => m.id === id);
  if (!data) return res.status(404).json({ message: 'Data tidak ditemukan'});
  res.json(data);
});

// TODO 3: POST /scheduled -> ambil { kegiatan, tanggal } dari req.body,
// buat objek baru dengan id = scheduled.length + 1, simpan ke array,
// kirim response dengan status 201
app.post("/scheduled", (req, res) => {
  // lengkapi di sini
  const {kegiatan, tanggal} = req.body;

  const baru = {
    id: scheduled.length + 1,
    kegiatan,
    tanggal,
  };

  scheduled.push(baru);
  res.status(201).json(baru);
});

// TODO 4: PUT /scheduled/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404, jika ditemukan gabungkan data lama
// dengan req.body lalu kirim data yang telah diperbarui
app.put("/scheduled/:id", (req, res) => {
  // lengkapi di sini
  const id = parseInt(req.params.id);
  const index = scheduled.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({message: 'Data tidak ditemukan'});
  }

  scheduled[index] = { ...scheduled[index], ...req.body };
  req.json(scheduled[index]);
});

// TODO 5: DELETE /scheduled/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404, jika ditemukan hapus dari array
// dan kirim response dengan status 204
app.delete("/scheduled/:id", (req, res) => {
  // lengkapi di sini
  const id = parseInt(req.params.id);
  const index = scheduled.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({message: 'Data tidak ditemukan'});
  }

  scheduled.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
