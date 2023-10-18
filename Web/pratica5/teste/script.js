
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const passwordError = document.getElementById('password-error');

    form.addEventListener('submit', function (e) {
        if (password.value !== confirmPassword.value) {
            e.preventDefault();
            passwordError.textContent = 'As senhas não coincidem.';
        } else {
            passwordError.textContent = '';
        }
    });

    password.addEventListener('input', function () {
        passwordError.textContent = '';
    });
    confirmPassword.addEventListener('input', function () {
        passwordError.textContent = '';
    });
});
