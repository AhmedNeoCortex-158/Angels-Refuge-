  
  document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status and update button
    function updateAuthButton() {
        const authButtonContainer = document.querySelector('header-left');
        const authToken = localStorage.getItem('authToken');
        
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
                <a href="signin.html" class="contact-header-btn" data-i18n="">تسجيل دخول</a>
            `;
        }
    }

    // Call the function when the page loads
    updateAuthButton();
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
            // FAQ accordion
            document.querySelectorAll('.faq-question').forEach(btn => {
                btn.addEventListener('click', function() {
                    const answer = this.nextElementSibling;
                    const isActive = this.classList.contains('active');
                    document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
                    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('active'));
                    if (!isActive) {
                        this.classList.add('active');
                        answer.classList.add('active');
                    }
                });
            });

            // Initialize language switcher
            const langSwitcher = new LanguageSwitcher();

            // Add dynamic effect to Contact Us button
            const contactBtnFaq = document.getElementById('contactUsBtnFaq');
            if (contactBtnFaq) {
                contactBtnFaq.addEventListener('mouseenter', function() {
                    this.classList.add('active');
                });
                contactBtnFaq.addEventListener('mouseleave', function() {
                    this.classList.remove('active');
                });
                contactBtnFaq.addEventListener('mousedown', function() {
                    this.classList.add('pressed');
                });
                contactBtnFaq.addEventListener('mouseup', function() {
                    this.classList.remove('pressed');
                });
            }
        });