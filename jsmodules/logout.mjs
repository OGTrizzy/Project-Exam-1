export function logout() {
    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        alert('logged out');
    });
}