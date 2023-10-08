const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 8000;
const UserModel = require('./models/Users');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mern_crud");
const dbm = mongoose.connection;

dbm.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

dbm.once('open', () => {
    console.log('MongoDB connected successfully');
});

// Optionally, you can listen for the 'disconnected' event
dbm.on('disconnected', () => {
    console.log('MongoDB connection disconnected');
});




app.post("/createuser", (req, res) => {
    UserModel.create(req.body)
        .then(users => {
            console.log("User created:", users);
            res.status(200).json(users); // Send the saved user as a response
        })
        .catch(err => {
            if (err.code === 11000) {
                // This error code (11000) indicates a duplicate key error (e.g., unique constraint violation)
                console.error("Duplicate key error:", err);
                res.status(400).json({ error: "User with the same data already exists" });
            } else {
                console.error(err);
                res.status(500).json({ error: "Failed to create user" }); // Handle other errors with a 500 status code
            }
        });
});





app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

// app.put('/updateuser/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndUpdate({ _id: id }, { name: req.body, email: req.body, age: req.body })
//         .then(users => res.json(users))
//         .catch(err => res.json(err))
// })
app.put('/updateuser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, email: req.body.email, age: req.body.age })
        .then(updatedUser => {
            console.log("User updated:", updatedUser);
            res.status(200).json(updatedUser);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Failed to update user" });
        });
});

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ error: "User not found" });
            }
            console.log("User deleted:", deletedUser);
            res.status(200).json({ message: "User deleted successfully" });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Failed to delete user" });
        });
});



app.listen(port, () => {

    console.log(`server listening on port ${port}`);

})