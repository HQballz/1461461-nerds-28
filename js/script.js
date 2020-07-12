document.addEventListener("DOMContentLoaded", function() {
    /* slider scripts */
    /* slider variables */
    var slideSection = document.querySelector('.js-slider');
    var slideSelect = 'slide_current';
    var slideSelectButton = 'current';
    /* popup variables */
    var popupLink = document.querySelector('.button-address');
    var popupWindow = document.querySelector('.popup-window');
    var buttonPopupClose = popupWindow.querySelector('.cross');
    var popupForm = popupWindow.querySelector('.popup-form')
    var popupName = popupWindow.querySelector('.name');
    var popupEmail = popupWindow.querySelector('.email')
    var popupTextarea = popupWindow.querySelector('.textarea')
    var isStorageSupport = true;
    var storageName = '';
    var storageEmail = '';
    
    function initSlider(slideSection, slideSelect, slideSelectButton) {
        var slides = slideSection.querySelectorAll('.js-slider-track li');
        var buttons = slideSection.querySelectorAll('.js-slider-controls button');
    
        function addActiveSlide(index) {
            slides[index].classList.add(slideSelect);
            buttons[index].classList.add(slideSelectButton);
        }
    
        function removeActiveSlide(index) {
            slides[index].classList.remove(slideSelect);
            buttons[index].classList.remove(slideSelectButton);
        }
    
        function activeSlide(id) {
            buttons.forEach(function(_, index) {
                id === index ? addActiveSlide(index) : removeActiveSlide(index);
            });
        }
    
        buttons.forEach(function(button, id) {
            button.addEventListener('click', function() {
                activeSlide(id);
            });
        });
    }
    if (slideSection) initSlider(slideSection, slideSelect, slideSelectButton);

    /* popup scripts */
    popupForm.noValidate = true;
    
    function popupClose() {
        popupWindow.classList.remove('popup-window-show');
        popupWindow.classList.remove('popup-window-error');
    }

    function popupError() {
        popupWindow.classList.remove('popup-window-error');
        popupWindow.offsetWidth = popupWindow.offsetWidth;
        popupWindow.classList.add('popup-window-error');
    }
    
    try {
        storageName = localStorage.getItem('name');
        storageEmail = localStorage.getItem('email');
    } catch (err) {
        isStorageSupport = false;
    }
    
    popupLink.addEventListener('click', function (evt) {
        evt.preventDefault();
        popupWindow.classList.add('popup-window-show');
    
        if (storageName) {
            popupName.value = storageName;
        } 
        popupEmail.focus();
    });
    
    buttonPopupClose.addEventListener('click', function (evt) {
        evt.preventDefault();
        popupClose();
    });
    
    popupForm.addEventListener('submit', function (evt) {
        if (!popupName.value) {
            evt.preventDefault();
            popupError();
            popupName.classList.add('popup-error');
        } else {
            popupName.classList.remove('popup-error');
            if (isStorageSupport) {
                localStorage.setItem('name', popupName.value);
            }
        }
    
        if (!popupEmail.value) {
            evt.preventDefault();
            popupError();
            popupEmail.classList.add('popup-error');
        } else {
            popupEmail.classList.remove('popup-error');
            if (isStorageSupport) {
                localStorage.setItem('email', popupEmail.value);
            }
        }
    
        if (!popupTextarea.value) {
            evt.preventDefault();
            popupError();
            popupTextarea.classList.add('popup-error');
        } else {
            popupTextarea.classList.remove('popup-error');
        }
    });
    
    window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27 && popupWindow.classList.contains('popup-window-show')) {
            evt.preventDefault();
            popupClose();
        }
    });
});
