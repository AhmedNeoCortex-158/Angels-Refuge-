document.addEventListener('DOMContentLoaded', function() {
    // Check if admin is logged in
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = '../signin.html';
        return;
    }

    // Elements
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const tableBody = document.getElementById('usersTableBody');

    // Fetch users data
    async function fetchUsers(searchTerm = '') {
        try {
            let url = 'https://localhost:7250/api/Admin/users';
            if (searchTerm) {
                url += `?searchTerm=${encodeURIComponent(searchTerm)}`;
            }
            
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            displayUsers(data);
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ في تحميل البيانات');
        }
    }

    // Display users in table
    function displayUsers(users) {
        tableBody.innerHTML = '';
        
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td class="user-id">${user.id}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Search functionality with debounce
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            fetchUsers(this.value);
        }, 300);
    });

    // Search button click
    searchBtn.addEventListener('click', () => {
        fetchUsers(searchInput.value);
    });

    // Enter key in search input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            fetchUsers(this.value);
        }
    });

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('authToken');
        window.location.href = '../signin.html';
    });

    // Initial load
    fetchUsers();
});