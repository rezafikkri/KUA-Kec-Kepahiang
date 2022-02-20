const galeriElement = document.querySelector('.galeri');
const galeriGridElement = document.querySelector('.galeri-grid');
let msnry;

async function showInstagramImages(galeriElement, galeriGridElement)
{
    const response = await fetch(`foto/gets?limit=20`);
    const responseJson = await response.json();
    
    let elems = '<div class="galeri-sizer"></div>';
    responseJson.images.forEach((img) => {
        elems += `
            <div class="galeri-item">
                <img src="${img.media_url}" alt="${img.caption}">
                <div class="detail-galeri position-absolute p-3">
                    <h5>${img.caption}</h5>
                </div>
            </div>
        `;
    });

    // inner html images to galeri grid element
    galeriGridElement.innerHTML = elems;

    msnry = new Masonry(galeriGridElement, {
        itemSelector: '.galeri-item',
        columnWidth: '.galeri-sizer',
        percentPosition: true
    });

    imagesLoaded(galeriGridElement, () => {
        // layout Masonry after each image loads
        msnry.layout();
        
        // show btn show-next-images
        const conBtnLoadingElement = document.createElement('div');
        conBtnLoadingElement.classList.add('btn-loading');
        
        let bodyBtnLoadingElement = '';
        if (responseJson.nextPageUrl) {
            bodyBtnLoadingElement += `<a href="#" class="btn btn-green" data-next-page-url="${responseJson.nextPageUrl}" id="show-next-images">`;
        } else {
            bodyBtnLoadingElement += '<a href="#" class="btn btn-green disabled" id="show-next-images">';

            // show message
            const messageElement = document.createElement('p');
            messageElement.classList.add('text-muted');
            messageElement.innerText = 'Foto sudah habis.';
            galeriElement.appendChild(messageElement);
        }

        bodyBtnLoadingElement += 'Lihat Lebih Banyak Foto</a><div class="loading d-none" id="loading"><div></div></div>';
        conBtnLoadingElement.innerHTML = bodyBtnLoadingElement;
        galeriElement.appendChild(conBtnLoadingElement);
    });
}

showInstagramImages(galeriElement, galeriGridElement);

galeriElement.addEventListener('click', async (e) => {
    const targetElement = e.target;
    if (targetElement.getAttribute('id') == 'show-next-images' && targetElement.classList.contains('disabled') == false) {
        e.preventDefault();
        
        // show loading
        const loadingElement = document.querySelector('#loading');
        loadingElement.classList.remove('d-none');

        const nextPageUrl = encodeURIComponent(e.target.dataset.nextPageUrl);
        const response = await fetch(`foto/gets?limit=20&nextPageUrl=${nextPageUrl}`);
        const responseJson = await response.json();

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
        imagesLoaded(galeriGridElement, () => {
            // add and lay out newly appended elements
            msnry.appended(elems);

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
                messageElement.innerText = 'Foto sudah habis.';
                e.target.parentElement.parentElement.insertBefore(messageElement, e.target.parentElement);
            }

            // hide loading
            loadingElement.classList.add('d-none');
        });
    }
});
