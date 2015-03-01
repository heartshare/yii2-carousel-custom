var navForCarousel;
var carouselIndicatorsClone;

$('document').ready(function(){
    $('.carousel').carousel({
        interval: 0
    });

    cloneCarouselIndicators();

    $('.carousel').bind('slid.bs.carousel', function(){
        deleteCarouselIndicators();
        cloneCarouselIndicators();
    });

});

function cloneCarouselIndicators(){
    var carouselIndicators = document.getElementsByClassName('carousel-indicators')[0];
    carouselIndicatorsClone = carouselIndicators.cloneNode(true);

    navForCarousel = document.getElementsByClassName('nav-for-carousel')[0];
    navForCarousel.appendChild(carouselIndicatorsClone);
    carouselIndicatorsClone.style.position = 'relative';
    carouselIndicatorsClone.style.display = 'inherit';
}

function deleteCarouselIndicators(){
    navForCarousel.removeChild(carouselIndicatorsClone);
}
