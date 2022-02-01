const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index', {
        layout: 'layouts/main',
        page: 'beranda',
        title: 'Kantor Urusan Agama Kecamatan Kepahiang'
    });
});

app.get('/galeri', (req, res) => {
    res.render('galeri', {
        layout: 'layouts/main',
        page: 'galeri',
        title: 'Galeri - KUA Kec. Kepahiang'
    });
});

app.get('/sejarah', (req, res) => {
    res.render('sejarah', {
        layout: 'layouts/main',
        page: 'sejarah',
        title: 'Sejarah - KUA Kec. Kepahiang'
    });
});

app.get('/visi-misi', (req, res) => {
    res.render('visi_misi', {
        layout: 'layouts/main',
        page: 'visi-misi',
        title: 'Visi Misi - KUA Kec. Kepahiang'
    });
});

app.get('/struktur-organisasi', (req, res) => {
    res.render('struktur_organisasi', {
        layout: 'layouts/main',
        page: 'struktur-organisasi',
        title: 'Struktur Organisasi - KUA Kec. Kepahiang'
    });
});

app.get('/persyaratan-nikah', (req, res) => {
    res.render('persyaratan_nikah', {
        layout: 'layouts/main',
        page: 'persyaratan-nikah',
        title: 'Persyaratan Nikah - KUA Kec. Kepahiang'
    });
});

app.get('/standar-pelayanan-minimal', (req, res) => {
    res.render('standar_pelayanan_minimal', {
        layout: 'layouts/main',
        page: 'standar-pelayanan-minimal',
        title: 'Standar Pelayanan Minimal - KUA Kec. Kepahiang'
    });
});

app.use((req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
