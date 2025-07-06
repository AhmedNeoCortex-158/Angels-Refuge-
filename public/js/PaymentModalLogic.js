// Payment Modal Logic
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('payment-modal');
    const closeBtn = document.getElementById('close-payment-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const methodButtons = document.querySelectorAll('.method-btn');
    const form = document.getElementById('payment-form');
    const formGroups = form.querySelectorAll('.form-group');

    // Payment method configurations
    const paymentMethods = {
        'bank-transfer': {
            title: 'التحويل البنكي',
            requiredFields: ['full-name', 'account-number', 'provider-name', 'phone', 'email'],
            bankDetails: {
                bankName: 'البنك الأهلي المصري',
                accountNumber: '12345678901234',
                swiftCode: 'NBEGEGCX',
                branch: 'فرع القاهرة',
                iban: 'EG3800190005000000000123456789012'
            }
        },
        'instapay': {
            title: 'InstaPay',
            requiredFields: ['full-name', 'account-number', 'phone', 'email'],
            instructions: 'قم بإدخال رقم المحفظة المرتبط برقم الهوية القومية'
        },
        'vodafone-cash': {
            title: 'Vodafone Cash',
            requiredFields: ['full-name', 'phone', 'email'],
            instructions: 'قم بإدخال رقم الهاتف المرتبط بمحفظة Vodafone Cash'
        },
        'orange-cash': {
            title: 'Orange Cash',
            requiredFields: ['full-name', 'phone', 'email'],
            instructions: 'قم بإدخال رقم الهاتف المرتبط بمحفظة Orange Cash'
        },
        'etisalat-cash': {
            title: 'Etisalat Cash',
            requiredFields: ['full-name', 'phone', 'email'],
            instructions: 'قم بإدخال رقم الهاتف المرتبط بمحفظة Etisalat Cash'
        },
        'we-pay': {
            title: 'We Pay',
            requiredFields: ['full-name', 'account-number', 'phone', 'email'],
            instructions: 'قم بإدخال رقم المحفظة المرتبط بحساب We Pay'
        },
        'swift': {
            title: 'SWIFT',
            requiredFields: ['full-name', 'account-number', 'provider-name', 'phone', 'email', 'country'],
            instructions: 'يرجى التأكد من صحة معلومات التحويل الدولي'
        },
        'western-union': {
            title: 'Western Union',
            requiredFields: ['full-name', 'phone', 'email', 'country'],
            instructions: 'سيتم إرسال تفاصيل التحويل عبر البريد الإلكتروني'
        },
        'remitly': {
            title: 'Remitly',
            requiredFields: ['full-name', 'email', 'country'],
            instructions: 'قم بتسجيل الدخول إلى حساب Remitly الخاص بك'
        }
    };

    function showPaymentDetails(method) {
        const details = paymentMethods[method];
        const detailsContainer = document.querySelector('.payment-details');

        if (!detailsContainer) {
            const newDetailsContainer = document.createElement('div');
            newDetailsContainer.className = 'payment-details';
            form.insertBefore(newDetailsContainer, form.querySelector('.terms-section'));
        }

        let detailsHTML = `
            <div class="payment-instructions">
                <h3>${details.title}</h3>
                ${details.instructions ? `<p>${details.instructions}</p>` : ''}
        `;

        if (details.bankDetails) {
            detailsHTML += `
                <div class="bank-details">
                    <h4>تفاصيل الحساب البنكي:</h4>
                    <ul>
                        <li>اسم البنك: ${details.bankDetails.bankName}</li>
                        <li>رقم الحساب: ${details.bankDetails.accountNumber}</li>
                        <li>رمز SWIFT: ${details.bankDetails.swiftCode}</li>
                        <li>الفرع: ${details.bankDetails.branch}</li>
                        <li>IBAN: ${details.bankDetails.iban}</li>
                    </ul>
                </div>
            `;
        }

        detailsHTML += '</div>';
        document.querySelector('.payment-details').innerHTML = detailsHTML;
        document.querySelector('.payment-details').style.display = 'block';

        // Show/hide form fields based on required fields
        formGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            if (input) {
                const isRequired = details.requiredFields.includes(input.id);
                group.style.display = isRequired ? 'flex' : 'none';
                input.required = isRequired;
            }
        });
    }

    // Add event to all donate buttons
    document.querySelectorAll('.modern-donate-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });

    // Close modal events
    closeBtn.onclick = closeModal;
    cancelBtn.onclick = closeModal;
    modal.onclick = function(e) {
        if (e.target === modal) closeModal();
    };

    // Method selection
    methodButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const method = this.dataset.method;
            methodButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            showPaymentDetails(method);
        });
    });

    // Form validation
    // Add function to set user ID from localStorage
    function setUserIdFromStorage() {
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            const userIdField = document.getElementById('userId');
            if (userIdField && userData.id) {
                userIdField.value = userData.id;
            }
        }
    }

    // Modify form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (this.checkValidity()) {
            const selectedMethod = document.querySelector('.method-btn.active');
            if (!selectedMethod) {
                alert('Please select a payment method');
                return;
            }

            // Get form data
            const formData = new FormData(form);
            
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
                userId: formData.get('userId'),
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
            fetch('https://localhost:7250/api/Donations', {
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
                alert('تم تأكيد التبرع بنجاح!');
                closeModal();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('حدث خطأ أثناء معالجة التبرع. يرجى المحاولة مرة أخرى.');
            });
        }
    });

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

    // Call setUserIdFromStorage when opening the modal
    function openModal() {
        setUserIdFromStorage();
        modal.style.display = 'flex';
    }

    // Input validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.remove('invalid');
                this.classList.add('valid');
            } else {
                this.classList.remove('valid');
                this.classList.add('invalid');
            }
        });
    });

    // Add copy button functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('copy-btn')) {
            const btn = e.target;
            const originalText = btn.textContent;
            btn.textContent = 'تم النسخ!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        }
    });
});
