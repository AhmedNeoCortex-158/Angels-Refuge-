document.addEventListener('DOMContentLoaded', function() {
    // Check if admin is logged in
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = '../signin.html';
        return;
    }

    // Elements
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const searchBtn = document.getElementById('searchBtn');
    const exportBtn = document.getElementById('exportBtn');
    const tableBody = document.getElementById('donationsTableBody');

    // Set default date range (last month to today)
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    startDateInput.valueAsDate = lastMonth;
    endDateInput.valueAsDate = today;

    // Remove default date setting
    startDateInput.value = '';
    endDateInput.value = '';

    // Fetch donations data
    async function fetchDonations(startDate = null, endDate = null) {
        try {
            let url = 'https://localhost:7250/api/Admin/donations';
            
            // Add date parameters only if both dates are provided
            if (startDate && endDate) {
                const formattedStartDate = formatDate(startDate);
                const formattedEndDate = formatDate(endDate);
                url += `?startDate=${encodeURIComponent(formattedStartDate)}&endDate=${encodeURIComponent(formattedEndDate)}`;
            }
            
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch donations');
            }

            const data = await response.json();
            displayDonations(data);
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ في تحميل البيانات');
        }
    }

    // Format date to MM/DD/YYYY
    function formatDate(date) {
        const d = new Date(date);
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    }

    // Display donations in table
    function displayDonations(donations) {
        tableBody.innerHTML = '';
        
        donations.forEach(donation => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${donation.fullName}</td>
                <td>${donation.accountNumber}</td>
                <td>${donation.providerName}</td>
                <td>${donation.phone}</td>
                <td>${donation.email}</td>
                <td>${donation.country}</td>
                <td>${donation.amount} جنيه</td>
                <td>${donation.notes || '-'}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Export to Excel
    async function exportDonations() {
        try {
            const response = await fetch('https://localhost:7250/api/Admin/donations/export', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to export donations');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'donations.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ في تصدير البيانات');
        }
    }

    // Event Listeners
    // Update search button event listener
    searchBtn.addEventListener('click', () => {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        if ((startDate && !endDate) || (!startDate && endDate)) {
            alert('يرجى تحديد تاريخ البداية والنهاية');
            return;
        }

        fetchDonations(startDate, endDate);
    });

    exportBtn.addEventListener('click', exportDonations);

    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('authToken');
        window.location.href = '../signin.html';
    });

    // Initial load without date parameters
    fetchDonations();
});