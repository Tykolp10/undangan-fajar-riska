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
    basmallah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    openingLine: "ATAS BERKAT ROCHMAT ALLOH YANG MAHA KUASA",
    greeting: "The Wedding of",
    defaultGuest: "Tamu Undangan",      // dipakai kalau URL tidak ada ?to=
    bgImage: "assets/img/cover.webp",
    buttonText: "Buka Undangan",
  },

  /* --- 2. PEMBUKA + AYAT ------------------------------------------------ */
  quote: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ",
    text: "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang.",
    source: "QS. Ar-Rum: 21",
  },

  /* --- 3. MEMPELAI (ringkas) -------------------------------------------- */
  groom: {
    name: "Fajar",
    fullName: "Fajar Ikhsanuddin",
    parents: "Putra dari Bapak Ikhsanuddin & Ibu Maryam",
    photo: "assets/img/groom.webp",
    instagram: "fajar_ikhsan",
  },
  bride: {
    name: "Riska",
    fullName: "Riska Nur Laila",
    parents: "Putri dari Bapak Joko Susilo & Ibu Aminah",
    photo: "assets/img/bride.webp",
    instagram: "riska_nurlaila",
  },

  /* --- 4. ACARA + COUNTDOWN --------------------------------------------- */
  // Countdown otomatis mengarah ke couple.dateISO di atas.
  events: [
    {
      name: "Akad Nikah",
      dateDisplay: "Minggu, 20 Desember 2026",
      time: "08.00 WIB - Selesai",
      venue: "Masjid Agung Al-Akbar Surabaya",
      address: "Jl. Masjid Al-Akbar Utara No.1, Pagesangan, Jambangan, Surabaya",
      mapsUrl: "https://maps.app.goo.gl/9R2D8c",
    },
    {
      name: "Resepsi",
      dateDisplay: "Minggu, 20 Desember 2026",
      time: "11.00 WIB - Selesai",
      venue: "Ballroom Hotel Santika Premier Surabaya",
      address: "Jl. Raya Gubeng No.54, Gubeng, Kec. Gubeng, Surabaya",
      mapsUrl: "https://maps.app.goo.gl/5fS8Jk",
    },
  ],

  /* --- 5. HADIAH -------------------------------------------------------- */
  gifts: {
    enabled: true,
    note: "Bagi tamu yang ingin mengirimkan tanda kasih, dapat melalui:",
    accounts: [
      { bank: "BCA", logo: "assets/img/bank/bca.png", number: "14002938102", holder: "Fajar Ikhsanuddin" },
      { bank: "Mandiri", logo: "assets/img/bank/mandiri.png", number: "1420019284721", holder: "Riska Nur Laila" }
    ],
    shippingAddress: "Perumahan Indah Asri Blok C-12, Jambangan, Surabaya",
    confirmWa: "6281234567890",
  },

  /* --- 6. RSVP ---------------------------------------------------------- */
  rsvp: {
    method: "appsscript",
    waNumber: "6281234567890",
    appsScriptUrl: "https://script.google.com/macros/s/AKfycbz4R4kAllEg7gENyQh8Sze6FZ8-mc9p0qH81aQBDGu_ZvZMGBtsuarYPQfl1QTbZ5j3/exec",
  },

  /* --- 7. PENUTUP ------------------------------------------------------- */
  footer: {
    closingNote: "Merupakan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir di hari bahagia kami.",
    madeBy: "Dibuat dengan \u2661",
  },

};
