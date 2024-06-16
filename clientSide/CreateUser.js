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
    console.log(userData);
});