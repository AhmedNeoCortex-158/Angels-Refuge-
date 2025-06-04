// This script ensures that all donate-now-btn buttons trigger the same payment modal as modern-donate-btn buttons
document.addEventListener('DOMContentLoaded', function() {
    // Find all donate-now-btn buttons
    const donateNowButtons = document.querySelectorAll('.donate-now-btn');
    
    if (donateNowButtons.length > 0) {
        console.log('Found ' + donateNowButtons.length + ' donate-now-btn buttons');
        
        // Add event listeners to each button
        donateNowButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Determine which modal opening function to use
                if (typeof openPaymentModal === 'function') {
                    console.log('Using openPaymentModal function');
                    openPaymentModal();
                } else if (typeof openModal === 'function') {
                    console.log('Using openModal function');
                    openModal();
                } else {
                    console.error('No modal opening function found');
                    
                    // Fallback: try to open the payment modal directly
                    const paymentModal = document.getElementById('payment-modal');
                    if (paymentModal) {
                        console.log('Fallback: Opening payment modal directly');
                        paymentModal.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                        setTimeout(() => {
                            paymentModal.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                    }
                }
            });
        });
    }
});
