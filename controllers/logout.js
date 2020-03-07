var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	
    if(req.session.adminId !=null){
        req.session.adminId= null;
        res.clearCookie('adminEmail');
        res.redirect('/admin');
    }
    
});

module.exports = router;