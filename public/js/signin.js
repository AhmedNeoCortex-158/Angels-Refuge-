document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin-form');
    
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(signinForm);
            const signinData = {
                email: formData.get('email'),
                password: formData.get('password')
            };

            fetch('https://localhost:7250/api/Auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signinData)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert('Login successful!');
                    localStorage.setItem('authToken', result.token);
                    localStorage.setItem('user', JSON.stringify(result.user));
                    // Redirect or perform other actions
                    window.location.href = 'index.html';
                } else {
                    alert(result.message || 'Invalid email or password.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred during login. Please try again.');
            });
        });
    }
});