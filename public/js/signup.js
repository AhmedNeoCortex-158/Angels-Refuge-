document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(signupForm);
            const signupData = {
                firstName: formData.get('first-name'),
                lastName: formData.get('last-name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirm-password'),
                acceptTerms: formData.get('terms') === 'on'
            };

            fetch('https://localhost:7250/api/Auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert('Sign up successful!');
                    // Redirect or perform other actions
                } else {
                    alert(result.message || 'Sign up failed.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred during signup. Please try again.');
            });
        });
    }
});