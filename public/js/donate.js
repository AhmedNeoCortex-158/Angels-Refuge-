    
    document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status and update button
    function updateAuthButton() {
        const authButtonContainer = document.querySelector('.logo-title-flex');
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
    function protectDonateButton(selector) {
        document.querySelectorAll(selector).forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    e.preventDefault();
                    // رسالة مخصصة بدون زر Cancel
                    alert('يجب تسجيل الدخول أولاً للتبرع');
                    localStorage.setItem('redirectAfterLogin', window.location.pathname);
                    window.location.href = 'signin.html';
                }
            });
        });
    }
    // حماية جميع أزرار تبرع الآن
    protectDonateButton('.donate-btn');
    protectDonateButton('.modern-donate-btn');
    // حماية زر تواصل معنا إن وجد
    protectActionButton('.about-btn', 'contact.html');
});
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

    // Animate donation progress bar and fade-in
    window.addEventListener('DOMContentLoaded', function() {
        // Fade-in
        setTimeout(function() {
            var fade = document.getElementById('donate-fadein');
            if(fade) fade.classList.add('visible');
        }, 200);
        // Progress bar
        var bar = document.getElementById('modern-progress-bar');
        if(bar) setTimeout(function(){ bar.style.width = '60%'; }, 500);
    });

    // ... existing code ...
    // Payment Modal Logic
    function openPaymentModal() {
      document.getElementById('payment-modal').style.display = 'flex';
      // Disable scrolling on the body when modal is open
      document.body.style.overflow = 'hidden';
      setTimeout(()=>{
        document.getElementById('payment-modal').scrollIntoView({behavior:'smooth'});
      }, 100);
    }
    function closePaymentModal() {
      document.getElementById('payment-modal').style.display = 'none';
      // Re-enable scrolling on the body when modal is closed
      document.body.style.overflow = '';
    }
    document.addEventListener('DOMContentLoaded', function() {
      // Add event to all donate buttons
      document.querySelectorAll('.modern-donate-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          openPaymentModal();
        });
      });
      document.getElementById('close-payment-modal').onclick = closePaymentModal;
      document.getElementById('payment-modal').onclick = function(e) {
        if(e.target === this) closePaymentModal();
      };
      // Prevent form submit (demo)
    //   document.getElementById('payment-form').onsubmit = function(e) {
    //     e.preventDefault();
    //     alert('تم تأكيد الدفع! (نموذج تجريبي)');
    //   };
      document.getElementById('complete-payment').onclick = function() {
        alert('تم إكمال العملية! (نموذج تجريبي)');
        closePaymentModal();
      };
    });

    // Add this to your existing scripts
    document.addEventListener('DOMContentLoaded', function() {
        // Remove any box effects from logo
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.style.boxShadow = 'none';
            logo.style.border = 'none';
            logo.style.background = 'none';
            logo.style.padding = '0';
            logo.style.margin = '0';
        }

        // Ensure logo container is clean
        const logoContainer = document.querySelector('.logo-title-flex');
        if (logoContainer) {
            logoContainer.style.background = 'none';
            logoContainer.style.border = 'none';
            logoContainer.style.boxShadow = 'none';
        }
 
    });