# Portofolio Mahasiswa Teknik Informatika — Universitas Malikussaleh

Portofolio web modern, interaktif, dan responsif yang dirancang khusus untuk mempresentasikan pencapaian akademik, kepemimpinan organisasi, inisiatif pengabdian masyarakat daerah, hingga minat kompetitif esports & olahraga.

---

## 🌟 Sorotan Utama Portofolio

1. **Akademik & Kewirausahaan (P2MW)**:
   - Mahasiswa S1 Teknik Informatika di **Universitas Malikussaleh (UNIMAL)**, Lhokseumawe, Aceh Utara.
   - **Lolos Pendanaan Program Pembinaan Mahasiswa Wirausaha (P2MW)** di Semester 3 oleh Kemendikbudristek/Belmawa.
   - **Siswa Berprestasi Tingkat SMP se-Kabupaten** (seleksi testing seluruh kabupaten terpilih 3 siswa dari setiap sekolah negeri).

2. **Aksi Pengabdian Masyarakat di Daerah Asal**:
   - Sebagai mahasiswa daerah yang merantau kuliah di Lhokseumawe, kembali mengabdi ke kampung halaman.
   - Menginisiasi & mendatangkan **Perpustakaan Keliling** untuk anak-anak Sekolah Dasar (SD).
   - Terjun langsung mengajar dan memotivasi murid SD.
   - Menjadi penggerak dan panitia persiapan perayaan **HUT Kemerdekaan Republik Indonesia (17 Agustus)** di desa.

3. **Kepemimpinan & Organisasi**:
   - **Ketua Bidang Humas (Hubungan Masyarakat) OSIS SMA** (Public relations, diplomasi antarsekolah, event organizer).
   - **Pramuka Penegak Bantara** (Disiplin tinggi, SKU Bantara, ketangkasan lapangan).

4. **Zona Luar Akademik (Esports & Olahraga)**:
   - **Ketua Guild tim "EXS SWORDS"**.
   - Berhasil melaju hingga babak **Semi-Final Tournament Free Fire Kota Medan** (In-Game Leader, manajemen strategi).
   - Ekstrakurikuler **Bola Voli di masa SMA** (Kebugaran jasmani, refleks & daya juang tim).

---

## 📸 Pengaturan Foto Profil (Manual via VS Code)

Website ini telah disetel **100% Bersih & Terkunci (*Read-Only*)** tanpa tombol edit di website, sehingga tidak ada pengunjung luar yang bisa mengutak-atik foto Anda:

1. **Lokasi File Foto**:
   - File foto aktif berada di: [`assets/Foto.jpg`](file:///e:/project%20coba/assets/Foto.jpg).
2. **Cara Anda Mengganti Foto Secara Manual di Masa Depan**:
   - **Cara 1 (Paling Mudah)**: Cukup ganti/timpa file `Foto.jpg` di dalam folder `assets/` dengan foto baru Anda (pastikan namanya tetap `Foto.jpg`).
   - **Cara 2 (Ubah Nama File di VS Code)**: Jika foto baru Anda memiliki nama lain (misalnya `wisuda.jpg`), buka file `index.html` di VS Code, lalu ubah baris `src="assets/Foto.jpg"` menjadi `src="assets/wisuda.jpg"`.
3. **Framing & Proporsi Wajah**:
   - Posisi vertikal foto telah diatur dengan `object-position: center 20%` agar wajah dan bagian atas tubuh selalu terbingkai proporsional.

---

## 🚀 Cara Menjalankan Portofolio

### 1. Buka Langsung (Offline / Tanpa Instalasi)
Cukup klik dua kali (double click) file `index.html` pada File Explorer Anda di folder `e:\project coba`. Portofolio akan langsung terbuka di Google Chrome, Microsoft Edge, atau browser favorit Anda.

### 2. Menggunakan Local Server (Node.js)
Jika ingin menjalankan melalui local server:
```bash
npx serve .
```
Lalu buka alamat yang tertera di terminal (biasanya `http://localhost:3000`).

---

## 📁 Struktur Berkas

```
project coba/
├── assets/
│   ├── favicon.svg            # Favicon modern UNIMAL
│   ├── profile-default.svg    # Avatar default tech vector
│   └── (profile.jpg)          # Tempatkan foto pribadi Anda di sini (opsional)
├── css/
│   └── style.css              # Custom styling, glow effect, glassmorphism, & tema
├── js/
│   └── main.js                # Typewriter, photo manager, counter animation, & filter
├── index.html                 # Halaman utama portofolio interaktif
└── README.md                  # Dokumentasi panduan lengkap
```

---

## 🎨 Fitur UI & Interaktivitas

- **Cyber Modern Dark Mode & Light Mode**: Dilengkapi sakelar pengubah tema dengan aksen neon cyan & electric violet.
- **Dynamic Typing Animation**: Menampilkan ringkasan profil secara bergantian dan dinamis di Hero section.
- **Interactive Achievement Filter**: Filter kategori jejak prestasi (Semua, P2MW & Prestasi, Pengabdian SD, OSIS & Bantara, Esports & Voli).
- **Pop-up Detail Cerita**: Klik tombol "Buka Detail" pada setiap kartu prestasi untuk membaca kisah naratif lengkap.
- **Profil Terkunci & Aman**: Tampilan aman (*read-only*) dengan badge status terverifikasi tanpa celah edit dari pengunjung.
- **Animasi Stats Counter**: Angka pencapaian terhitung otomatis saat di-scroll.
- **Fast WhatsApp & Copy Email Action**: Tombol sekali klik untuk menyalin email atau menghubungi lewat formulir.
