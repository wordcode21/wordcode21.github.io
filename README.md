# Portofolio — static site

Situs portofolio statis: HTML + CSS + JavaScript vanilla, **tanpa build step dan tanpa dependency**.
Cukup buka `index.html`, atau upload foldernya ke hosting statis mana pun.

```
portofilio/
├── index.html
├── README.md
└── assets/
    ├── css/style.css
    ├── img/           # taruh logo & screenshot proyek di sini
    └── js/
        ├── boot.js    # penanda JS aktif (jangan diubah)
        ├── data.js    # ← SEMUA KONTEN ADA DI SINI
        └── main.js    # logika + animasi
```

> ## ⚠️ Jangan mengedit nama/teks di `index.html`
>
> Teks di `index.html` hanyalah **cadangan kalau JavaScript mati**. Saat halaman dibuka,
> `main.js` menimpa elemen-elemen ini dengan nilai dari `data.js`:
>
> `#brandMark` `#brandName` `#heroName` `#footerName` `#footerOwner` `#footerMark`
> `#contactEmail` `#contactLocation` `#terminalTitle` `#year` dan seluruh isi social links.
>
> Jadi kalau kamu mengubah nama di `index.html` lalu membuka halamannya, perubahan itu
> **akan tertimpa kembali**. Ubah di `data.js` → `owner`, satu tempat untuk semuanya.
> Ini kesalahan yang paling sering terjadi.

---

## 1. Ganti isi konten (paling penting)

Buka `assets/js/data.js`. Itu satu-satunya file yang perlu kamu sentuh untuk mengubah isi situs.
Ringkasannya:

| Bagian | Isinya |
| --- | --- |
| `owner` | Nama, inisial, handle, logo, jabatan, email, lokasi |
| `socials` | Link GitHub / LinkedIn / X / Email |
| `roles` | Teks yang berganti-ganti di bawah nama (hero) |
| `terminal` | Isi kartu terminal di hero |
| `projects` | Daftar proyek + filter kategori |
| `services` | Layanan yang kamu jual beserta harga |
| `stack` | Teknologi di ticker berjalan |
| `skills` | Progress bar di section About (`level`: 0–100) |
| `stats` | Angka-angka pencapaian |
| `contact` | Endpoint form + pilihan topik |
| `i18n` | Semua label antarmuka (EN + ID) |

### Yang masih harus diganti sebelum dipublikasikan

Nama, email, dan link sosial sudah beres. Yang **masih contoh dan wajib diganti**:

1. `projects` — **enam proyek di dalamnya saya karang** sebagai pengisi tata letak.
   Ganti dengan proyek aslimu (termasuk yang dari bug bounty / CTF / lab), atau hapus
   entri yang tidak perlu. Setiap proyek butuh:
   `id`, `title`, `category`, `year`, `tags`, `summary`, `highlights`, `links`.
2. `stats` — "30+ proyek, 18 audit, 5 tahun, Lighthouse 98" itu **angka karangan**.
   Isi yang benar-benar bisa kamu pertanggungjawabkan; lebih baik kecil tapi jujur.
3. `skills` — level 95/90/88/80 masih perkiraan saya.
4. `services` — harga (Rp 2.5jt / 5jt / 3.5jt) dan daftar fiturnya masih contoh.
   Sesuaikan dengan yang benar-benar kamu tawarkan dan berani kamu kerjakan.
5. `terminal.lines` — teks keluarannya contoh (`128 routes mapped · 0 critical`).
6. `owner.resumeUrl` — isi kalau mau tombol CV (belum ada tombolnya di halaman,
   bilang saja kalau mau ditambahkan).

Angka dan daftar proyek yang terlalu tinggi justru merugikan saat ditanya di interview
atau saat klien memverifikasi. Isi apa adanya.

### Teks dua bahasa

Field yang muncul dalam dua bahasa berbentuk `{ en: '...', id: '...' }`.
Field yang sama di kedua bahasa cukup ditulis sebagai string biasa.
Menambah bahasa ketiga: salin blok di `i18n`, ganti key-nya (misal `ja`), lalu
tambahkan `ja` di object-object `{ en, id }`.

Tombol EN/ID di navbar menyimpan pilihan pengunjung di `localStorage`.

---

## 2. Gambar: logo dan screenshot proyek

### Logo / brand mark (navbar & footer)

Secara default mark-nya adalah inisial namamu ("AD") di dalam kotak gradien.
Untuk memakai gambar sendiri:

1. Taruh file di `assets/img/`, misal `assets/img/logo.png`.
2. Isi di `data.js`:
   ```js
   owner: { logo: 'assets/img/logo.png', ... }
   ```

Gambarnya otomatis dipotong **bulat** (`object-fit: cover`), jadi rasio apa pun aman —
tidak harus persegi dan tidak akan gepeng. Begitu diisi, favicon situs juga ikut
memakai gambar yang sama. Untuk kembali ke inisial, kosongkan lagi: `logo: ''`.

Ukuran **256×256 sudah lebih dari cukup** — mark-nya hanya 34px di layar. File 1024×1024
hanya menambah berat halaman tanpa terlihat bedanya. Kalau mau mengecilkan:

```bash
convert logo-besar.png -resize 256x256 -strip assets/img/logo.png
```

