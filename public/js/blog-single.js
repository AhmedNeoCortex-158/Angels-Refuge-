 document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status and update button
    function updateAuthButton() {
        const authButtonContainer = document.querySelector('.logo-container');
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
                    localStorage.setItem('redirectAfterLogin', window.location.pathname);
                    window.location.href = 'signin.html';
                } else if (redirectUrl) {
                    window.location.href = redirectUrl;
                }
            });
        });
    }
    // حماية زر تواصل معنا في صفحة المدونة
    protectActionButton('#contactUsBtnBlog', 'contact.html');
    // حماية جميع أزرار تبرع الآن
    protectActionButton('.donate-btn');
    // حماية أي زر خاص بالمدونة
    protectActionButton('.blog-btn');
});
 AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
        
        document.addEventListener('DOMContentLoaded', function() {
            // Search functionality
            const searchContainer = document.getElementById('search-container');
            const searchIcon = document.getElementById('search-icon');
            const searchInput = searchContainer.querySelector('.search-input');

            // Toggle search box
            searchIcon.addEventListener('click', () => {
                searchContainer.classList.toggle('expanded');
                if (searchContainer.classList.contains('expanded')) {
                    searchInput.focus();
                }
            });

            // Close search box when clicking outside
            document.addEventListener('click', (e) => {
                if (!searchContainer.contains(e.target)) {
                    searchContainer.classList.remove('expanded');
                }
            });

            // Prevent search box from closing when clicking inside it
            searchContainer.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            // Initialize language switcher
            const langSwitcher = new LanguageSwitcher();

            // Add dynamic effect to Contact Us button
            const contactBtnBlog = document.getElementById('contactUsBtnBlog');
            if (contactBtnBlog) {
                contactBtnBlog.addEventListener('mouseenter', function() {
                    this.classList.add('active');
                });
                contactBtnBlog.addEventListener('mouseleave', function() {
                    this.classList.remove('active');
                });
                contactBtnBlog.addEventListener('mousedown', function() {
                    this.classList.add('pressed');
                });
                contactBtnBlog.addEventListener('mouseup', function() {
                    this.classList.remove('pressed');
                });
            }
        });

        function handleNewsletterSubmit(event) {
            event.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            
            // Here you would typically send this to your backend
            console.log('Newsletter subscription for:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            event.target.reset();
            return false;
        }

        // Add smooth scroll behavior to footer links
        document.querySelectorAll('.footer-link').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    document.querySelector(href).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
       

     
        });