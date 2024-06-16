const express = require('express'); 
// מייבא את ספריית Express לצורך יצירת שרת

const bodyParser = require('body-parser'); 
// מייבא את ספריית body-parser כדי לעבד בקשות HTTP שמכילות גוף בקשה (body)

const mongoose = require('mongoose'); 
// מייבא את ספריית mongoose לצורך עבודה עם MongoDB

const app = express(); 
// יוצר אפליקציית Express

// Middleware
app.use(bodyParser.json()); 
// משתמש במידלוור של body-parser כדי לעבד בקשות JSON

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userdetails', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 
// מתחבר למסד הנתונים MongoDB, לבסיס נתונים שנקרא "userdetails", ומגדיר את האפשרויות

const db = mongoose.connection; 
// שומר את חיבור מסד הנתונים במשתנה db

db.on('error', console.error.bind(console, 'connection error:')); 
// מאזין לאירועים של שגיאות חיבור ומדפיס שגיאות לקונסול

db.once('open', function () {
    console.log('Connected to MongoDB');
}); 
// מאזין לאירוע חיבור מוצלח ומדפיס הודעה לקונסול

// User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
}); 
// יוצר סכמת Mongoose עבור אובייקטים מסוג משתמש, עם שדות name, email, ו-age

const User = mongoose.model('User', userSchema); 
// יוצר מודל Mongoose המבוסס על הסכמה שנוצרה

// Routes
app.post('/users', async (req, res) => {
    const { name, email, age } = req.body; 
    // מוציא את השדות name, email, ו-age מגוף הבקשה dsd

    const user = new User({
        name,
        email,
        age
    }); 
    // יוצר אובייקט חדש מסוג User עם הנתונים שהתקבלו

    try {
        const savedUser = await user.save(); 
        // מנסה לשמור את המשתמש החדש במסד הנתונים

        res.status(201).json(savedUser); 
        // מחזיר תשובה עם קוד סטטוס 201 (נוצר) והמשתמש שנשמר כ-JSON
    } catch (err) {
        res.status(400).json({ message: err.message }); 
        // במקרה של שגיאה, מחזיר תשובה עם קוד סטטוס 400 (בקשה לא תקינה) והודעת השגיאה
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); 
        // מנסה למצוא את כל המשתמשים במסד הנתונים

        res.json(users); 
        // מחזיר את רשימת המשתמשים כ-JSON
    } catch (err) {
        res.status(500).json({ message: err.message }); 
        // במקרה של שגיאה, מחזיר תשובה עם קוד סטטוס 500 (שגיאת שרת פנימית) והודעת השגיאה
    }
});

const PORT = process.env.PORT || 3000; 
// קובע את הפורט שעליו יאזין השרת. אם קיים משתנה סביבה PORT, הוא ישתמש בו, אחרת ישתמש בפורט 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
// מפעיל את השרת ומדפיס הודעה לקונסול המודיעה על כך שהשרת רץ והפורט עליו הוא מאזין
