document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(signupForm);
            const signupData = {
                firstName: formData.get('first-name'),
                lastName: formData.get('last-name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirm-password'),
                acceptTerms: formData.get('terms') === 'on'
            };

            fetch('https://localhost:7250/api/Auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert('Sign up successful!');
                    window.location.href = 'signin.html';
                    // Redirect or perform other actions
                } else {
                    alert(result.message || 'Sign up failed.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred during signup. Please try again.');
            });
        });
    }

    // --- حماية أزرار التبرع والتواصل ---
    function protectActionButton(selector, redirectUrl) {
        document.querySelectorAll(selector).forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    e.preventDefault();
                    localStorage.setItem('redirectAfterLogin', window.location.pathname);
                    window.location.href = 'signin.html';
                } else if (redirectUrl) {
                    window.location.href = redirectUrl;
                }
            });
        });
    }
    // حماية جميع أزرار تبرع الآن
    protectActionButton('.donate-btn');
    // حماية زر تواصل معنا فقط
    protectActionButton('.about-btn', 'contact.html');

    // تحديث زر تسجيل الدخول/الخروج في الأعلى (اختياري إذا كان هناك هيدر)
    function updateAuthButton() {
        const authButtonContainer = document.querySelector('.header-left');
        if (!authButtonContainer) return;
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            authButtonContainer.innerHTML = `
                <a href="index.html">
                    <img src="../assets/images/Logo_2.png" alt="Logo" class="logo">
                </a>
                <a href="#" class="contact-header-btn" id="signOutBtn" data-i18n="">تسجيل خروج</a>
            `;
            document.getElementById('signOutBtn').addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('authToken');
                window.location.reload();
            });
        } else {
            authButtonContainer.innerHTML = `
                <a href="index.html">
                    <img src="../assets/images/Logo_2.png" alt="Logo" class="logo">
                </a>
                <a href="signin.html" class="contact-header-btn" data-i18n="">تسجيل الدخول</a>
            `;
        }
    }
    document.addEventListener('DOMContentLoaded', updateAuthButton);

});