var navForCarousel;
var carouselIndicatorsClone;

$('document').ready(function(){
    $('.carousel').carousel({
        interval: 0
    });

    $(document.createElement('div'))
        .addClass('nav-for-carousel row center-block')
        .appendTo($(".portfolio-series"));

    createCarouselIndicators();

    $('.carousel').bind('slid.bs.carousel', function(){
        deleteCarouselIndicators();
        createCarouselIndicators();
    });

});

function createCarouselIndicators(){
    cloneCarouselIndicators();
    appendCarouselIndicators();
}

function cloneCarouselIndicators(){
    var carouselIndicators = document.getElementsByClassName('carousel-indicators')[0];
    carouselIndicatorsClone = carouselIndicators.cloneNode(true);
    carouselIndicatorsClone.style.position = 'relative';
    carouselIndicatorsClone.style.display = 'inherit';
}

function appendCarouselIndicators(){
    navForCarousel = document.getElementsByClassName('nav-for-carousel')[0];
    navForCarousel.appendChild(carouselIndicatorsClone);
}

function deleteCarouselIndicators(){
    navForCarousel.removeChild(carouselIndicatorsClone);
}
