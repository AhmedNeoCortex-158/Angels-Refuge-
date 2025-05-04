/**
 * Payment Method Fix
 *
 * This script ensures that no payment method is auto-selected when the donation modal opens.
 * It also adds a message prompting the user to select a payment method.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Variable to track if the modal has been initialized
    let modalInitialized = false;

    // Function to handle the payment modal
    function fixPaymentMethodSelection() {
        // Find all payment method buttons
        const methodButtons = document.querySelectorAll('.method-btn');
        const paymentModal = document.getElementById('payment-modal');

        // Only proceed if we have method buttons and the modal is visible
        if (methodButtons.length > 0 && paymentModal) {
            // Check if the modal is currently displayed
            const isModalVisible = paymentModal.style.display === 'flex';

            // Only initialize once when the modal becomes visible
            if (isModalVisible && !modalInitialized) {
                console.log('Initializing payment modal...');

                // Find the payment form
                const form = document.getElementById('payment-form');
                if (form) {
                    // Check if any method is already selected
                    const hasActiveMethod = Array.from(methodButtons).some(btn => btn.classList.contains('active'));

                    // Only clear selection if no method is already selected
                    if (!hasActiveMethod) {
                        // Hide all form fields until a payment method is selected
                        const formGroups = form.querySelectorAll('.form-group');
                        formGroups.forEach(group => {
                            group.style.display = 'none';
                        });

                        // Display a message prompting the user to select a payment method
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

                        detailsContainer.innerHTML = `
                            <div class="payment-instructions">
                                <h3>اختر طريقة الدفع</h3>
                                <p>يرجى اختيار طريقة الدفع المفضلة لديك من الخيارات أعلاه</p>
                            </div>
                        `;
                        detailsContainer.style.display = 'block';

                        // Disable the submit button until a payment method is selected
                        const submitBtn = form.querySelector('.submit-btn');
                        if (submitBtn) {
                            submitBtn.disabled = true;
                            submitBtn.style.opacity = '0.5';
                            submitBtn.style.cursor = 'not-allowed';
                        }

                        // Add event listeners to method buttons to enable the submit button when a method is selected
                        // Instead of replacing buttons, just add our event listeners to the existing buttons
                        methodButtons.forEach(btn => {
                            btn.addEventListener('click', function() {
                                if (submitBtn) {
                                    submitBtn.disabled = false;
                                    submitBtn.style.opacity = '1';
                                    submitBtn.style.cursor = 'pointer';
                                }

                                // Make sure the showPaymentDetails function is called
                                const method = this.dataset.method;
                                if (typeof showPaymentDetails === 'function') {
                                    showPaymentDetails(method);
                                }
                            });
                        });
                    }
                }

                // Mark as initialized
                modalInitialized = true;
            } else if (!isModalVisible) {
                // Reset initialization flag when modal is closed
                modalInitialized = false;
            }
        }
    }

    // Apply the fix when the modal is opened
    function applyFixWhenModalOpens() {
        // Find all donate buttons
        const donateButtons = document.querySelectorAll('.donate-btn, .cause-card-btn, .modern-donate-btn, .donate-now-btn');

        // Add event listeners to apply the fix when a donate button is clicked
        donateButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Reset initialization flag when a donate button is clicked
                modalInitialized = false;

                // Wait a bit for the modal to open
                setTimeout(fixPaymentMethodSelection, 100);
            });
        });
    }

    // Run the fix when the page loads and when the modal is opened
    applyFixWhenModalOpens();

    // Check periodically but don't reset selections
    setInterval(function() {
        // Only check if the modal exists and is visible
        const paymentModal = document.getElementById('payment-modal');
        if (paymentModal && paymentModal.style.display === 'flex') {
            fixPaymentMethodSelection();
        }
    }, 1000);
});
