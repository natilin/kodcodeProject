const express = require('express'); 
var cors = require('cors');
const app = express(); 

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method}, ---->'${req.url}'`);
    next(); // Pass the request to the next middleware/handler
});

const mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost:27017/userdetails', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// User schema
const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/logIn', async (req, res) => {
    const { name, password } = req.body; 
    console.log(name, "name");
    console.log(password, "password");

    
    try {
        // Find user in the database
        const user = await User.findOne({ name, password });
        
        if (user) {
            res.json({ exists: true, "name": user.name, }); // User exists
        } else {
            res.json({ exists: false }); // User does not exist
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
