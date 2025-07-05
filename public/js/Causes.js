
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status and update button
    function updateAuthButton() {
        const authButtonContainer = document.querySelector('.header-left');
        const authToken = localStorage.getItem('authToken');
        
        if (authButtonContainer) {
            if (authToken) {
                // User is signed in - show sign out button
                authButtonContainer.innerHTML = `
                    <a href="causes.html">
                        <img src="../assets/images/Logo_2.png" alt="Logo" class="logo">
                    </a>
                    <a href="#" class="contact-header-btn" id="signOutBtn" data-i18n="">تسجيل خروج</a>
                `;
                // Add click event for sign out
                document.getElementById('signOutBtn').addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.removeItem('authToken');
                    window.location.reload();
                });
            } else {
                // User is not signed in - show sign in button
                authButtonContainer.innerHTML = `
                    <a href="causes.html">
                        <img src="../assets/images/Logo_2.png" alt="Logo" class="logo">
                    </a>
                    <a href="signin.html" class="contact-header-btn" data-i18n="">تسجيل الدخول</a>
                `;
            }
        }
    }

    // Call the function when the page loads
    updateAuthButton();

    // --- حماية أزرار التبرع والتواصل ---
    function protectActionButton(selector, redirectUrl) {
        document.querySelectorAll(selector).forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    e.preventDefault();
                    // حفظ الصفحة الحالية للعودة بعد تسجيل الدخول
                    localStorage.setItem('redirectAfterLogin', window.location.pathname);
                    window.location.href = 'signin.html';
                } else if (redirectUrl) {
                    // إذا كان مسجل الدخول، نفذ التحويل
                    window.location.href = redirectUrl;
                }
            });
        });
    }
    // حماية زر تواصل معنا
    protectActionButton('#contactUsBtnCauses', 'contact.html');
    // حماية جميع أزرار تبرع الآن
    protectActionButton('.donate-btn');

});
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});
document.addEventListener('DOMContentLoaded', function() {
    const searchContainer = document.getElementById('search-container');
    const searchIcon = document.getElementById('search-icon');
    const searchInput = searchContainer.querySelector('.search-input');
    searchIcon.addEventListener('click', () => {
        searchContainer.classList.toggle('expanded');
        if (searchContainer.classList.contains('expanded')) {
            searchInput.focus();
        }
    });
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchContainer.classList.remove('expanded');
        }
    });

    // Initialize language switcher
    const langSwitcher = new LanguageSwitcher();

    // Add dynamic effect to Contact Us button
    const contactBtnCauses = document.getElementById('contactUsBtnCauses');
    if (contactBtnCauses) {
        contactBtnCauses.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        contactBtnCauses.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
        contactBtnCauses.addEventListener('mousedown', function() {
            this.classList.add('pressed');
        });
        contactBtnCauses.addEventListener('mouseup', function() {
            this.classList.remove('pressed');
        });
    }
});