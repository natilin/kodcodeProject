

const btn = document.getElementById('logInBtn');

btn.addEventListener("click", (e) => {
    e.preventDefault();
    // קבלת הערכים מהשדות
    const userName = document.getElementById('userName').value;
    const userPass = document.getElementById('userPass').value;

    // יצירת אובייקט עם הנתונים
    const userData = {
        name: userName,
        password: userPass,
    };
    
    try {
        fetch('http://localhost:3000/api/logIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (!response.ok) {
                // Handle HTTP errors
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("response from the server: ",data);
            console.log(data.exists)
            if (!data.exists) {
                window.alert("Username or password does not exist")
            }
            else{
                window.location.href = '/clientSide/meetings.html';
                localStorage.setItem(data.id)

            }
        })
        .catch(error => {
            // Handle network errors or other errors
            console.error('There was an error!', error);
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});

function togglePassword() {
    var passwordInput = document.getElementById('userPass');
    var passwordIcon = document.querySelector('.toggle-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        passwordIcon.textContent = '👁️';
    }
}
