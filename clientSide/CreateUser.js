
const btn = document.getElementById('signUpBtn');

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
        fetch('http://localhost:3000/api/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (!response.ok) {
                // Handle HTTP 
                errors
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data
            console.log('Success:', data);
            if (data.exists) {
                window.alert('signIn successful!');
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