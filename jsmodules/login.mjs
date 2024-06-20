import { postData } from '../jsmodules/apiUtils.mjs';

document.addEventListener('DOMContentLoaded', function() {
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
