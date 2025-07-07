// Search Icon Popup
    document.addEventListener('DOMContentLoaded', function() {
        const searchIcon = document.getElementById('search-icon');
        const searchPopup = document.getElementById('search-popup');
        const searchInputPopup = document.querySelector('.search-input-popup');
        let searchOpen = false;

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

        searchIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!searchOpen) {
                openSearchPopup();
            } else {
                closeSearchPopup();
            }
        });

        document.addEventListener('click', function(e) {
            if (searchOpen && !searchPopup.contains(e.target) && e.target !== searchIcon) {
                closeSearchPopup();
            }
        });

        searchInputPopup.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSearchPopup();
            }
        });

        searchPopup.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Check if user is logged in
            const authToken = localStorage.getItem('authToken');
            const userDataString = localStorage.getItem('user');
            
            if (!authToken || !userDataString) {
                alert('يرجى تسجيل الدخول أولاً');
                window.location.href = 'signin.html';
                return;
            }

            const userData = JSON.parse(userDataString);

            // Get form data
            const messageData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                content: document.getElementById('content').value,
                userId: userData.id
            };

            try {
                const response = await fetch('https://localhost:7250/api/Message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                    body: JSON.stringify(messageData)
                });

                // In your contact form submission success handler
                if (!response.ok) {
                    throw new Error('حدث خطأ في إرسال الرسالة');
                }
                
                // Redirect to confirmation page instead of showing alert
                window.location.href = 'message-confirmation.html';
                // Clear form and show success message
                contactForm.reset();
                alert('تم إرسال رسالتك بنجاح');

            } catch (error) {
                console.error('Error:', error);
                alert('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى');
            }
        });
    }

    // Initialize language switcher
    if (typeof LanguageSwitcher === 'function') {
        const langSwitcher = new LanguageSwitcher();
    }
