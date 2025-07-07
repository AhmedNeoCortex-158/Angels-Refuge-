document.addEventListener('DOMContentLoaded', function() {
    // Check if admin is logged in
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = '../signin.html';
        return;
    }

    // Fetch dashboard data
    async function fetchDashboardData() {
        try {
            const response = await fetch('https://localhost:7250/api/Admin/dashboard', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch dashboard data');
            }

            const data = await response.json();
            updateDashboard(data);
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ في تحميل البيانات');
        }
    }

    function updateDashboard(data) {
        // Update statistics
        document.getElementById('totalUsers').textContent = data.totalUsers;
        document.getElementById('totalDonations').textContent = data.totalDonations;
        document.getElementById('totalAmount').textContent = `${data.totalDonationsAmount} جنيه`;
        document.getElementById('totalMessages').textContent = data.totalMessages;

        // Update recent messages
        const messagesList = document.getElementById('recentMessages');
        messagesList.innerHTML = '';

        data.recentMessages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message-item';
            messageElement.innerHTML = `
                <div class="message-header">
                    <span class="message-sender">${message.firstName} ${message.lastName}</span>
                    <span class="message-contact">${message.email}</span>
                </div>
                <div class="message-content">${message.content}</div>
            `;
            messagesList.appendChild(messageElement);
        });
    }

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('authToken');
        window.location.href = '../signin.html';
    });

    // Initial load
    fetchDashboardData();
});