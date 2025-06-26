async function makeDonation(donationData) {
    try {
        const response = await fetch('https://localhost:7250/api/Donation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donationData)
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
        } else {
            alert('Failed to submit donation.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting your donation.');
    }
}

// Example: Attach event listener to donate button
document.addEventListener('DOMContentLoaded', () => {
    const donateBtn = document.querySelector('.donate-now-btn');
    if (donateBtn) {
        donateBtn.addEventListener('click', () => {
            // Collect donation data from form inputs or define statically here
            const donationData = {
                paymentMethod: 0,
                fullName: "string",
                accountNumber: "string",
                providerName: "string",
                phone: "string",
                email: "user@example.com",
                country: "string",
                notes: "string",
                userId: "0b169e45-977a-4074-80e5-53011a6d67cd"
            };
            makeDonation(donationData);
        });
    }
});