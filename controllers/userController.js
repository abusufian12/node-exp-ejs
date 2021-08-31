const bcrypt = require('bcrypt')
//const jwt = require('jsonwebtoken')
const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const User = require('../model/User')
const {serverError, resourceError} = require('../util/error')

// login controller
module.exports = {
    login(req, res) {
        let { email, password } = req.body
        let validate = loginValidator({ email, password })
        
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }
        
        User.findOne({ email })
            // Use Populate for transaction
            .then(user => {
                if (!user) {
                    return resourceError(res, 'User Not Found')
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return serverError(res, err)
                    }
                    if (!result) {
                        return resourceError(res, 'Password Doesn\'t Match')
                    }

                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }, 'SECRET', {expiresIn: '2h'})

                    res.status(200).json({
                        message: 'Login Successful',
                        token: `Bearer ${token}`
                    })

                })
            })
            .catch(error => serverError(res, error))

        // Generate Token and Response Back
    },
    register(req, res) {
        console.log(req.body);
        
        let { name, email, password, confirmPassword } = req.body
        let validate = registerValidator({ name, email, password, confirmPassword })
        
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {
            User.findOne({ email })
                .then(user => {
                    if (user) {
                        return resourceError(res, 'Email Already Exist')
                    }

                    bcrypt.hash(password, 11, (err, hash) => {
                        if (err) {
                            return resourceError(res, 'Server Error Occurred')
                        }

                        let user = new User({
                            name,
                            email,
                            password: hash
                        })

                        user.save()
                            .then(user => {
                                res.status(201).json({
                                    message: 'User Created Successfully',
                                    user
                                })
                                res.redirect('/users')
                            })
                            .catch(error => serverError(res, error))
                    })
                })
                .catch(error => serverError(res, error))
        }

        
    },
    allUser(req, res) {
        
        // dbo.collection("customers").find({}).toArray(function(err, result) {
        //     if (err) throw err;
        //     console.log(result);
        //     db.close();
        //   });

        User.find()
            .then(users => {
                 //res.status(200).json(users)
                console.log(users);
                // var data = [
                //     { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
                //     { name: 'Tux', organization: "Linux", birth_year: 1996},
                //     { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
                //   ];
                
                //   res.render('user/index', {
                //     data: data
                //   });
                res.render('user/index', { data: users});
                

            })
            .catch(error => serverError(res, error))
    },
    showUser(req, res){
        //console.log(req.params.id);
        let id = req.params.id;
        User.findOne({'_id': id })
            .then(user => {
                console.log(user);
                res.render('user/show-user', { data: user});
            })
    },
    addUser(req, res){
        var data = {name:'Akashdeep',
        hobbies:['playing football', 'playing chess', 'cycling']}
    
        res.render('user/add-user', {data:data});
    },
    editUser(req, res){
        var data = {name:'Akashdeep',
        hobbies:['playing football', 'playing chess', 'cycling']}
    
        res.render('user/edit-user', {data:data});
    },
    updateUser(req, res){
        var data = {name:'Akashdeep',
        hobbies:['playing football', 'playing chess', 'cycling']}
    
        res.render('user/view-user', {data:data});
    },
    deleteUser(req, res){
        var data = {name:'Akashdeep',
        hobbies:['playing football', 'playing chess', 'cycling']}
    
        res.render('user/view-user', {data:data});
    }

    
}