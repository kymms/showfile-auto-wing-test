# SHOWFILE AUTO WING TEST V0.2

Versi percobaan terpisah sebelum digabung ke Mini App Telegram utama. Membuka template WING .snap, mengedit kontrol dasar dan mengunduh snapshot lengkap. Routing dan parameter detail mengikuti template.

## Unggah GitHub Pages

1. Ekstrak ZIP dan buka folder SHOWFILE_AUTO_WING_TEST.
2. Repository kymms/showfile-auto-wing-test > Add file > Upload files.
3. Unggah index.html, app.js, feed.js, feed-ui.js, README.md langsung ke root repository. Jangan unggah ZIP atau folder pembungkus.
4. Commit changes.
5. Settings > Pages > Deploy from a branch > main > /(root) > Save.
6. Setelah deployment berhasil, buka https://kymms.github.io/showfile-auto-wing-test/.

## Pemakaian

Pilih template .snap sendiri, isi nama file, edit di Channel/Bus/Send/DCA/Bus Feed, kemudian unduh snapshot. Di Bus Feed pilih bus, centang channel, tentukan tindakan lalu Terapkan. Semua tindakan awal KEEP. Ignore Channel Mute hanya berlaku pada TAP/PRE.

FROM CH MUTE menyalin kebalikan status mute saat Terapkan. FROM CH FDR menyalin fader saat Terapkan. Keduanya bukan tautan berkelanjutan. Bus Feed baru mendukung sumber channel, belum Aux/bus.

Belum ada autosave: unduh sebelum menutup halaman. Pemilihan template baru mengganti pekerjaan saat ini. Tidak ada template otomatis bawaan karena file referensi berisi pengaturan percobaan; gunakan snapshot dasar yang diinginkan. Semua parameter yang tidak diedit ikut template.

Warna dan input routing belum tersedia di UI. Aktivasi mute group mengikuti template; editor mengatur keanggotaannya. Gunakan Bus Feed untuk GROUP dan LINK REVERSED. Input angka harus sesuai rentang mixer.

## Pemeriksaan

Sintaks dan logika lulus, termasuk tujuh perbandingan snapshot penuh (selain metadata waktu), kedua kondisi FROM CH MUTE, KEEP, beberapa channel, dan kegagalan tanpa perubahan parsial. Tes sumber: node wing-mobile/verify.cjs dan node wing-mobile/verify-feed.cjs.

Belum diuji visual di ponsel/Telegram atau muat ulang hasil aplikasi di WING-Edit. Belum diterbitkan ke GitHub. Bot dan aplikasi utama tidak diubah.
