const grid = document.querySelector('.galeri-grid');
const msnry = new Masonry(grid, {
    itemSelector: '.galeri-item',
    columnWidth: '.galeri-sizer',
    percentPosition: true
});
        
imagesLoaded(grid, () => {
    // layout Masonry after each image loads
    msnry.layout();
});

document.querySelector('a#show-next-images').addEventListener('click', async (e) => {
    e.preventDefault(); 

    // show loading
    const loadingElement = document.querySelector('#loading');
    loadingElement.classList.remove('d-none');
    
    const nextPageUrl = encodeURIComponent(e.target.dataset.nextPageUrl);
    const response = await fetch(`foto/show-next-images?nextPageUrl=${nextPageUrl}`);
    const responseJson = await response.json();

    const galeriGridElement = document.querySelector('.galeri-grid');
    let elems = [];
    let fragment = document.createDocumentFragment();
    responseJson.images.forEach((img) => {
        const galeriItemElement = document.createElement('div');
        galeriItemElement.classList.add('galeri-item');
        galeriItemElement.innerHTML = `
            <img src="${img.media_url}" alt="${img.caption}">
            <div class="detail-galeri position-absolute p-3">
                <h5>${img.caption}</h5>
            </div>
        `;

        fragment.appendChild(galeriItemElement);
        elems.push(galeriItemElement);
    });

    // append element to galeri grid
    galeriGridElement.appendChild(fragment);
    imagesLoaded(grid, () => {
        // add and lay out newly appended elements
        msnry.appended(elems);
    });

    // if next page url not undefined
    if (responseJson.nextPageUrl) {
        // replace next page url in button
        e.target.dataset.nextPageUrl = responseJson.nextPageUrl;
    } else {
        // disabled button show next images
        e.target.classList.add('disabled');
        // show message
        const messageElement = document.createElement('p');
        messageElement.classList.add('text-muted');
        messageElement.innerText = 'Gambar sudah habis.';
        e.target.parentElement.parentElement.insertBefore(messageElement, e.target.parentElement);
    }
    
    // hide loading
    loadingElement.classList.add('d-none');
});
