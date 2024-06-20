import { postData } from './apiUtils.mjs';
import { hamburgerMenuFunction } from '/hamburgerMenu.mjs';

document.addEventListener('DOMContentLoaded', function() {
    hamburgerMenuFunction();
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const body = {
            email,
            password
        };

        try {
            const data = await postData('login', body);
            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('name', data.data.name);
            alert('Login successful!');
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to login');
        }
    });
});
