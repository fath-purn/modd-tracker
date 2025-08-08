# Aplikasi Pelacak Mood (Mood Tracking App)

Ini adalah aplikasi sederhana untuk melacak suasana hati (mood) harian yang dibangun menggunakan Next.js. Pengguna dapat mencatat suasana hati mereka beserta cuaca, emosi yang dirasakan, dan catatan tambahan. Aplikasi ini juga menyediakan fitur untuk memfilter dan mencari entri berdasarkan kriteria tertentu.

Demo hasil: https://modd-tracker.vercel.app

## ✨ Fitur Utama

- 📝 **Pencatatan Mood:** Catat suasana hati harian lengkap dengan jam, cuaca, emosi, dan catatan.
- 📅 **Riwayat Terorganisir:** Lihat riwayat entri yang dikelompokkan berdasarkan tanggal.
- 🔍 **Filter & Pencarian:** Saring entri berdasarkan bulan, cuaca, dan emosi. Cari catatan spesifik dengan mudah.
- 📱 **Desain Responsif:** Tampilan yang dapat menyesuaikan dengan berbagai ukuran layar.

## 🛠️ Teknologi yang Digunakan

- **Framework:** Next.js
- **Bahasa:** TypeScript
- **Manajemen State:** Zustand
- **Styling:** Tailwind CSS
- **Validasi Skema:** Zod
- **Utilitas Tanggal:** date-fns
- **Font:** Poppins

## 🚀 Instalasi & Menjalankan Proyek

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

### 1. Prasyarat

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (disarankan versi LTS) dan `npm` (atau `yarn`/`pnpm`) di mesin Anda.

### 2. Kloning Repositori

Gunakan `git` untuk mengkloning repositori ini ke komputer Anda.

```bash
git clone https://github.com/fath-purn/mood-tracking.git

cd mood-tracking
```

### 3. Instalasi Dependensi

Instal semua paket yang dibutuhkan oleh proyek dengan menjalankan perintah berikut di terminal:

```bash
npm install
```

### 4. Menjalankan Server Pengembangan

Setelah semua dependensi terinstal, jalankan server pengembangan:

```bash
npm run dev 
```

### 5. Buka Aplikasi

Buka http://localhost:3000 di browser Anda untuk melihat aplikasi berjalan.
