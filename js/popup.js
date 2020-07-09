document.addEventListener("DOMContentLoaded", function() {
    var popupLink = document.querySelector('.button-address');
    var popupWindow = document.querySelector('.popup-window');
    var buttonPopupClose = popupWindow.querySelector('.cross');
    var popupForm = popupWindow.querySelector('.popup-form')
    var popupName = popupWindow.querySelector('.name');
    var popupEmail = popupWindow.querySelector('.email')
    var popupTextarea = popupWindow.querySelector('.textarea')
    
    var isStorageSupport = true;
    var storage = '';
    
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
