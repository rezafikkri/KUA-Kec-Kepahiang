const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {
    getInstagramImages,
    getYoutubeVideos
} = require('./utils/galeri');

const app = express();
const port = process.env.PORT || 3000;

// force https in production
app.use((request, response, next) => {
    if (process.env.NODE_ENV == 'production' && request.headers['x-forwarded-proto'] != 'https') {
       return response.redirect("https://" + request.headers.host + request.url);
    }

    return next();
});

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const { images } = await getInstagramImages(2);
    const { items: videos } = await getYoutubeVideos(2);

    res.render('index', {
        layout: 'layouts/main',
        page: 'beranda',
        title: 'Kantor Urusan Agama Kecamatan Kepahiang',
        images,
        videos
    });
});

app.get('/foto', async (req, res) => {
    const { images, nextPageUrl } = await getInstagramImages(10);

    res.render('foto', {
        layout: 'layouts/main',
        page: 'foto',
        title: 'Foto - KUA Kec. Kepahiang',
        images,
        nextPageUrl
    });
});

app.get('/foto/show-next-images', async (req, res) => {
    const { images, nextPageUrl } = await getInstagramImages(10, req.query.nextPageUrl);

    res.json({ images, nextPageUrl });
});

app.get('/video', async (req, res) => {
    const { items: videos, nextPageToken } = await getYoutubeVideos(10);

    res.render('video', {
        layout: 'layouts/main',
        page: 'video',
        title: 'Video - KUA Kec. Kepahiang',
        videos,
        nextPageToken
    });
});

app.get('/video/show-next-videos', async (req, res) => {
    const { items: videos, nextPageToken } = await getYoutubeVideos(10, req.query.nextPageToken);

    res.json({ videos, nextPageToken });
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

app.get('/persyaratan-rekomendasi-nikah', (req, res) => {
    res.render('persyaratan_rekomendasi_nikah', {
        layout: 'layouts/main',
        page: 'persyaratan-rekomendasi-nikah',
        title: 'Persyaratan Rekomendasi Nikah - KUA Kec. Kepahiang'
    });
});

app.get('/persyaratan-duplikat-buku-nikah', (req, res) => {
    res.render('persyaratan_duplikat_buku_nikah', {
        layout: 'layouts/main',
        page: 'persyaratan-duplikat-buku-nikah',
        title: 'Persyaratan Duplikat Buku Nikah - KUA Kec. Kepahiang'
    });
});

app.get('/persyaratan-isbat-nikah', (req, res) => {
    res.render('persyaratan_isbat_nikah', {
        layout: 'layouts/main',
        page: 'persyaratan-isbat-nikah',
        title: 'Persyaratan Isbat Nikah - KUA Kec. Kepahiang'
    });
});

app.use((req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
