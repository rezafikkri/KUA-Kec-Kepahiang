const grid = document.querySelector('.galeri-grid');
let msnry;
        
imagesLoaded(grid, function() {
    // init Isotope after all images have loaded
    msnry = new Masonry(grid, {
        itemSelector: '.galeri-item',
        columnWidth: '.galeri-sizer',
        percentPosition: true
    });
});
