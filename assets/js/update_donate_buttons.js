// This script will update all donate buttons to handle both modern-donate-btn and donate-now-btn classes
document.addEventListener('DOMContentLoaded', function() {
    // Find all instances of the donate button event listeners and update them
    const scripts = document.querySelectorAll('script');
    
    scripts.forEach(script => {
        if (script.textContent.includes("document.querySelectorAll('.modern-donate-btn')")) {
            // Add event listeners for both button types
            const donateButtons = document.querySelectorAll('.modern-donate-btn, .donate-now-btn');
            
            donateButtons.forEach(btn => {
                // Remove any existing event listeners (to avoid duplicates)
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                
                // Add the event listener that opens the payment modal
                newBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Check which function to call based on what's available
                    if (typeof openPaymentModal === 'function') {
                        openPaymentModal();
                    } else if (typeof openModal === 'function') {
                        openModal();
                    }
                });
            });
        }
    });
    
    console.log('Donate button event listeners updated to handle both button types');
});
