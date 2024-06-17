ברוכים הבאים לפרוייקט המנצח שלנו!
# פרויקט ניהול פגישות

פרויקט זה הוא API פשוט ב-Node.js ו-Express לניהול פרטי משתמשים, בעיקר לאחסון ואחזור נתוני משתמשים במסד נתונים MongoDB. ה-API מאפשר ללקוחות להתחבר ולשלוף פרטי משתמשים מהמסד. הפרויקט נועד להדגים פעולות בסיסיות כגון יצירה, קריאה ומחיקה של מסמכים ב-MongoDB.

## תכונות

- חיבור למסד נתונים MongoDB באמצעות Mongoose.
- הגדרת שימוש בסכמת Mongoose ומודל לפרטי משתמשים.
- מימוש מסלולים (Routes) לטיפול בהתחברות משתמש ובשליפת כל המשתמשים.
- Middleware לרישום בקשות והתמודדות עם CORS.
- סקריפט צד לקוח לדוגמה להדגמת שימוש ב-API עם `fetch`.

## טכנולוגיות בשימוש

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- JavaScript (צד לקוח)

## התקנה

1. **שכפול הריפו (Repository):**
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. **התקנת תלויות:**
    ```bash
    npm install
    ```

3. **הפעלת שרת MongoDB:**
    ודא ש-MongoDB מותקן ורץ על `localhost:27017`.

4. **הפעלת השרת:**
    ```bash
    node server.js
    ```
