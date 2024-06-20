import { postData } from './apiUtils.mjs';
import { hamburgerMenuFunction } from './hamburgerMenu.mjs';
import { logout } from './logout.mjs';

document.addEventListener('DOMContentLoaded', function(){
    hamburgerMenuFunction();
    logout();

    document.getElementById('create-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const title = document.getElementById('create-title').value;
        const body = document.getElementById('create-postText').value;
        const mediaUrl = document.getElementById('create-url').value;
        const mediaAlt = document.getElementById('create-alt').value;
        const accessToken = localStorage.getItem('accessToken');

        const postBody = {
            title,
            body,
            media: {
                url: mediaUrl,
                alt: mediaAlt
            }
        };

        try {
            await postData('Tristian', postBody, accessToken);
            alert('Post created successfully!');
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create post');
        }
    });
});