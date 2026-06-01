# Panduan Antigravity — Undangan Digital Fajar & Riska

Dokumen ini berisi **semua yang dibutuhkan** untuk membangun undangan: setup backend
RSVP (Google Apps Script + Spreadsheet) dan prompt berurutan untuk diberikan ke Antigravity.

**Urutan kerja yang benar:** kerjakan **Bagian A (backend) dulu sampai dapat URL Web App**,
baru lanjut **Bagian B (prompt frontend)**. Alasannya: Antigravity butuh URL backend itu
saat menyambungkan form RSVP.

**Cara memberi prompt ke Antigravity:** berikan **satu prompt per giliran**, tunggu dia
selesai, cek hasilnya, baru lanjut prompt berikutnya. Jangan tempel semua sekaligus.

Letakkan `config.js` (file terpisah) di folder project yang sama sebelum mulai.

---

## BAGIAN A — Backend RSVP (Google Apps Script + Spreadsheet)

### A1. Buat Spreadsheet
1. Buka [sheets.new](https://sheets.new) → beri nama `RSVP Fajar Riska`.
2. Ganti nama tab di kiri-bawah (default `Sheet1`) menjadi **`RSVP`** (persis, huruf besar).
3. Isi **baris 1** sebagai header, satu kolom per sel:

   | A | B | C | D | E |
   |---|---|---|---|---|
   | Timestamp | Nama | Jumlah | Status | Ucapan |

### A2. Tempel kode Apps Script
1. Di spreadsheet itu: menu **Extensions → Apps Script**.
2. Hapus semua isi `Code.gs`, ganti dengan kode di bawah, lalu **Save** (ikon disket):

```javascript
/**
 * BACKEND RSVP — Undangan Fajar & Riska
 * Terikat ke Google Sheet (Extensions > Apps Script)
 */

const SHEET_NAME = 'RSVP';

// Terima kiriman RSVP dari undangan -> simpan ke Sheet
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // cegah tabrakan saat banyak tamu submit bersamaan
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.nama   || '',
      data.jumlah || '',
      data.status || '',   // "Hadir" | "Tidak Hadir" | "Ragu"
      data.ucapan || ''
    ]);

    return jsonOut({ result: 'success' });
  } catch (err) {
    return jsonOut({ result: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Kembalikan rekap jumlah kehadiran (untuk counter di undangan)
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();

  let hadir = 0, tidak = 0, ragu = 0;
  for (let i = 1; i < rows.length; i++) {      // lewati header (baris 0)
    const status = String(rows[i][3]).trim();
    if (status === 'Hadir') hadir++;
    else if (status === 'Tidak Hadir') tidak++;
    else if (status === 'Ragu') ragu++;
  }
  return jsonOut({ hadir: hadir, tidak: tidak, ragu: ragu });
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### A3. Deploy sebagai Web App
1. Klik tombol **Deploy → New deployment**.
2. Ikon gerigi (Select type) → pilih **Web app**.
3. Isi:
   - **Description**: `rsvp v1`
   - **Execute as**: **Me**
   - **Who has access**: **Anyone**
4. Klik **Deploy** → akan diminta **Authorize access** → pilih akun Google-mu →
   kalau muncul "Google hasn't verified this app", klik **Advanced → Go to (nama project) → Allow**.
5. Salin **Web app URL** yang muncul (formatnya `https://script.google.com/macros/s/AKfyc.../exec`).

> **PENTING — kalau nanti kode di-edit:** perubahan tidak langsung live. Harus
> **Deploy → Manage deployments → (ikon pensil) Edit → Version: New version → Deploy.**

### A4. Test backend (opsional tapi disarankan)
Tempel Web app URL di browser lalu Enter. Harus muncul JSON seperti
`{"hadir":0,"tidak":0,"ragu":0}`. Kalau muncul itu, backend hidup.

### A5. Sambungkan ke config.js
Buka `config.js`, tempel URL tadi ke `rsvp.appsScriptUrl`:

```javascript
rsvp: {
  method: "appsscript",
  waNumber: "62____",
  appsScriptUrl: "https://script.google.com/macros/s/AKfyc.../exec",   // <-- di sini
},
```

---

## BAGIAN B — Prompt untuk Antigravity (berurutan)

> Berikan satu per satu. Setelah tiap prompt, jalankan & cek di browser sebelum lanjut.

### PROMPT 0 — Master Context (berikan paling awal)

```
Kamu adalah front-end engineer yang membangun satu undangan pernikahan digital statis.

STACK & BATASAN KERAS:
- HANYA HTML, CSS, dan JavaScript vanilla. TANPA framework, TANPA React, TANPA
  build step, TANPA npm. Output harus jalan dengan cara membuka file statis dan
  bisa di-deploy ke GitHub Pages apa adanya.
- Boleh memuat Google Fonts via <link>. Boleh memuat anime.js via CDN untuk animasi.
  Selain itu jangan tambah library.
- Mobile-first. Target lebar acuan 380px. Desktop cukup versi terpusat (max-width).

KONTRAK KONTEN (WAJIB):
- Semua teks, nama, tanggal, foto, nomor, dan URL diambil dari objek global CONFIG
  di file config.js. JANGAN hardcode konten apa pun ke HTML. Template hanya membaca
  CONFIG lalu merender. Kalau sebuah field kosong ("") atau enabled:false, sembunyikan
  bagian itu dengan rapi.
- Baca dan PATUHI blok "DESIGN BRIEF UNTUK ANTIGRAVITY" yang ada di header config.js
  (mood engraving/etched vintage, palette, tipografi, tekstur, aksen "cute but engraved").

STRUKTUR FILE:
undangan/
  index.html
  style.css
  script.js
  config.js        (sudah ada, jangan diubah isinya)
  assets/img/...   (placeholder dulu kalau belum ada gambar)
  assets/audio/...

PERFORMA & KUALITAS:
- Gambar: loading="lazy", pakai .webp, beri width/height agar tidak layout shift.
- Animasi halus & tenang, jangan berlebihan. Hormati prefers-reduced-motion.
- Semantik & aksesibilitas dasar: alt text, kontras cukup, tombol fokusable.

PERSONALISASI:
- Nama tamu dibaca dari query string: ?to=Nama (spasi bisa %20 atau +).
  Render di bagian cover. Kalau tidak ada, pakai CONFIG.cover.defaultGuest.

ALUR 7 SECTION (urut): Cover/Gate -> Pembuka+Ayat -> Mempelai -> Acara+Countdown
-> Hadiah -> RSVP -> Penutup.

Jangan bangun semuanya sekarang. Konfirmasi kamu paham, lalu TUNGGU instruksi
section per section dari saya.
```

### PROMPT 1 — Scaffold + Cover / Gate

```
Buat kerangka index.html, style.css, script.js, dan muat config.js sebelum script.js.

Bangun layar COVER / GATE (layar pertama, full-screen):
- Background CONFIG.cover.bgImage dengan overlay gelap tipis agar teks terbaca.
- Tampilkan CONFIG.cover.greeting, CONFIG.couple.shortName, CONFIG.couple.dateDisplay.
- Baris "Kepada Yth." lalu nama tamu dari ?to= (atau CONFIG.cover.defaultGuest).
- Tombol CONFIG.cover.buttonText. Saat diklik:
  1) gate slide/fade ke atas dan menghilang, body scroll diaktifkan (sebelumnya
     overflow:hidden supaya tamu tidak bisa scroll sebelum membuka),
  2) kalau CONFIG.music.enabled, putar CONFIG.music.src (loop) + sediakan tombol
     mute/unmute melayang kecil yang ikut scroll.
- Terapkan design brief: tipografi serif display, nuansa engraving, palette cream/ink/bronze.

Sisakan <main> kosong berisi placeholder section 2-7 yang akan diisi berikutnya.
```

### PROMPT 2 — Pembuka+Ayat, Mempelai, Acara+Countdown

```
Isi tiga section berikut, semua membaca dari CONFIG, dengan gaya engraving yang tenang
dan divider garis tipis ornamental antar-section:

SECTION 2 — Pembuka + Ayat:
- Tampilkan CONFIG.quote.text dan CONFIG.quote.source. Diberi ruang napas (banyak
  white space), center, terasa khidmat.

SECTION 3 — Mempelai:
- Dua kartu: CONFIG.groom lalu CONFIG.bride. Tiap kartu: foto (frame ornamental
  line-art), fullName, parents, dan ikon Instagram yang nge-link ke
  https://instagram.com/{instagram} (sembunyikan ikon kalau instagram kosong).

SECTION 4 — Acara + Countdown:
- Countdown realtime ke CONFIG.couple.dateISO, format Hari/Jam/Menit/Detik.
  Saat sudah lewat, tampilkan teks "Acara telah berlangsung".
- Tombol "Simpan ke Kalender" yang membuat link Google Calendar dari dateISO
  (durasi default 2 jam).
- Loop CONFIG.events: tiap event tampilkan name, dateDisplay, time, venue, address,
  dan tombol "Lihat Lokasi" ke mapsUrl (buka tab baru).
```

### PROMPT 3 — Hadiah, RSVP form, Penutup

```
SECTION 5 — Hadiah (kalau CONFIG.gifts.enabled):
- Tampilkan CONFIG.gifts.note, lalu tombol "Kirim Hadiah" yang membuka modal/popup.
- Di dalam modal, loop CONFIG.gifts.accounts: logo bank, nama bank, nomor rekening,
  atas nama, dan tombol "Salin" (navigator.clipboard.writeText, beri feedback "Tersalin").
- Kalau CONFIG.gifts.shippingAddress tidak kosong, tampilkan juga sebagai alamat kirim kado.
- Tombol "Konfirmasi via WhatsApp" ke https://wa.me/{CONFIG.gifts.confirmWa}.

SECTION 6 — RSVP (form):
- Field: Nama (text), Jumlah tamu (select 1-5), Status (pilihan: Hadir / Tidak Hadir / Ragu),
  dan Ucapan (textarea, opsional).
- JANGAN pakai elemen <form> dengan submit default; pakai tombol biasa + handler JS.
- Validasi: nama wajib diisi. Tombol submit menampilkan state loading saat mengirim.
- Penyambungan ke backend akan saya berikan di prompt berikutnya — untuk sekarang
  siapkan saja fungsi submitRSVP(data) sebagai placeholder.
- Tampilkan tiga counter: Hadir / Tidak Hadir / Ragu (angka diisi 0 dulu).

SECTION 7 — Penutup:
- CONFIG.footer.closingNote, CONFIG.couple.shortName besar, dan CONFIG.footer.madeBy kecil di bawah.
```

### PROMPT 4 — Sambungkan RSVP ke backend Apps Script

```
Implementasikan fungsi submitRSVP dan pengambilan counter, memakai CONFIG.rsvp.

KIRIM RSVP (saat tombol submit diklik), gunakan PERSIS pola ini agar lolos CORS:

  async function submitRSVP(data) {
    const res = await fetch(CONFIG.rsvp.appsScriptUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // simple request, hindari preflight
      body: JSON.stringify({
        nama: data.nama,
        jumlah: data.jumlah,
        status: data.status,   // kirim PERSIS "Hadir" | "Tidak Hadir" | "Ragu"
        ucapan: data.ucapan || ''
      })
    });
    return res.json();
  }

ALUR UI:
- Sebelum kirim: disable tombol, ubah teks jadi "Mengirim...".
- Sukses (result==='success'): tampilkan pesan "Terima kasih, konfirmasimu tercatat",
  kosongkan form, lalu refresh counter.
- Gagal/error: tampilkan "Gagal mengirim, coba lagi" dan aktifkan kembali tombol.

AMBIL COUNTER saat halaman dibuka dan setelah submit:

  const r = await fetch(CONFIG.rsvp.appsScriptUrl);
  const c = await r.json();   // { hadir, tidak, ragu }

  lalu render c.hadir / c.tidak / c.ragu ke tiga counter di section RSVP.

Tangani kasus CONFIG.rsvp.appsScriptUrl kosong: sembunyikan/disable form dengan pesan
"RSVP belum aktif" agar tidak error.
```

### PROMPT 5 — Polish & finishing

```
Lakukan pass terakhir untuk kualitas:
- Scroll reveal halus tiap section saat masuk viewport (IntersectionObserver atau anime.js),
  tenang dan tidak lebay. Hormati prefers-reduced-motion.
- Tambah 1-2 doodle line-art bergaya etching (inline SVG) sebagai aksen "lucu" yang
  menyatu dengan engraving — taruh di Mempelai dan/atau Penutup. Jangan emoji.
- Tekstur kertas halus pada background (CSS, bukan gambar berat).
- Cek mobile 380px: tidak ada overflow horizontal, tap target >=44px, teks terbaca.
- Pastikan semua section yang field-nya kosong/enabled:false tersembunyi rapi.
- Lighthouse mobile: target Performance & Accessibility 90+. Perbaiki yang merah.
```

---

## BAGIAN C — Test & Deploy

### C1. Test lokal
Jangan buka via `file://` (clipboard & fetch bisa diblokir). Pakai server lokal:

```bash
python3 -m http.server 8000
```

Buka `http://localhost:8000/?to=Budi` → cek nama "Budi" muncul, countdown jalan,
salin rekening berfungsi, dan submit RSVP benar-benar masuk ke Spreadsheet.

### C2. Deploy ke GitHub Pages
1. Push folder ke repo GitHub (public).
2. Repo → **Settings → Pages → Source: Deploy from a branch → main / root → Save**.
3. Tunggu ~1 menit → link: `https://USERNAME.github.io/NAMA-REPO/`.

### C3. Generate link per tamu
Format: `https://USERNAME.github.io/NAMA-REPO/?to=Nama+Tamu` (spasi jadi `+` atau `%20`).
Contoh: `?to=Rizky`, `?to=Pak+Solihin`, `?to=Keluarga+Besar+Bani+Sumo`.
Bisa generate massal dari daftar nama via spreadsheet (kolom nama → formula gabung URL).
