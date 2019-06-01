$(document).ready(function () {
    $('.galeriaJovens').each(function (i, el) {
        $(el).justifiedGallery({
            rowHeight: 100,
            border: 6,
            lastRow: 'nojustify'
        });
    });
});