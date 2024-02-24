const popup = document.getElementById("popup");
const popupbutton = document.getElementById("popupbutton");

popupbutton.addEventListener("click",() => {
    popup.classList.add("hidden");
});


setTimeout(() => {

    popup.classList.add("hidden");

},4000)