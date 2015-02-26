var carousel;
var items;
var activeIndex = 0;
var itemsCount;
var buttons;

function init(){

    carousel = getCarousel();
    if(carousel == null || carousel.length == 0) return;

    items = getItems();
    itemsCount = items.length;

    var left = document.getElementsByClassName('left')[0];
    left.addEventListener("click", function(){ slideImage(-1); });

    var right = document.getElementsByClassName('right')[0];
    right.addEventListener("click", function(){ slideImage(1); });

    document.addEventListener("keydown", downArrowKey);

    buttons = getButtons();
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("mousedown", downButton);
    }

    oldActIndex = activeIndex;
    activeIndex = getActiveIndexFromStorage();


    items[oldActIndex].className = "item";
    items[activeIndex].className = "item active";

    focusButton();
}

function slideImage(direction){

    var oldActIndex = activeIndex;
    activeIndex = activeIndex + 1 * direction;

    if (activeIndex < 0) { activeIndex = itemsCount - 1; }
    if (activeIndex > itemsCount - 1) { activeIndex = 0; }

    items[oldActIndex].className = "item";
    items[activeIndex].className = "item active";

    focusButton();
}

function focusButton(){
    buttons[activeIndex].focus();
}

function downButton(event){

    var oldActIndex = activeIndex;

    activeIndex = event.target.textContent - 1;

    if(activeIndex == oldActIndex) return;

    items[oldActIndex].className = "item";
    items[activeIndex].className = "item active";
}

function downArrowKey(event) {
    if (event.keyCode > 39 || event.keyCode < 37 || event.keyCode == 38) {
        return;
    }

    var direction;
    if (event.keyCode == 39) {
        direction = 1;
    }
    if (event.keyCode == 37) {
        direction = -1;
    }
    slideImage(direction);
}

function getCarousel(){
    return document.getElementsByClassName('carousel')[0];
}

function getItems(){

    var items = carousel.getElementsByClassName('carousel-inner')[0].getElementsByClassName('item');

    return Array.prototype.slice.call(items);
}

function getActiveIndexFromStorage(){

    var storedActIndex = loadActiveIndex();
    return !isNaN(storedActIndex) ? storedActIndex : 0;
}

function getButtons(){

    var buttons = document.getElementsByClassName('button-thumb');

    return Array.prototype.slice.call(buttons);
}

$('document').ready(function() {

    resetDefaults();
    init();
});

/*
    storage
 */
function isLocalStorageAvailable() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

function saveActiveIndex() {
    if(carousel == null || carousel.length == 0 || !isLocalStorageAvailable()) { return; }

    sessionStorage.setItem(document.title, activeIndex.toString());
}

function loadActiveIndex() {
    if (!isLocalStorageAvailable()) { return NaN; }

    return parseInt(sessionStorage.getItem(document.title));
}

$(window).bind('unload', function() {
    $.ajax({
        cache: false,
        async: false,
        dataType: "script"
    });
    saveActiveIndex();
});

/*
 look at Apple documentation
 https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW5
 */
$(window).bind('pagehide', function() {
    $.ajax({
        cache: false,
        async: false,
        dataType: "script"
    });
    saveActiveIndex();
});

/*
    reset default behavior of Yii2\bootstrap::Carousel
 */
function resetDefaults() {

    //disable autoplay
    $('.carousel').carousel({
        interval: 0
    });

    //disable click
    $('.left').click(function(){
        return false;
    });

    $('.right').click(function(){
        return false;
    });

    //disable keydown
    $('.left').keydown(function(){
        return false;
    });

    $('.right').keydown(function(){
        return false;
    });
}


