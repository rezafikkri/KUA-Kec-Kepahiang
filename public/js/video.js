const galeriElement = document.querySelector('.galeri');
const galeriGridElement = document.querySelector('.galeri-grid .row');

async function showYoutubeVideos(galeriElement, galeriGridElement)
{
    try {
        const response = await fetch('video/gets?limit=20');
        const responseJson = await response.json();
        
        let elems = '';
        responseJson.videos.forEach((video) => {
            elems += `
                <div class="col-12 col-md-6 position-relative p-0">
                    <div class="ratio ratio-16x9">
                        <iframe src="https://www.youtube.com/embed/${video.id.videoId}" title="YouTube video player" allowfullscreen></iframe>
                    </div>
                </div>
            `;
        });
        // inner html videos to galeri grid element
        galeriGridElement.innerHTML = elems;

        // show btn show-next-videos
        const conBtnLoadingElement = document.createElement('div');
        conBtnLoadingElement.classList.add('btn-loading');
        
        let bodyBtnLoadingElement = '';
        if (responseJson.nextPageToken) {
            bodyBtnLoadingElement += `<a href="#" class="btn btn-green" data-next-page-token="${responseJson.nextPageToken}" id="show-next-videos">`;
        } else {
            bodyBtnLoadingElement += '<a href="#" class="btn btn-green disabled" id="show-next-videos">';

            // show message
            const messageElement = document.createElement('p');
            messageElement.classList.add('text-muted');
            messageElement.innerText = 'Video sudah habis.';
            galeriElement.appendChild(messageElement);
        }

        bodyBtnLoadingElement += 'Lihat Lebih Banyak Video</a><div class="loading d-none" id="loading"><div></div></div>';
        conBtnLoadingElement.innerHTML = bodyBtnLoadingElement;
        galeriElement.appendChild(conBtnLoadingElement);
    } catch (error) {
        // remove loading
        document.querySelector('#loading').remove();
        console.error(error);
    }
}

showYoutubeVideos(galeriElement, galeriGridElement);

galeriElement.addEventListener('click', async (e) => {
    const targetElement = e.target;
    if (targetElement.getAttribute('id') == 'show-next-videos' && targetElement.classList.contains('disabled') == false) {
        e.preventDefault(); 

        // show loading
        const loadingElement = document.querySelector('#loading');
        loadingElement.classList.remove('d-none');
    
        const nextPageToken = e.target.dataset.nextPageToken;

        try {
            const response = await fetch(`video/gets?limit=20&nextPageToken=${nextPageToken}`);
            const responseJson = await response.json();

            const galeriGridElement = document.querySelector('.galeri-grid .row');
            responseJson.videos.forEach((video) => {
                const galeriItemElement = document.createElement('div');
                galeriItemElement.setAttribute('class', 'col-12 col-md-6 position-relative p-0');
                galeriItemElement.innerHTML = `
                    <div class="ratio ratio-16x9">
                        <iframe src="https://www.youtube.com/embed/${video.id.videoId}" title="YouTube video player" allowfullscreen></iframe>
                    </div>
                `;
                
                // append element to galeri grid
                galeriGridElement.appendChild(galeriItemElement);
            });

            // if next page token not undefined
            if (responseJson.nextPageToken) {
                // replace next page token in button
                e.target.dataset.nextPageToken = responseJson.nextPageToken;
            } else {
                // disabled button show next images
                e.target.classList.add('disabled');
                // show message
                const messageElement = document.createElement('p');
                messageElement.classList.add('text-muted');
                messageElement.innerText = 'Video sudah habis.';
                e.target.parentElement.parentElement.insertBefore(messageElement, e.target.parentElement);
            }
        } catch (error) {
            console.error(error);
        }
 
        // hide loading
        loadingElement.classList.add('d-none');
    }
});
