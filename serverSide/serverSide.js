const express = require('express');
const cors = require('cors');
const { User, Meeting, Doctor } = require('./db'); // Import the models from db.js

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method}, ---->'${req.url}'`);
    next(); // Pass the request to the next middleware/handler
});



// Function to handle logIn
async function handleLogIn(req, res) {
    const { name, password } = req.body;
    console.log(name, "name");
    console.log(password, "password");

    try {
        // Find user in the database
        const user = await User.findOne({ name, password });
        console.log(user, "user");

        if (user) {
            res.send({ exists: true, id: user._id }); // User exists
        } else {
            res.send({ exists: false }); // User does not exist
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Function to handle myMeeting
async function handleMyMeeting(req, res) {
    const { title, date, time } = req.body;
    console.log(title, "title");
    console.log(date, "date");
    console.log(time, "time");

    try {
        // Process the meeting details (this is just a placeholder logic)
        res.send({ success: true, message: 'Meeting scheduled successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Function to get user meeting
async function getMeetings(req, res){
    const userId = req.params.userId;
        try {
            const meetings = await Meeting.find({ clientId: userId });
            res.send(meetings);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
}

// Function to get list of all the doctors
async function getAllDoctors(req, res) {
    try {
        const doctors = await Doctor.find();
        res.send(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function signUpUser(req, res) {
    const {name, password} = req.body; 
    try {

        // Create a new user
        const newUser = new User({name, password}); 
        await newUser.save(); 
        res.send({ success: true, message: 'User created successfully', id: newUser._id}); 
        console.log("'User created successfully'")
    } catch (err) {
        res.status(500).json({ message: err.message });
        console,log(err.message);
    }
}


// Routes
app.post('/api/logIn', handleLogIn);
app.post('/api/meetings/:userId', handleMyMeeting);
app.get('/api/meetings/:userId', getMeetings);
app.get('/api/doctors', getAllDoctors);
app.post('/api/signUp', signUpUser);

const PORT = 3000;
console.log("hi")

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



