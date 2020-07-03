var popupLink = document.querySelector(".button-address");
var popupWindow = document.querySelector(".popup-window");
var popupClose = popupWindow.querySelector(".cross");
var popupForm = popupWindow.querySelector(".popup-form")
var popupName = popupWindow.querySelector(".name");
var popupEmail = popupWindow.querySelector(".email")

var isStorageSupport = true;
var storage = "";

try {
    storage = localStorage.getItem("name");
    storage = localStorage.getItem("email");
} catch (err) {
    isStorageSupport = false;
}

popupLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupWindow.classList.add("popup-window-show");

    if (storage) {
        popupName.value = storage;
        popupEmail.value = storage;
    } else {
        popupEmail.focus();
    }

    popupName.focus();
});

popupClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupWindow.classList.remove("popup-window-show");
    popupWindow.classList.remove("popup-window-error");
});

popupForm.addEventListener("submit", function (evt) {
    if (!popupName.value || !popupEmail.value) {
        evt.preventDefault();
        popupWindow.classList.remove("popup-window-error");
        popupWindow.offsetWidth = loginPopup.offsetWidth;
        popupWindow.classList.add("popup-window-error");
    } else {
        if (isStorageSupport) {
            localStorage.setItem("name", popupName.value);
            localStorage.setItem("email", popupEmail.value);
        }
    }
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        if (popupWindow.classList.contains("popup-window-show")) {
            evt.preventDefault();
            popupWindow.classList.remove("popup-window-show");
            popupWindow.classList.remove("popup-window-error");
        }
    }
});