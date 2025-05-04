/**
 * Modal Scroll Fix
 * 
 * This script ensures that scrolling is properly restored after closing any payment modal.
 * It adds event listeners to all close buttons and modal backgrounds to properly reset body overflow.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Function to ensure body scroll is restored
    function ensureScrollingIsRestored() {
        // Find all close buttons for payment modals
        const closeButtons = document.querySelectorAll('#close-payment-modal, .cancel-btn');
        
        // Add event listeners to ensure body scroll is restored
        closeButtons.forEach(button => {
            if (button) {
                // Add our own event listener that will run after the original one
                button.addEventListener('click', function() {
                    // Small timeout to ensure this runs after the original close function
                    setTimeout(() => {
                        document.body.style.overflow = '';
                    }, 10);
                });
            }
        });
        
        // Also handle clicking on the modal background
        const paymentModal = document.getElementById('payment-modal');
        if (paymentModal) {
            paymentModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    // Small timeout to ensure this runs after the original close function
                    setTimeout(() => {
                        document.body.style.overflow = '';
                    }, 10);
                }
            });
        }
        
        // Add a global event listener for the Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const paymentModal = document.getElementById('payment-modal');
                if (paymentModal && paymentModal.style.display === 'flex') {
                    // If the modal is open, close it and restore scrolling
                    if (typeof closePaymentModal === 'function') {
                        closePaymentModal();
                    } else {
                        paymentModal.style.display = 'none';
                        document.body.style.overflow = '';
                    }
                }
            }
        });
        
        console.log('Modal scroll fix applied');
    }
    
    // Run immediately and also after a short delay to catch dynamically added elements
    ensureScrollingIsRestored();
    setTimeout(ensureScrollingIsRestored, 1000);
});
