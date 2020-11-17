const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const router = express.Router()

const User = require('../models/user')
const Events = require('../models/events')

const db = "mongodb://localhost:27017/eventsb"

mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('Connected to mongo')
    }

})

//request and response executed from api route
router.get('/', (req, res) => {
    res.send('From API route')
})

//register request
router.post('/register', (req, res) => {
    //requests the user data
    let userData = req.body
    //convert to model that mongoose understands
    let user = new User(userData)
    //save user data
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        }
        else {
            //create payload that registered user id
            let payload = { subject: registeredUser._id }
            //key can be anything, put as secretkey
            let token = jwt.sign(payload, 'secretKey')
            //send token as obj instead of registered user
            res.status(200).send({ token })
        }
    })
})

//login request
router.post('/login', (req, res) => {
    let userData = req.body
    //accepts a conditon, and returns user that matches the codition
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        }
        else {
            //checks if user exists
            if (!user) {
                res.status(401).send('Invalid Email')
            }
            else
                //confirm password
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid Password')
                }
                //returns user detials
                else {
                    //create payload that logs user id
                    let payload = { subject: user._id }
                    //set the key 
                    let token = jwt.sign(payload, 'secretKey')
                    //sends the token obj instead of user obj
                    res.status(200).send({ token })
                }
        }
    })
})


        








/*begininng events 
router.get('/events', (req, res) => {
    // hard coded for display eventsarray 
    let events = [
        {
            "_id": "1",
            "name": "Citi Training",
            "desc": "Reinforce learning",
            "location": "Online",
            "dandt": "Everyday at 2:30PM"
        },
        {
            "_id": "2",
            "name": "Angular Assignment",
            "desc": "Go Over Assingment",
            "location": "Online",
            "dandt": "Monday at 2:30PM"
        },
        {
            "_id": "3",
            "name": "Test",
            "desc": "Tesst",
            "location": "Online",
            "dandt": "Everyday"
        }
    ]
    res.json(events)
})
*/




module.exports = router
