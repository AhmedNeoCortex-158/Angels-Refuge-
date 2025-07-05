 document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status and update button
    function updateAuthButton() {
        const authButtonContainer = document.querySelector('.logo-container');
        const authToken = localStorage.getItem('authToken');
        
        if (authButtonContainer) {
            if (authToken) {
                // User is signed in - show sign out button
                authButtonContainer.innerHTML = `
                    <a href="index.html">
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
                    <a href="index.html">
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