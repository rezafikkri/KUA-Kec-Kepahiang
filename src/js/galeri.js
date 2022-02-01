const Masonry = require('masonry-layout');
const imagesLoaded = require('imagesloaded');

// show images
async function showImages()
{
    try {
        const response = await fetch(`https://kuakepahiang.github.io/images_galeri.json`);
        const responseJson = await response.json();

        const galeriElement = document.querySelector('.galeri .galeri-grid');
        responseJson.forEach(img => {
            const imagesElement = document.createElement('div');
            imagesElement.setAttribute('class', 'galeri-item');
            imagesElement.innerHTML = `
                <img src="${img.url}" alt="${img.title}">
                <div class="detail-galeri position-absolute p-3">
                    <h5>${img.title}</h5>
                </div>
            `;
            galeriElement.appendChild(imagesElement);
        });

        const grid = document.querySelector('.galeri-grid');
        let msnry;
        
        imagesLoaded(grid, function() {
            // init Isotope after all images have loaded
            msnry = new Masonry(grid, {
                itemSelector: '.galeri-item',
                columnWidth: '.galeri-sizer',
                percentPosition: true
            });
        
            // hide loading
            document.querySelector('#loading').classList.add('d-none');
        });
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', showImages);
