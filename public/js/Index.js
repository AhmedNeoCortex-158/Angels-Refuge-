document.addEventListener('DOMContentLoaded', function() {
    

    // Check authentication status and update button
    function updateAuthButton() {
        const authButtonContainer = document.querySelector('.logo-title-flex');
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
    // حماية أزرار التبرع والتواصل في الصفحة الرئيسية
    protectActionButton('.donate-btn');
    protectActionButton('.about-btn', 'contact.html');
    protectActionButton('.cause-card-btn');
   
   
   
   // Fade-in on scroll
    function revealOnScroll() {
        document.querySelectorAll('.fade-in').forEach(function(el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('DOMContentLoaded', revealOnScroll);

    // Animated Counters
    let countersStarted = false;
    function animateCounters() {
        if (countersStarted) return;
        const statsSection = document.querySelector('.stats');
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            countersStarted = true;
            document.querySelectorAll('.counter').forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const duration = 1500;
                const step = Math.ceil(target / (duration / 16));
                function updateCounter() {
                    count += step;
                    if (count < target) {
                        counter.textContent = count + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                }
                updateCounter();
            });
        }
    }
    window.addEventListener('scroll', animateCounters);
    window.addEventListener('DOMContentLoaded', animateCounters);

    // Initialize language switcher
    document.addEventListener('DOMContentLoaded', () => {
        const langSwitcher = new LanguageSwitcher();
    });

    // Search Icon Popup (robust infinite open/close)
    document.addEventListener('DOMContentLoaded', function() {
        let searchOpen = false;
        const searchIcon = document.getElementById('search-icon');
        const searchPopup = document.getElementById('search-popup');
        const searchClose = document.getElementById('search-close');
        const searchInputPopup = document.querySelector('.search-input-popup');

        function openSearchPopup() {
            searchOpen = true;
            searchPopup.classList.add('open');
            setTimeout(() => searchInputPopup.focus(), 100);
        }

        function closeSearchPopup() {
            searchOpen = false;
            searchPopup.classList.remove('open');
            searchInputPopup.value = '';
        }

        if (searchIcon && searchPopup && searchClose && searchInputPopup) {
            searchIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!searchOpen) {
                    openSearchPopup();
                } else {
                    closeSearchPopup();
                }
            });
            searchIcon.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (!searchOpen) {
                        openSearchPopup();
                    } else {
                        closeSearchPopup();
                    }
                }
            });
            searchClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeSearchPopup();
            });
            document.addEventListener('click', function(e) {
                if (searchOpen && !searchPopup.contains(e.target) && e.target !== searchIcon) {
                    closeSearchPopup();
                }
            });
            searchInputPopup.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') closeSearchPopup();
            });
            // Prevent click inside popup from closing it
            searchPopup.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        } else {
            console.error('Search elements not found!');
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.querySelector('.news-cards');
        const prevBtn = document.querySelector('.nav-btn.prev');
        const nextBtn = document.querySelector('.nav-btn.next');
        const cards = document.querySelectorAll('.news-card');
        let currentIndex = 0;

        function updateCarousel() {
            const cardWidth = cards[0].offsetWidth + 30; // Including gap
            carousel.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });

        // Update on window resize
        window.addEventListener('resize', updateCarousel);
    });

    // --- Animated Progress Bars on Scroll ---
    document.addEventListener('DOMContentLoaded', function() {
        const progressBars = [
            {
                bar: document.getElementById('progress-donations-bar'),
                value: document.getElementById('progress-donations-value'),
                target: 75
            },
            {
                bar: document.getElementById('progress-medical-bar'),
                value: document.getElementById('progress-medical-value'),
                target: 90
            }
        ];
        let animated = false;
        let observer;
        function animateBar(barElem, valueElem, target) {
            let current = 0;
            const duration = 1200;
            const stepTime = 16;
            const steps = Math.ceil(duration / stepTime);
            const increment = target / steps;
            function step() {
                current += increment;
                if (current < target) {
                    barElem.style.width = current + '%';
                    valueElem.textContent = Math.round(current) + '%';
                    requestAnimationFrame(step);
                } else {
                    barElem.style.width = target + '%';
                    valueElem.textContent = target + '%';
                    valueElem.classList.add('animated');
                    setTimeout(() => valueElem.classList.remove('animated'), 600);
                }
            }
            step();
        }
        function resetBars() {
            progressBars.forEach(({bar, value}) => {
                bar.style.width = '0%';
                value.textContent = '0%';
                value.classList.remove('animated');
            });
        }
        function handleIntersect(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    progressBars.forEach(({bar, value, target}) => animateBar(bar, value, target));
                } else if (!entry.isIntersecting && animated) {
                    animated = false;
                    resetBars();
                }
            });
        }
        const impactSection = document.querySelector('.impact-section');
        if ('IntersectionObserver' in window && impactSection) {
            observer = new IntersectionObserver(handleIntersect, { threshold: 0.3 });
            observer.observe(impactSection);
        } else {
            // fallback: animate on load
            progressBars.forEach(({bar, value, target}) => animateBar(bar, value, target));
        }
    });
});







