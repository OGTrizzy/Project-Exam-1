import { postData } from '../jsmodules/apiUtils.mjs';
import { hamburgerMenuFunction } from './jsmodules/hamburgerMenu.mjs';
import { logout } from './jsmodules/logout.mjs';

document.addEventListener('DOMContentLoaded', function() {
    hamburgerMenuFunction();
    logout();
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const body = {
            name,
            email,
            password
        };

        try {
            await postData('register', body);
            alert('Registration successful!');
            window.location.href = '../account/login.html';
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to register');
        }
    });
});
