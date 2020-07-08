var popupLink = document.querySelector('.button-address');
var popupWindow = document.querySelector('.popup-window');
var popupClosebutton = popupWindow.querySelector('.cross');
var popupForm = popupWindow.querySelector('.popup-form')
var popupName = popupWindow.querySelector('.name');
var popupEmail = popupWindow.querySelector('.email')
var popupTextarea = popupWindow.querySelector('.textarea')


var isStorageSupport = true;
var storage = '';


function popupClose() {
    popupWindow.classList.remove('popup-window-show');
    popupWindow.classList.remove('popup-window-error');
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
    popupName.removeAttribute('required');
    popupEmail.removeAttribute('required');

    if (storage) {
        popupName.value = storageName;
    } else {
        popupEmail.focus();
    }
    if (storage) {
        popupEmail.value = storageEmail;
    } else {
        popupTextarea.focus();
    }

    popupName.focus();
});

popupClosebutton.addEventListener('click', function (evt) {
    evt.preventDefault();
    popupClose();
});

popupForm.addEventListener('submit', function (evt) {
    if (!popupName.value || !popupEmail.value) {
        evt.preventDefault();
        popupWindow.classList.remove('popup-window-error');
        popupWindow.offsetWidth = popupWindow.offsetWidth;
        popupWindow.classList.add('popup-window-error');
        popupName.classList.add('popup-error');
        popupEmail.classList.add('popup-error');
    } else {
        popupName.classList.remove('popup-error');
        popupEmail.classList.remove('popup-error');
        if (isStorageSupport) {
            localStorage.setItem('name', popupName.value);
            localStorage.setItem('email', popupEmail.value);
        }
    }
});

window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27 && popupWindow.classList.contains('popup-window-show')) {
        evt.preventDefault();
        popupClose();
    }
});