$(document).ready(function () {

    window.prettyPrint && prettyPrint()

    if ($(window).width() >= 768) {
        $('.galeria_fotos').each(function (i, el) {
            $(el).justifiedGallery({
                rowHeight: 120,
                border: 6,
                lastRow: 'nojustify'
            }).on('jg.complete', function () {
                $animThumb.lightGallery({
                    thumbnail: true
                });
            });
        });
    } else {
        $('.galeria_fotos').each(function (i, el) {
            $(el).justifiedGallery({
                rowHeight: 80,
                border: 10,
                lastRow: 'nojustify'
            }).on('jg.complete', function () {
                $animThumb.lightGallery({
                    thumbnail: true
                });
            });
        });
    }

    // Animated thumbnails
    var $animThumb = $('#galeria_fotos');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            rowHeight: 120,
            margins: 2,
            lastRow: 'justify',
        }).on('jg.complete', function () {
            $animThumb.lightGallery({
                thumbnail: true
            });
        });
    };

    var $animThumb = $('#galeria-vitima');
    if ($animThumb.length) {
        $animThumb.justifiedGallery({
            rowHeight: 120,
            maxRowHeight: 140,
            margins: 2,
            lastRow: 'justify',
        }).on('jg.complete', function () {
            $animThumb.lightGallery({
                thumbnail: true
            });
        });
    };
});