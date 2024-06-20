import { getData } from './apiUtils.mjs';

document.addEventListener("DOMContentLoaded", async function() {
    const user = 'Tristian';
    const accessToken = localStorage.getItem('accessToken');
    const url = `https://v2.api.noroff.dev/blog/posts/${user}`;

    try {
        const data = await getData(user, accessToken);

        const posts = data.data;

        const postElements = document.getElementsByClassName('post');
        for (let i = 0; i < posts.length && i < postElements.length; i++) {
            const post = posts[i];
            const postElement = postElements[i];

            const link = document.createElement('a');
            link.href = `post/index.html?id=${post.id}`;

            const img = document.createElement('img');
            img.src = post.media.url;
            img.alt = post.media.alt;

            const title = document.createElement('h2');
            title.textContent = post.title;
            title.style.textAlign = 'center';

            link.appendChild(img);
            link.appendChild(title);
            postElement.appendChild(link);
        }

        const carouselImages = document.querySelectorAll('.carousel img');
        for (let i = 0; i < 3 && i < posts.length && i < carouselImages.length; i++) {
            const post = posts[i];
            const carouselImage = carouselImages[i];

            carouselImage.src = post.media.url;
            carouselImage.alt = post.media.alt;
            carouselImage.addEventListener('click', () => {
                window.location.href = `post/index.html?id=${post.id}`;
            });
            carouselImage.style.cursor = 'pointer';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load posts');
    }
});

document.getElementById('menu').addEventListener('click', function() {
    var nav = document.getElementById('nav');
    nav.classList.toggle('show');
});

let slideIndex = 0;
const slides = document.querySelectorAll('#images img');

function showSlide(n) {
    for(let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[n].style.display = "block";
}

showSlide(slideIndex);

document.getElementById('next').addEventListener('click', function() {
    slideIndex++;
    if(slideIndex >= slides.length) {  
        slideIndex = 0;
    }
    showSlide(slideIndex);
});

document.getElementById('back').addEventListener('click', function() {
    slideIndex--;
    if(slideIndex < 0) { 
        slideIndex = slides.length - 1;
    }
    showSlide(slideIndex);
});

document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    alert('logged out');
});
