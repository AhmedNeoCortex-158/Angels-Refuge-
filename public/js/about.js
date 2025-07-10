document.addEventListener('DOMContentLoaded', function() {
    // --- تحديث زر الدخول/الخروج ---
    function updateAuthButton() {
        const authButtonContainer = document.querySelector('.header-left');
        if (!authButtonContainer) return;
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            var userData = '';
            const userDataString = localStorage.getItem('user');
            if (userDataString) {
                userData = JSON.parse(userDataString);
            }
            const username = userData.firstName || '';
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
            if (dropdownToggle && dropdownMenu) {
                dropdownToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    dropdownMenu.classList.toggle('show');
                });
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
            }
            // Sign out action
            const signOutBtn = document.getElementById('signOutBtn');
            if (signOutBtn) {
                signOutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.removeItem('authToken');
                    window.location.reload();
                });
            }
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
    protectActionButton('.donate-btn');
    protectActionButton('.about-btn', 'contact.html');
    protectActionButton('.cause-card-btn');

    // --- تفعيل AOS ---
    if (window.AOS) {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // --- البحث ---
    const searchContainer = document.getElementById('search-container');
    const searchIcon = document.getElementById('search-icon');
    if (searchContainer && searchIcon) {
        const searchInput = searchContainer.querySelector('.search-input');
        searchIcon.addEventListener('click', () => {
            searchContainer.classList.toggle('expanded');
            if (searchContainer.classList.contains('expanded') && searchInput) {
                searchInput.focus();
            }
        });
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                searchContainer.classList.remove('expanded');
            }
        });
        searchContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // --- تبديل اللغة ---
    const langButtons = document.querySelectorAll('.lang-btn');
    const htmlTag = document.documentElement;
    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.dataset.lang;
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            htmlTag.setAttribute('lang', lang);
            htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
            if (typeof translations !== 'undefined') {
                const elements = document.querySelectorAll('[data-i18n]');
                elements.forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    if (translations[lang] && translations[lang][key]) {
                        if (el.tagName === 'INPUT') {
                            el.placeholder = translations[lang][key];
                        } else {
                            el.textContent = translations[lang][key];
                        }
                    }
                });
            }
        });
    });

    // --- سكرول ناعم ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- تأثير hover على feature-box ---
    const featureBoxes = document.querySelectorAll('.feature-box');
    featureBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // --- عداد الإحصائيات ---
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        const observerOptions = { threshold: 0.5 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = entry.target;
                    const value = parseInt(target.getAttribute('data-target'));
                    let current = 0;
                    const increment = Math.max(1, Math.ceil(value / 50));
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= value) {
                            target.textContent = value + '+';
                            clearInterval(timer);
                        } else {
                            target.textContent = current + '+';
                        }
                    }, 40);
                    target.classList.add('counted');
                    observer.unobserve(target);
                }
            });
        }, observerOptions);
        stats.forEach(stat => observer.observe(stat));
    }

    // --- تأثير ديناميكي لزر تواصل معنا ---
    const contactBtn = document.getElementById('contactUsBtn');
    if (contactBtn) {
        contactBtn.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        contactBtn.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
        contactBtn.addEventListener('mousedown', function() {
            this.classList.add('pressed');
        });
        contactBtn.addEventListener('mouseup', function() {
            this.classList.remove('pressed');
        });
    }
});