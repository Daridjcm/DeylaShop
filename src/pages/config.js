let titleText = "Welcome to Deyla Shop - ";
let speed = 80;

function scrollTitle() {
    document.title = titleText;
    titleText = titleText.substring(1) + titleText.charAt(0);
    setTimeout(scrollTitle, speed);
}
window.onload = scrollTitle;
