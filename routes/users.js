const express = require('express');
const router = express.Router();

router.use(showrouter) //* Midddleware - 1 called


const users = []


//! Route 1 - '/v1/userslist'
router.get('/userslist', checkAdmin, function (req, res) {
    console.log("This Is The All Users List Route\n")
    res.json({users})
})


//! Route 2 - '/v1/newuser'
router.route("/newuser")
    .get((req, res) => {
        console.log("This Is Creating New User Route\n")
        res.render('userforum')
    })
    .post((req, res) => {
        let obj = {
            id : Date.now(),
            Name : req.body.Name,
            College : req.body.College,
            Branch : req.body.Branch
        }
        users.push(obj)
        console.log("Forum submitted successfully...", obj, "\n");

        // Redirecting User
        res.redirect(`/v1/user/${users.length - 1}`)
    })


//! Route 3 - '/v1/:id'
router.route("/user/:id")
    .get((req, res) => {
        console.log("This Is For Specific User Route\n")
        // res.json(users[req.params.id]) //* You can also parse the data into json
        res.render('specificuser', {id : users[req.params.id].id, name : users[req.params.id].Name, coll : users[req.params.id].College, branch : users[req.params.id].Branch})
    })


//* Middleware - 1
function showrouter(req, res, next) {
    console.log("Path :-", req.originalUrl);
    next()
}


//* Middleware - 2
function checkAdmin(req, res, next) {
    const isAdmin = true
    console.log("Do you have the permission To access this Route");
    if(isAdmin) {
        console.log("Access Guranteed!\n");
        next()
    }else{
        console.log("Access Denied!\n");
        res.redirect('/')
    }
}

module.exports = router