# Panduan Menjalankan Proyek di Lingkungan Lokal

## 1. Prasyarat
Sebelum menjalankan proyek, pastikan Anda telah menginstal beberapa perangkat lunak berikut:

- **Node.js**: Proyek ini menggunakan Node.js untuk menjalankan server dan mengelola dependensi.
  - Anda dapat mengunduh Node.js di [https://nodejs.org](https://nodejs.org).
  
- **npm**: npm (Node Package Manager) biasanya terinstal bersama Node.js. npm digunakan untuk mengelola dependensi proyek.

## 2. Clone Repositori
Langkah pertama adalah meng-clone repository ini ke mesin lokal Anda. Gunakan Git untuk meng-clone repositori.

```bash
git clone https://github.com/rhyssh/dblabs-managementUser.git

```
## 3. Instalasi Depedensi
Setelah meng-clone proyek, buka terminal atau command prompt, dan masuk ke direktori proyek yang baru di-clone.

```bash
cd dblabs-managementUser
```
Kemudian, jalankan perintah berikut untuk menginstal semua dependensi yang dibutuhkan oleh proyek.

```bash
npm install
```

## 4. Menjalankan Proyek
Setelah instalasi selesai, Anda bisa menjalankan aplikasi dengan perintah berikut:

```bash
npm run dev
```
## 5. Akses Proyek
Buka browser dan akses aplikasi dengan mengetikkan URL berikut:

```bash
http://localhost:5173/
```

