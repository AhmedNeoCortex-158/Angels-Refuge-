document.addEventListener('DOMContentLoaded', function() {
    // Check if admin is logged in
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = '../signin.html';
        return;
    }

    const messagesList = document.getElementById('messagesList');
    const unreadFilter = document.getElementById('unreadFilter');
    const readFilter = document.getElementById('readFilter');
    let currentFilter = 'unread'; // Move this to the top level scope

    // Display messages
    function displayMessages(messages, isRead) {
        messagesList.innerHTML = '';
        
        if (!messages || messages.length === 0) {
            messagesList.innerHTML = `
                <div class="empty-state">
                    ${isRead ? 'لا توجد رسائل مقروءة' : 'لا توجد رسائل غير مقروءة'}
                </div>
            `;
            return;
        }
        
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message-item';
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-header">
                        <div class="sender-name">${message.firstName} ${message.lastName}</div>
                        <div class="sender-contact">
                            <i class="fas fa-envelope"></i> ${message.email}
                            <i class="fas fa-phone ms-3"></i> ${message.phone}
                        </div>
                    </div>
                    <div class="message-text">${message.content}</div>
                </div>
                ${!isRead ? `
                    <div class="message-actions">
                        <button onclick="markAsRead(${message.id})" class="mark-read-btn" title="تحديد كمقروء">
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                ` : ''}
            `;
            messagesList.appendChild(messageElement);
        });
    }

    // Modify fetchMessages to pass isRead to displayMessages
    async function fetchMessages(isRead = false) {
        try {
            messagesList.innerHTML = '<div class="loading">جاري التحميل...</div>';
            
            const isReadParam = isRead.toString();
            const response = await fetch(`https://localhost:7250/api/Admin/messages?isRead=${isReadParam}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const messages = await response.json();
            if (messages && Array.isArray(messages)) {
                displayMessages(messages, isRead);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error:', error);
            messagesList.innerHTML = `
                <div class="error-message">
                    حدث خطأ في تحميل الرسائل
                    <button onclick="fetchMessages(${isRead})" class="retry-btn">
                        إعادة المحاولة
                    </button>
                </div>
            `;
        }
    }

    // Filter event listeners
    unreadFilter.addEventListener('click', () => {
        currentFilter = 'unread';
        unreadFilter.classList.add('active');
        readFilter.classList.remove('active');
        fetchMessages(false);
    });

    readFilter.addEventListener('click', () => {
        currentFilter = 'read';
        readFilter.classList.add('active');
        unreadFilter.classList.remove('active');
        fetchMessages(true);
    });

    // Mark message as read
    window.markAsRead = async function(messageId) {
        try {
            const response = await fetch(`https://localhost:7250/api/Admin/messages/${messageId}/read`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(true) // Send boolean true instead of empty object
            });

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('authToken');
                    window.location.href = '../signin.html';
                    return;
                }
                throw new Error(`Failed to mark message as read: ${response.status}`);
            }

            // Successfully marked as read
            const messageElement = document.querySelector(`.message-item:has([onclick="markAsRead(${messageId})"])`);
            if (messageElement) {
                messageElement.style.opacity = '0';
                setTimeout(() => {
                    messageElement.remove();
                    // Check if we need to refresh the list
                    const remainingMessages = document.querySelectorAll('.message-item');
                    if (remainingMessages.length === 0) {
                        fetchMessages(false);
                    }
                }, 300);
            }

        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ في تحديث حالة الرسالة. يرجى المحاولة مرة أخرى');
        }
    };
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('authToken');
        window.location.href = '../signin.html';
    });
    // Initial load
    fetchMessages(false);
});