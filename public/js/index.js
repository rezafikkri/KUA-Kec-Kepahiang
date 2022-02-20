const fotoElement = document.querySelector('#foto');
const videoElement = document.querySelector('#video');

async function showInstagramImages(fotoElement)
{
    const response = await fetch(`foto/gets?limit=2`);
    const responseJson = await response.json();
    
    let elems = '';
    responseJson.images.forEach((img) => {
        elems += `
            <div class="col-12 col-md-5 position-relative p-0">
                <img src="${img.media_url}" alt="${img.caption}">
                <div class="detail-galeri position-absolute p-3">
                    <h5>${img.caption}</h5>
                </div>
            </div>
        `;
    });
    elems += '<div class="col-12 col-md-2 position-relative p-0 "><a href="/foto" class="btn btn-green rounded-0">Lihat Lebih Banyak Foto</a></div>';

    // inner html images to foto element
    fotoElement.innerHTML = elems;
}

async function showYoutubeVideos(videoElement)
{
    const response = await fetch(`video/gets?limit=2`);
    const responseJson = await response.json();
    
    let elems = '';
    responseJson.videos.forEach((video) => {
        elems = `
            <div class="col-12 col-md-5 position-relative p-0">
                <div class="ratio ratio-16x9">
                    <iframe src="https://www.youtube.com/embed/${video.id.videoId}" title="YouTube video player" allowfullscreen></iframe>
                </div>
            </div>
        `;
    });
    elems += '<div class="col-12 col-md-2 position-relative p-0"><a href="/video" class="btn btn-green rounded-0">Lihat Lebih Banyak Video</a></div>';

    // inner html videos to video element
    videoElement.innerHTML = elems;
}

showInstagramImages(fotoElement);
showYoutubeVideos(videoElement);
