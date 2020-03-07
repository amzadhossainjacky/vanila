var express = require('express');
var adminModel = require.main.require('./models/adminModel');
var router = express.Router();

//router 
router.get('/', function(req, res){

    if(req.session.adminEmail !=null){
        req.session.adminEmail= null;
        res.clearCookie('adminEmail');
    }
    res.render('login/admin_login');
})


router.post('/', function(req, res){

    req.checkBody('email', 'Email field cannot be empty.').notEmpty();
    req.checkBody('password', 'Password field cannot be empty.').notEmpty();

    const err = req.validationErrors();

    if(err){
        res.render('login/admin_login', {errors: err});
    }else{
        var user = {
            email : req.body.email,
            password: req.body.password
        }
    //check validate
    adminModel.validate(user, function(results){

        if(results){
            res.cookie('adminEmail', req.body.email);
            res.redirect('/home');
        }else{
            res.render('login/admin_login');
            }

        });
    }
    
});

module.exports = router;
