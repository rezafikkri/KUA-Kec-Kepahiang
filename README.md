<h1 align="center">KUA Kec. Kepahiang</h1>

Bismillah, Assalamu'alaikum Warohmatulloh Wabarokatuh. Website Kantor Urusan Agama Kecamatan Kepahiang. Kamu bisa mengakses website pada link https://kuakepahiang.herokuapp.com/.

### Menu pada website:
- Beranda (menampilkan moto dan prinsip layanan, cuplikan galeri terupdate dan kode etik)
- Galeri (menampilkan foto-foto dokumentasi kegiatan kua kec. kepahiang, foto-foto yang ditampilkan, di ambil langsung dari instagram menggunakan instagram basic display api)
- Profil
  - Sejarah (Menampilkan sejarah kua kec. kepahiang)
  - Visi Misi (Menampilkan visi misi kua kec. kepahiang)
  - Struktur organisasi (Menampilkan struktur organisasi kua kec. kepahiang)
- Info
  - Persyaratan Pernikahan (Menampilkan syarat-syarat pernikahan)
  - Standar Pelayanan Minimal (Menampilkan standar pelayanan minimal kua kec. kepahiang)

### Teknologi Yang Digunakan
- Nodejs
- Express
- Template Engine EJS
- Axios

### Struktur Folder
- Public (Untuk menyimpan static file, seperti image, javascript, css, dll. Serta semua file yang terdapat dalam folder public akan bisa diakses oleh user manapun di internet)
- Utils (Untuk menyimpan file yang melakukan pemrosesan data, seperti mengambil data image dari instagram, mengupdate access_token, dll)
- Views (Untuk menyimpan file-file html untuk setiap halaman pada website kita, seperti index.ejs untuk halaman beranda, dll)
- Writable (Untuk menyimpan file yang berisi data-data yang di buat oleh system, data-data tersebut seperti access_token, dll. Kita butuh menyimpan data-data seperti access token, karena website ini tidak menggunakan database)
- app.js (File ini berisi config untuk server dan route, di file inilah kita menggunakan file-file pada folder Utils, sehingga data-data yang didapatkan nantinya akan bisa di tampilakan pada file-file view yang kita miliki pada folder Views. File ini ibarat penghubung antara Utils dan Views)
