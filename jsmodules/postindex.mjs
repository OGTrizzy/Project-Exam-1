import { fetchPostData } from './apiUtils.mjs';
import { hamburgerMenuFunction } from './jsmodules/hamburgerMenu.mjs';
import { logout } from './jsmodules/logout.mjs';

document.addEventListener('DOMContentLoaded', async () => {
    hamburgerMenuFunction();
    logout();
    const postId = getPostIdFromURL();
    try {
        const postData = await fetchPostData(postId);
        displayPostData(postData);
    } catch (error) {
        console.error('Failed to load post data', error);
    }
});

function getPostIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function displayPostData(data) {
    const imageElement = document.getElementById('post-image');
    imageElement.src = data.media.url;
    imageElement.alt = data.media.alt;

    const titleElement = document.getElementById('post-title');
    titleElement.textContent = data.title;

    const blogTextElement = document.getElementById('post-text');
    blogTextElement.textContent = data.body;

    const editButton = document.getElementById('editButton');
    editButton.addEventListener('click', () => {
        event.preventDefault();
        window.location.href = `edit.html?id=${data.id}`;
    });
}
