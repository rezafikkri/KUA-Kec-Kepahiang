document.querySelector('a#show-next-videos').addEventListener('click', async (e) => {
    e.preventDefault(); 

    // show loading
    const loadingElement = document.querySelector('#loading');
    loadingElement.classList.remove('d-none');
    
    const nextPageToken = e.target.dataset.nextPageToken;
    const response = await fetch(`video/show-next-videos?nextPageToken=${nextPageToken}`);
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
    
    // hide loading
    loadingElement.classList.add('d-none');
});
