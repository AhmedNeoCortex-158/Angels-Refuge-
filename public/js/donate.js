    
    document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status and update button
    function updateAuthButton() {
        const authButtonContainer = document.querySelector('.logo-title-flex');
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
      document.getElementById('payment-form').onsubmit = function(e) {
                               
        e.preventDefault();
        console.log("Abanoub Saleh is here ");
        if (this.checkValidity()) {
            const selectedMethod = document.querySelector('.method-btn.active');
            if (!selectedMethod) {
                alert('Please select a payment method');
                return;
            }

            // Get form data
            const form = document.getElementById('payment-form');
            const formData = new FormData(form);
                    var userData = '';
                    var userDataString = null;
                    if (form) {
                         userDataString = localStorage.getItem('user');
                    }
           if (userDataString) {
             userData = JSON.parse(userDataString);

        }
                // Helper function to convert payment method string to number
    function getPaymentMethodValue(method) {
        const methodMap = {
            'bank-transfer': 0,
            'instapay': 1,
            'vodafone-cash': 2,
            'orange-cash': 3,
            'etisalat-cash': 4,
            'we-pay': 5,
            'swift': 6,
            'western-union': 7,
            'remitly': 8
        };
        return methodMap[method] || 0;
    }

            // Create request body with correct field names
            const requestBody = {
                paymentMethod: getPaymentMethodValue(selectedMethod.dataset.method),
                fullName: formData.get('fullName'),
                accountNumber: formData.get('accountNumber'),
                providerName: formData.get('providerName'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                country: formData.get('country'),
                notes: formData.get('notes'),
                userId: userData?.id,
                amount: parseFloat(formData.get('amount'))
            };

            // Get auth token
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                alert('Please sign in to make a donation');
                window.location.href = 'signin.html';
                return;
            }

            // Make API call
            fetch('https://localhost:7250/api/Donation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {

                location.replace("thankyou.html");
            })
            .catch(error => {
                console.error('Error:', error);
                alert('حدث خطأ أثناء معالجة التبرع. يرجى المحاولة مرة أخرى.');
            });
        }
                        };
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