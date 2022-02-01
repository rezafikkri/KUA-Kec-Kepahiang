// show images
async function showImages()
{
    try {
        const response = await fetch(`https://kuakepahiang.github.io/images_beranda.json`);
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
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', showImages);
