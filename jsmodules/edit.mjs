import { getData, updateData, deleteData } from './apiUtils.mjs';
import { hamburgerMenuFunction } from './hamburgerMenu.mjs';
import { logout } from './logout.mjs';

document.addEventListener('DOMContentLoaded', async function() {
    hamburgerMenuFunction();
    logout();
    const postId = new URLSearchParams(window.location.search).get('id');
    const accessToken = localStorage.getItem('accessToken');

    if (!postId) {
        console.error('Post ID not found in URL');
        alert('Post ID not found in URL');
        return;
    }

    try {
        const data = await getData(`Tristian/${postId}`, accessToken);
        const post = data.data || data;

        document.getElementById('edit-url').value = post.media?.url || '';
        document.getElementById('edit-alt').value = post.media?.alt || '';
        document.getElementById('edit-title').value = post.title || '';
        document.getElementById('edit-postText').value = post.body || '';
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load post');
    }

    document.getElementById('edit-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        await updatePost(postId, accessToken);
    });

    document.getElementById('delete-button').addEventListener('click', async function() {
        await deletePost(postId, accessToken);
    });
});

async function updatePost(postId, accessToken) {
    const title = document.getElementById('edit-title').value;
    const body = document.getElementById('edit-postText').value;
    const mediaUrl = document.getElementById('edit-url').value;
    const mediaAlt = document.getElementById('edit-alt').value;

    const postBody = {
        title,
        body,
        media: {
            url: mediaUrl,
            alt: mediaAlt
        }
    };

    try {
        await updateData(`Tristian/${postId}`, postBody, accessToken);
        alert('Post updated successfully!');
        window.location.href = '../index.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to update post');
    }
}

async function deletePost(postId, accessToken) {
    try {
        await deleteData(`Tristian/${postId}`, accessToken);
        alert('Post deleted successfully!');
        window.location.href = '../index.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete post');
    }
}
