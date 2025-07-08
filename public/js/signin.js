document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin-form');
    
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(signinForm);
            const signinData = {
                email: formData.get('email'),
                password: formData.get('password')
            };

            fetch('https://localhost:7250/api/Auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signinData)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    localStorage.setItem('authToken', result.token);
                    localStorage.setItem('user', JSON.stringify(result.user));
                    
                    // Check if user is admin
                    if (result.user.firstName === 'admin') {
                        window.location.href = 'admin/dashboard.html';
                    } else {
                        // Regular user routing
                        const redirectUrl = localStorage.getItem('redirectAfterLogin');
                        if (redirectUrl) {
                            localStorage.removeItem('redirectAfterLogin');
                            window.location.href = redirectUrl;
                        } else {
                            window.location.href = 'index.html';
                        }
                    }
                } else {
                    alert(result.message || 'Invalid email or password.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred during login. Please try again.');
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