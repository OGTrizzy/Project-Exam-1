export function hamburgerMenuFunction() {
    document.getElementById('menu').addEventListener('click', function() {
        var nav = document.getElementById('nav');
        nav.classList.toggle('show');
    });
}