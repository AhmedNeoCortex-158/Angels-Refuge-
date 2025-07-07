
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status and update button
    function updateAuthButton() {
        const authButtonContainer = document.querySelector('.header-left');
        const authToken = localStorage.getItem('authToken');
    
        if (authToken) {
            // Fake username (replace with real one if available)
            var userData = '';
                const userDataString = localStorage.getItem('user');
if (userDataString) {
     userData = JSON.parse(userDataString);

}
console.log(userData);
            const username = userData.firstName;
    
            authButtonContainer.innerHTML = `
                <a href="index.html">
                    <img src="../assets/images/Logo_2.png" alt="Logo" class="logo">
                </a>
                <div class="dropdown">
                    <button class="contact-header-btn dropdown-toggle">${username}</button>
                    <div class="dropdown-menu">
                        <a href="profile.html" class="dropdown-item" data-i18n="">الملف الشخصي</a>
                        <a href="#" class="dropdown-item" id="signOutBtn" data-i18n="">تسجيل خروج</a>
                    </div>
                </div>
            `;
    
            // Add dropdown toggle functionality
            const dropdownToggle = document.querySelector('.dropdown-toggle');
            const dropdownMenu = document.querySelector('.dropdown-menu');
            
            dropdownToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.matches('.dropdown-toggle')) {
                    const dropdowns = document.getElementsByClassName('dropdown-menu');
                    for (const dropdown of dropdowns) {
                        if (dropdown.classList.contains('show')) {
                            dropdown.classList.remove('show');
                        }
                    }
                }
            });

            // Sign out action
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
                <a href="signin.html" class="contact-header-btn" data-i18n="">تسجيل دخول</a>
            `;
        }
    
        // إعادة تفعيل زر الترجمة بعد تحديث الهيدر
        if (typeof LanguageSwitcher === 'function') {
            new LanguageSwitcher();
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