Perlu diketahui: logo ditaruh di navbar (34px) dan footer. Kalau gambarmu berupa teks
panjang atau tulisan kecil, hasilnya akan sulit dibaca di ukuran itu — lebih baik pakai
ikon/simbol yang sederhana.

### Screenshot proyek

Sekarang setiap kartu memakai sampul gradien dengan inisial proyek. Kalau sudah punya screenshot:

```js
// di dalam salah satu entri projects
image: 'assets/img/sentinel.webp',
```

Taruh filenya di `assets/img/`. Rasio yang cocok: **16:10** (misal 1280×800), format `.webp` atau `.jpg`.
Kalau `image` diisi, sampul gradiennya otomatis diganti gambar itu.

---

## 3. Menyambungkan form kontak

Secara default form tidak mengirim ke mana-mana — ia membuka aplikasi email pengunjung
(mode `mailto:`). Untuk mengirim sungguhan, pakai layanan form statis:

1. Daftar di Formspree / Netlify Forms / Web3Forms, dapatkan URL endpoint.
2. Isi di `data.js`:
   ```js
   contact: { endpoint: 'https://formspree.io/f/xxxxxxx', ... }
   ```
3. **Penting:** tambahkan domain endpoint itu ke `connect-src` di tag CSP pada `index.html`,
   kalau tidak request-nya akan diblokir browser:
   ```
   connect-src 'self' https://formspree.io;
   ```

---

## 4. Menjalankan secara lokal

Membuka `index.html` langsung lewat `file://` sebagian besar berfungsi, tapi clipboard API
butuh secure context, jadi lebih baik pakai server lokal:

```bash
cd ~/Documents/portofilio
python3 -m http.server 8000
# buka http://localhost:8000
```

---

## 5. Deploy

Semuanya statis — tidak perlu konfigurasi khusus.

- **GitHub Pages:** push ke repo, Settings → Pages → Deploy from branch (`main` / root).
- **Netlify / Vercel:** drag-and-drop foldernya, atau hubungkan repo. Tidak ada build command,
  publish directory = root.
- **VPS / shared hosting:** upload isi folder ke `public_html`.

Sebelum deploy, ganti juga di `index.html`: `<title>`, `meta[name="description"]`,
dan dua tag `og:title` / `og:description` — kalau tidak, preview link-nya masih
menampilkan nama placeholder. (JS memang menimpa `title` dan `description` saat halaman
dibuka, tapi crawler yang tidak menjalankan JS membaca versi di HTML.)

---

## Daftar animasi

Supaya kamu tahu apa saja yang bisa dimatikan kalau terasa berlebihan:

- Progress bar scroll di paling atas
- Spotlight mengikuti kursor (`initCursorGlow`)
- Blob gradien bergerak di background hero
- Efek mengetik di kartu terminal (`typeTerminal`)
- Teks peran yang berganti dengan animasi flip (`rotateRoles`)
- Reveal bertahap saat elemen masuk viewport, pakai IntersectionObserver
- Angka statistik naik dari 0 (`countUp`), progress bar skill mengisi saat terlihat
- 3D tilt + sheen mengikuti kursor di kartu proyek (`initTilt`)
- Tombol magnetik di hero (`initMagnetic`)
- Ticker stack berjalan dua arah, berhenti saat di-hover
- Badge mengambang di hero dengan parallax (`initHeroParallax`)
- Navbar disembunyikan saat scroll ke bawah, badge aktif mengikuti section
- Modal proyek dengan focus trap + tutup dengan Esc
- Toast untuk umpan balik aksi

Semuanya otomatis dinonaktifkan kalau pengunjung mengaktifkan
**prefers-reduced-motion** di sistemnya (lihat bagian paling bawah `style.css`).

---

## Catatan keamanan

Beberapa pilihan di kode ini sengaja diambil untuk alasan keamanan — jangan diubah tanpa berpikir:

- **CSP ketat** di `index.html`. Kalau kamu menambah script atau font dari domain lain,
  daftarkan domainnya di direktif yang tepat, jangan langsung longgarkan ke `*`.
- **Semua konten dirender dengan `textContent`**, bukan `innerHTML`. `innerHTML` hanya
  dipakai untuk ikon SVG statis di `main.js`. Kalau nanti kamu menarik data proyek dari
  API atau CMS, pertahankan pola ini — di situlah stored XSS biasanya masuk.
- **`rel="noopener noreferrer"`** di semua link eksternal, supaya halaman pihak ketiga
  tidak bisa mengakses `window.opener`.
- **Form divalidasi di klien** hanya untuk kenyamanan, bukan keamanan. Validasi tetap
  harus ada di sisi server saat kamu menyambungkan endpoint.
- Tidak ada tracker, tidak ada cookie, tidak ada request ke pihak ketiga selain Google Fonts.
  Kalau mau bebas sepenuhnya, hapus tiga baris `fonts.googleapis.com` / `fonts.gstatic.com`
  di `index.html` (dan di CSP) — situs akan memakai font sistem.

## Mengganti font

Ganti nama font di `index.html` (link Google Fonts) dan di variabel
`--font-display` / `--font-body` / `--font-mono` di bagian atas `style.css`.
