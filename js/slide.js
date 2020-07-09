document.addEventListener("DOMContentLoaded", function() {
    var slideSection = document.querySelector('.js-slider');
    var slideSelect = 'slide_current';
    var slideSelectButton = 'current';
    
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
    
    initSlider(slideSection, slideSelect, slideSelectButton);
});

