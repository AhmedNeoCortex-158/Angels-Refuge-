/**
 * Donation Modal Handler
 *
 * This script adds the payment modal functionality to all pages.
 * It ensures that all donate buttons across the site trigger the same payment modal.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page that doesn't have the payment modal
    if (!document.getElementById('payment-modal')) {
        // Create a container for the modal
        const modalContainer = document.createElement('div');
        modalContainer.id = 'payment-modal-container';

        // Fetch the Donate.html page to extract the modal
        fetch('Donate.html')
            .then(response => response.text())
            .then(html => {
                // Create a temporary element to parse the HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;

                // Extract the payment modal
                const paymentModal = tempDiv.querySelector('#payment-modal');
                if (paymentModal) {
                    // Add the modal to our page
                    modalContainer.innerHTML = paymentModal.outerHTML;
                    document.body.appendChild(modalContainer);

                    // Extract and add the modal styles
                    const styles = tempDiv.querySelectorAll('style');
                    styles.forEach(style => {
                        if (style.textContent.includes('.payment-modal') ||
                            style.textContent.includes('#payment-modal')) {
                            document.head.appendChild(style.cloneNode(true));
                        }
                    });

                    // Define the modal opening and closing functions
                    window.openPaymentModal = function() {
                        document.getElementById('payment-modal').style.display = 'flex';
                        // Disable scrolling on the body when modal is open
                        document.body.style.overflow = 'hidden';
                        setTimeout(() => {
                            document.getElementById('payment-modal').scrollIntoView({behavior:'smooth'});
                        }, 100);
                    };

                    window.closePaymentModal = function() {
                        document.getElementById('payment-modal').style.display = 'none';
                        // Re-enable scrolling on the body when modal is closed
                        document.body.style.overflow = '';
                    };

                    // Add event listeners to the modal elements
                    document.getElementById('close-payment-modal').onclick = closePaymentModal;
                    document.getElementById('payment-modal').onclick = function(e) {
                        if (e.target === this) closePaymentModal();
                    };

                    // Add event listener to the Cancel button
                    const cancelBtn = document.querySelector('.cancel-btn');
                    if (cancelBtn) {
                        cancelBtn.onclick = closePaymentModal;
                    }

                        // Add function to set user ID from localStorage

                    // Add event listeners to the form elements
                    const form = document.getElementById('payment-form');
                    var userData = '';
                    if (form) {
                        const userDataString = localStorage.getItem('user');
        if (userDataString) {
             userData = JSON.parse(userDataString);

        }
                        form.onsubmit = function(e) {
                               
        e.preventDefault();
        console.log("Abanoub Saleh is here ");
        if (this.checkValidity()) {
            const selectedMethod = document.querySelector('.method-btn.active');
            if (!selectedMethod) {
                alert('Please select a payment method');
                return;
            }

            // Get form data
            const formData = new FormData(form);
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
                    }

                    const completePayment = document.getElementById('complete-payment');
                    if (completePayment) {
                        completePayment.onclick = function() {
                            alert('تم إكمال العملية! (نموذج تجريبي)');
                            closePaymentModal();
                        };
                    }

                    // Initialize payment method buttons
                    const methodButtons = document.querySelectorAll('.method-btn');
                    if (methodButtons.length > 0) {
                        // Payment method configurations with all available methods
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
                                },
                                instructions: 'يرجى التأكد من صحة معلومات الحساب البنكي قبل إجراء التحويل'
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
                                requiredFields: ['full-name', 'phone', 'email'],
                                instructions: 'قم بإدخال رقم الهاتف المرتبط بمحفظة We Pay'
                            },
                            'swift': {
                                title: 'SWIFT',
                                requiredFields: ['full-name', 'account-number', 'provider-name', 'phone', 'email'],
                                bankDetails: {
                                    bankName: 'البنك الأهلي المصري',
                                    accountNumber: '12345678901234',
                                    swiftCode: 'NBEGEGCX',
                                    branch: 'فرع القاهرة',
                                    iban: 'EG3800190005000000000123456789012'
                                },
                                instructions: 'للتحويلات الدولية، يرجى استخدام رمز SWIFT المذكور أدناه'
                            },
                            'western-union': {
                                title: 'Western Union',
                                requiredFields: ['full-name', 'phone', 'email'],
                                instructions: 'يرجى زيارة أقرب فرع Western Union وتقديم المعلومات المطلوبة للتحويل'
                            },
                            'remitly': {
                                title: 'Remitly',
                                requiredFields: ['full-name', 'phone', 'email'],
                                instructions: 'استخدم تطبيق Remitly وأدخل المعلومات المطلوبة للتحويل'
                            }
                        };

                        // Function to show payment details
                        function showPaymentDetails(method) {
                            const details = paymentMethods[method];
                            if (!details) return;

                            let detailsContainer = document.querySelector('.payment-details');
                            if (!detailsContainer) {
                                detailsContainer = document.createElement('div');
                                detailsContainer.className = 'payment-details';
                                const termsSection = form.querySelector('.terms-section');
                                if (termsSection) {
                                    form.insertBefore(detailsContainer, termsSection);
                                } else {
                                    form.appendChild(detailsContainer);
                                }
                            }

                            let detailsHTML = `
                                <div class="payment-instructions">
                                    <h3>${details.title}</h3>
                                    <p>${details.instructions || ''}</p>
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
                            detailsContainer.innerHTML = detailsHTML;
                            detailsContainer.style.display = 'block';

                            // Show/hide form fields based on required fields
                            const formGroups = form.querySelectorAll('.form-group');
                            formGroups.forEach(group => {
                                const input = group.querySelector('input, select, textarea');
                                if (input) {
                                    const isRequired = details.requiredFields && details.requiredFields.includes(input.id);
                                    group.style.display = isRequired ? 'flex' : 'none';
                                    if (input.hasAttribute('required')) {
                                        input.required = isRequired;
                                    }
                                }
                            });
                        }

                        // Add event listeners to method buttons
                        methodButtons.forEach(btn => {
                            // Use a more reliable way to add event listeners
                            // First remove any existing listeners by cloning the button
                            const newBtn = btn.cloneNode(true);
                            btn.parentNode.replaceChild(newBtn, btn);

                            // Then add the event listener
                            newBtn.addEventListener('click', function() {
                                const method = this.dataset.method;
                                // Remove active class from all buttons
                                methodButtons.forEach(b => b.classList.remove('active'));
                                // Add active class to the clicked button
                                this.classList.add('active');
                                // Show payment details for the selected method
                                showPaymentDetails(method);
                            });
                        });

                        // No default method selection - user must choose manually
                        // Display a message prompting the user to select a payment method
                        const detailsContainer = document.querySelector('.payment-details') || document.createElement('div');
                        if (!document.querySelector('.payment-details')) {
                            detailsContainer.className = 'payment-details';
                            const termsSection = form.querySelector('.terms-section');
                            if (termsSection) {
                                form.insertBefore(detailsContainer, termsSection);
                            } else {
                                form.appendChild(detailsContainer);
                            }
                        }

                        detailsContainer.innerHTML = `
                            <div class="payment-instructions">
                                <h3>اختر طريقة الدفع</h3>
                                <p>يرجى اختيار طريقة الدفع المفضلة لديك من الخيارات أعلاه</p>
                            </div>
                        `;
                        detailsContainer.style.display = 'block';

                        // Make sure the Cancel button works
                        const cancelBtn = document.querySelector('.cancel-btn');
                        if (cancelBtn) {
                            cancelBtn.onclick = closePaymentModal;
                        }
                    }

                    console.log('Payment modal successfully added to the page');
                } else {
                    console.error('Could not find payment modal in Donate.html');
                }
            })
            .catch(error => {
                console.error('Error fetching Donate.html:', error);
            });
    }

    // Add click event listeners to all donate buttons
    function addDonateButtonListeners() {
        // Find all donate buttons (various classes used across the site)
        const donateButtons = document.querySelectorAll('.donate-btn, .cause-card-btn, .modern-donate-btn, .donate-now-btn');

        donateButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log("donate button clicked");

                // Check if user is signed in by looking for authToken in localStorage
                const authToken = localStorage.getItem('authToken');
                
                if (!authToken) {
                    // User is not signed in
                    alert('يرجى تسجيل الدخول أولاً للتبرع');
                    window.location.href = 'signin.html';
                    return;
                }

                // User is signed in, proceed with donation modal
                const paymentModal = document.getElementById('payment-modal');
                if (paymentModal) {
                    if (typeof openPaymentModal === 'function') {
                        openPaymentModal();
                    } else {
                        paymentModal.style.display = 'flex';
                    }
                } else {
                    console.error('Payment modal not found');
                    window.location.href = 'Donate.html';
                }
            });
        });

        console.log('Added event listeners to', donateButtons.length, 'donate buttons');
    }

    // Wait a bit to ensure the modal is loaded (if needed)
    setTimeout(addDonateButtonListeners, 500);
});
