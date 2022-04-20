let el = document.querySelector('#targetInput');
let triggerBtn = document.querySelector('#triggerBtn');

triggerBtn.addEventListener('click', function() {
    el.value = "任意填入的值";
    console.log(`el.value: ${el.value}`);
    console.log(`el.getAttribute('value'): ${el.getAttribute('value')}`);
})