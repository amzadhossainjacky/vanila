var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    
        req.session.adminId= null;
        req.session.adminName= null;
        res.clearCookie('adminEmail');
        res.redirect('/admin');

});

module.exports = router;