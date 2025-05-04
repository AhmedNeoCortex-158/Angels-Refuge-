/**
 * Payment Method Selection Fix
 * 
 * This script ensures that payment method selection works correctly in the donation popup.
 * It fixes conflicts between different scripts that handle payment method buttons.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Function to fix payment method selection
    function fixPaymentMethodSelection() {
        // Wait for the modal to be visible
        const checkInterval = setInterval(function() {
            const paymentModal = document.getElementById('payment-modal');
            if (paymentModal && paymentModal.style.display === 'flex') {
                clearInterval(checkInterval);
                
                // Find all payment method buttons
                const methodButtons = document.querySelectorAll('.method-btn');
                if (methodButtons.length > 0) {
                    console.log('Found payment method buttons, applying fix...');
                    
                    // Define the showPaymentDetails function if it doesn't exist
                    if (typeof window.showPaymentDetails !== 'function') {
                        window.showPaymentDetails = function(method) {
                            console.log('Showing payment details for method:', method);
                            
                            // Find the payment form
                            const form = document.getElementById('payment-form');
                            if (!form) return;
                            
                            // Find or create the payment details container
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
                            
                            // Update the payment details container
                            detailsContainer.innerHTML = `
                                <div class="payment-instructions">
                                    <h3>${method} - تم اختيار طريقة الدفع</h3>
                                    <p>يمكنك الآن إكمال عملية التبرع</p>
                                </div>
                            `;
                            detailsContainer.style.display = 'block';
                            
                            // Show the relevant form fields
                            const formGroups = form.querySelectorAll('.form-group');
                            formGroups.forEach(group => {
                                group.style.display = 'flex';
                            });
                            
                            // Enable the submit button
                            const submitBtn = form.querySelector('.submit-btn');
                            if (submitBtn) {
                                submitBtn.disabled = false;
                                submitBtn.style.opacity = '1';
                                submitBtn.style.cursor = 'pointer';
                            }
                        };
                    }
                    
                    // Add direct click event listeners to each button
                    methodButtons.forEach(btn => {
                        // Store the original onclick function
                        const originalOnClick = btn.onclick;
                        
                        // Replace with our own function that ensures the button works
                        btn.onclick = function(e) {
                            e.preventDefault();
                            
                            // Get the payment method
                            const method = this.dataset.method;
                            
                            // Remove active class from all buttons
                            methodButtons.forEach(b => b.classList.remove('active'));
                            
                            // Add active class to the clicked button
                            this.classList.add('active');
                            
                            // Call the original onclick function if it exists
                            if (typeof originalOnClick === 'function') {
                                originalOnClick.call(this, e);
                            }
                            
                            // Call the showPaymentDetails function
                            if (typeof window.showPaymentDetails === 'function') {
                                window.showPaymentDetails(method);
                            }
                        };
                    });
                    
                    console.log('Payment method selection fix applied');
                }
            }
        }, 500);
    }
    
    // Apply the fix when a donate button is clicked
    const donateButtons = document.querySelectorAll('.donate-btn, .cause-card-btn, .modern-donate-btn, .donate-now-btn');
    donateButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            setTimeout(fixPaymentMethodSelection, 500);
        });
    });
    
    // Also apply the fix on page load in case the modal is already open
    fixPaymentMethodSelection();
});
