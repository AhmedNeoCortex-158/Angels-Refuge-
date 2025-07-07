document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = 'signin.html';
        return;
    }

    // Get user data from localStorage for initial data
    const userDataString = localStorage.getItem('user');
    if (!userDataString) {
        console.error('No user data found');
        return;
    }

    const initialUserData = JSON.parse(userDataString);

    // Fetch updated user data from API
    fetch(`https://localhost:7250/api/Auth/Profile?userId=${initialUserData.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(userData => {
        // Update localStorage with fresh data
        localStorage.setItem('user', JSON.stringify(userData));

        // Populate personal information
        document.getElementById('firstName').textContent = userData.firstName;
        document.getElementById('lastName').textContent = userData.lastName;
        document.getElementById('email').textContent = userData.email;
        document.getElementById('phone').textContent = userData.phone;

        // Populate donations history
        const donationsGrid = document.getElementById('donationsGrid');
        
        if (userData.donations && userData.donations.length > 0) {
            donationsGrid.innerHTML = ''; // Clear existing content
            userData.donations.forEach(donation => {
                const donationCard = document.createElement('div');
                donationCard.className = 'donation-card';
                donationCard.innerHTML = `
                    <div class="donation-amount">${donation.amount} EGP</div>
                    <div class="donation-detail"><strong>الاسم:</strong> ${donation.fullName}</div>
                    <div class="donation-detail"><strong>البنك:</strong> ${donation.providerName}</div>
                    <div class="donation-detail"><strong>رقم الحساب:</strong> ${donation.accountNumber}</div>
                    <div class="donation-detail"><strong>البريد الإلكتروني:</strong> ${donation.email}</div>
                    <div class="donation-detail"><strong>الهاتف:</strong> ${donation.phone}</div>
                    <div class="donation-detail"><strong>البلد:</strong> ${donation.country}</div>
                    ${donation.notes ? `<div class="donation-detail"><strong>ملاحظات:</strong> ${donation.notes}</div>` : ''}
                `;
                donationsGrid.appendChild(donationCard);
            });
        } else {
            donationsGrid.innerHTML = '<p class="no-donations">لا توجد تبرعات حتى الآن</p>';
        }

        // Update header with fresh data
        updateAuthButton(userData);
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
        // Fallback to localStorage data if API fails
        populateUserData(initialUserData);
    });

    // Initialize language switcher
    if (typeof LanguageSwitcher === 'function') {
        new LanguageSwitcher();
    }

    function populateUserData(userData) {
        document.getElementById('firstName').textContent = userData.firstName;
        document.getElementById('lastName').textContent = userData.lastName;
        document.getElementById('email').textContent = userData.email;
        document.getElementById('phone').textContent = userData.phone;
        updateAuthButton(userData);
    }

    function updateAuthButton(userData) {
        const authButtonContainer = document.querySelector('.logo-container');
        
        if (authToken) {
            authButtonContainer.innerHTML = `
                <a href="index.html">
                    <img src="../assets/images/Logo_2.png" alt="Logo" class="logo">
                </a>
                <div class="dropdown">
                    <button class="contact-header-btn dropdown-toggle">${userData.firstName}</button>
                    <div class="dropdown-menu">
                        <a href="profile.html" class="dropdown-item" data-i18n="">الملف الشخصي</a>
                        <a href="#" class="dropdown-item" id="signOutBtn" data-i18n="">تسجيل خروج</a>
                    </div>
                </div>
            `;

            // Add dropdown functionality
            const dropdownToggle = document.querySelector('.dropdown-toggle');
            const dropdownMenu = document.querySelector('.dropdown-menu');
            
            dropdownToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });

            document.addEventListener('click', function(e) {
                if (!e.target.matches('.dropdown-toggle')) {
                    const dropdowns = document.getElementsByClassName('dropdown-menu');
                    Array.from(dropdowns).forEach(dropdown => {
                        if (dropdown.classList.contains('show')) {
                            dropdown.classList.remove('show');
                        }
                    });
                }
            });

            // Sign out functionality
            document.getElementById('signOutBtn').addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                window.location.href = 'index.html';
            });
        }
    }

    // Call the function to update the header
    updateAuthButton();
});