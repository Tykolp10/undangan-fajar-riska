/* =========================================================================
   CONFIG UNDANGAN DIGITAL — Fajar & Riska
   -------------------------------------------------------------------------
   File ini SATU-SATUNYA yang perlu diedit per event.
   Ubah nilainya saja (sisi kanan), jangan ubah nama variabel (sisi kiri).
   ========================================================================= */

/* =========================================================================
   >>> DESIGN BRIEF UNTUK ANTIGRAVITY (baca dulu sebelum bangun template) <<<

   MOOD       : Khidmat, tenang, serius. Engraving / etched vintage sebagai
                bahasa visual UTAMA. Nuansa folk-rock yang earthy & jujur
                (vibe ala Iwan Fals: hangat, membumi, tulus — BUKAN glamor,
                BUKAN ramai). Sisi "lucu" mempelai wanita masuk HEMAT lewat
                aksen kecil, bukan mengubah keseluruhan tone.

   PALETTE    : - Ink / charcoal      #1A1A1A  (teks utama, garis engraving)
                - Kertas tua / cream   #F3ECE0  (background)
                - Bronze / copper      #8A6D3B  (aksen, ornamen, divider)
                - Dusty rose (lembut)  #E0A89A  (HANYA untuk aksen "lucu",
                                                  pakai sangat sedikit)

   TIPOGRAFI  : - Judul  : serif display berkarakter (Cormorant Garamond /
                           Playfair Display). Boleh blackletter-lite tipis
                           untuk satu headline demi sentuhan "rock".
                - Body   : serif bersih, terbaca enak di HP.

   TEKSTUR    : Grain kertas halus, garis engraving tipis sebagai divider,
                frame ornamental botanical line-art di tepi section penting.

   AKSEN LUCU : 1-2 doodle line-art (mis. kucing kecil / bunga / hati) yang
                digambar bergaya ETCHING — supaya tetap menyatu dengan engraving.
                Prinsip: "cute but engraved." Jangan emoji, jangan kartun bulat.

   HINDARI    : Warna neon, layout ramai, animasi berlebihan, gradient mencolok.
                Tetap clean, tenang, dan elegan.

   FLOW (7 section, urut): Cover -> Pembuka+Ayat -> Mempelai -> Acara+Countdown
                            -> Hadiah -> RSVP -> Penutup
   ========================================================================= */

const CONFIG = {

  /* --- META (tab browser & preview saat link di-share) ------------------ */
  meta: {
    title: "Fajar & Riska Wedding",
    description: "The Wedding of Fajar & Riska",
    ogImage: "assets/img/cover.webp",   // gambar yang muncul saat link dishare di WA/IG
    favicon: "assets/img/favicon.png",
    themeColor: "#8A6D3B",
  },

  /* --- DATA INTI PASANGAN ----------------------------------------------- */
  couple: {
    shortName: "Fajar & Riska",
    // GANTI dengan tanggal acara ASLI. Format ISO + offset WIB (+07:00).
    // Ini yang dipakai countdown & link kalender. WAJIB akurat & valid.
    dateISO: "2026-12-20T08:00:00+07:00",
    dateDisplay: "20 Desember 2026",    // versi yang ditampilkan ke tamu
  },

  /* --- MUSIK LATAR (opsional) ------------------------------------------- */
  // Diputar saat tamu klik "Buka Undangan" (memenuhi aturan autoplay browser).
  // Pilih lagu bertema khidmat/akustik agar selaras dengan mood.
  music: {
    enabled: true,
    src: "assets/audio/song.mp3",       // taruh file lagu pilihanmu di sini
  },

  /* --- 1. COVER / GATE -------------------------------------------------- */
  cover: {
    greeting: "The Wedding of",
    defaultGuest: "Tamu Undangan",      // dipakai kalau URL tidak ada ?to=
    bgImage: "assets/img/cover.webp",
    buttonText: "Buka Undangan",
  },

  /* --- 2. PEMBUKA + AYAT ------------------------------------------------ */
  quote: {
    text: "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang.",
    source: "QS. Ar-Rum: 21",
  },

  /* --- 3. MEMPELAI (ringkas) -------------------------------------------- */
  groom: {
    name: "Fajar",
    fullName: "Fajar Ikhsanuddin",
    parents: "Putra dari Bapak ____ & Ibu ____",   // GANTI nama orang tua
    photo: "assets/img/groom.webp",
    instagram: "",                      // username saja tanpa @, kosongkan kalau tidak ada
  },
  bride: {
    name: "Riska",
    fullName: "Riska Nur Laila",
    parents: "Putri dari Bapak ____ & Ibu ____",   // GANTI nama orang tua
    photo: "assets/img/bride.webp",
    instagram: "",
  },

  /* --- 4. ACARA + COUNTDOWN --------------------------------------------- */
  // Countdown otomatis mengarah ke couple.dateISO di atas.
  events: [
    {
      name: "Akad Nikah",
      dateDisplay: "Sabtu, 20 Desember 2026",
      time: "08.00 WIB - Selesai",
      venue: "____",                                // GANTI nama tempat
      address: "____",                              // GANTI alamat lengkap
      mapsUrl: "https://maps.app.goo.gl/xxxxxxx",   // copy dari tombol Share di Google Maps
    },
    {
      name: "Resepsi",
      dateDisplay: "Sabtu, 20 Desember 2026",
      time: "11.00 WIB - Selesai",
      venue: "____",
      address: "____",
      mapsUrl: "https://maps.app.goo.gl/xxxxxxx",
    },
  ],

  /* --- 5. HADIAH -------------------------------------------------------- */
  gifts: {
    enabled: true,
    note: "Bagi tamu yang ingin mengirimkan tanda kasih, dapat melalui:",
    accounts: [
      { bank: "BCA", logo: "assets/img/bank/bca.png", number: "____", holder: "Fajar Ikhsanuddin" },
      // tambah/hapus objek rekening sesuai kebutuhan
    ],
    shippingAddress: "",                // alamat kirim kado fisik, kosongkan kalau tidak perlu
    confirmWa: "62____",                // nomor WA konfirmasi kado (format 62..., tanpa + atau 0)
  },

  /* --- 6. RSVP ---------------------------------------------------------- */
  // method "whatsapp"  -> tamu konfirmasi via chat WA (paling simpel, tanpa backend)
  // method "appsscript"-> data masuk Google Sheet (butuh setup Apps Script)
  rsvp: {
    method: "appsscript",               // "appsscript" = data masuk Google Sheet
    waNumber: "62____",                 // fallback kalau method diganti ke "whatsapp"
    appsScriptUrl: "https://script.google.com/macros/s/AKfycbz4R4kAllEg7gENyQh8Sze6FZ8-mc9p0qH81aQBDGu_ZvZMGBtsuarYPQfl1QTbZ5j3/exec",                  // <-- TEMPEL URL Web App dari Apps Script di sini
  },

  /* --- 7. PENUTUP ------------------------------------------------------- */
  footer: {
    closingNote: "Merupakan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir di hari bahagia kami.",
    madeBy: "Dibuat dengan \u2661",
  },

};
