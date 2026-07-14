# RockPaperScissors App

## Pengantar

Starter Project RockPaperScissors adalah aplikasi web yang mampu membedakan gambar yang terlihat pada kamera (webcam) pengguna. Gambar yang dapat dibedakan adalah Batu (Rock), Kertas (Paper), Gunting (Scissors). Dengan kemampuan pengolahan data Computer Vision pada platform browser.

## Table of Contents

- [Cara Menggunakan](#cara-menggunakan)
- [Struktur Project](#struktur-project)

## Cara Menggunakan

### Menjalankan Aplikasi (VS Code Live Server)
1. Install extension "Live Server" di VS Code
2. Klik kanan pada file `index.html`
3. Pilih "Open with Live Server"
4. Aplikasi akan terbuka di browser secara otomatis

### Alternatif Server Lain
```bash
# Node.js live-server
npx live-server
```
## Struktur Project

```
├── assets/
│   ├── css/
│   │   └── styles.css         # Stylesheet utama
│   ├── images/
│   │   └── favicon.png        # Gambar favicon
│   └── js/
│       ├── camera.js          # Manajemen kamera
│       └── script.js          # Aplikasi utama
├── src/                       # Referensi implementasi
├── index.html                 # Halaman utama
└── README.md                  # Dokumentasi
```
