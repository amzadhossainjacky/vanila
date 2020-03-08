var express = require('express');
var adminModel = require.main.require('./models/adminModel');
var router = express.Router();


//file upload require multer
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload_files/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
var upload = multer({ storage: storage });


//restriction before entering dash board
router.get('*', function(req, res, next){
	if(req.cookies['adminEmail'] == null){
		res.redirect('/admin');
	}else{
		next();
	}
});


// all Home task starting 
router.get('/', function(req, res){

     adminModel.getByAemail(req.cookies['adminEmail'], function(results){
          var adminData ={
               id :results[0].id,
               name :results[0].aname, 
               email :results[0].aemail, 
               password :results[0].apass, 
          }

          req.session.adminId = results[0].id;
          req.session.adminName = results[0].aname;
          res.render('admin/admin_dashboard', {adminData: adminData});
     });
    
});

router.get('/edit/:id', function(req, res){

     adminModel.getAdminInfo(req.params.id, function(results){

          if(results.length > 0){
               var adminInfo = {
                    id :results[0].id,
                    name :results[0].aname, 
                    email :results[0].aemail, 
                    password :results[0].apass, 
               } 
               res.render('admin/admin_info_edit', {adminInfo: adminInfo, adminName:req.session.adminName});
          }else{
               res.redirect('/home');
          }
     });  
});

router.post('/edit/:id', function(req, res){

     
    req.checkBody('name', 'Name field cannot be empty.').notEmpty();
    req.checkBody('email', 'Email field cannot be empty.').notEmpty();
    req.checkBody('password', 'Password field cannot be empty.').notEmpty();
    var err = req.validationErrors();

    if(err){

          adminModel.getAdminInfo(req.params.id, function(results){
               if(results.length > 0){
                    var adminInfo = {
                         id :results[0].id,
                         name :results[0].aname, 
                         email :results[0].aemail, 
                         password :results[0].apass, 
                    } 
                    res.render('admin/admin_info_edit', {adminInfo: adminInfo,
                         errors: err,adminName:req.session.adminName});
               }else{
                    res.redirect('/home');
               }
          });
     }else{
          var admin = {
               email : req.body.email,
               password: req.body.password,
               id: req.params.id,
               name: req.body.name
          }
          adminModel.adminInfoUpdate(admin, function(status){
          if(status){
               res.redirect('/admin');
               }
               else{
               res.redirect('/home');
               }
          });
     }
});


//course
router.get('/create_course', function(req, res){
	res.render('admin/create_course',{adminName:req.session.adminName});
});


router.post('/create_course', function(req, res){

          var today = new Date();

          var cdata = {
               type: req.body.courseType,
               batch: req.body.batchType,
               day: req.body.day,
               time: req.body.time,
               fees: req.body.fees,
               date: today,
               status: 'yes',
               adminId: req.session.adminId,
               teacherId: 'NULL'
               
          }

          if(cdata.time=="" || cdata.fees==""){
               res.send({msg: 'Please Filled all the field'});
          }else{
               adminModel.courseInsert(cdata, function(status){
                    if(status){
                         res.send({msg: 'insert ok'});
                    }else{
                         res.redirect('/home/create_course');
                    }
               })
          }
});


router.get('/view_course', function(req, res){

     adminModel.getAllCourse(function(results){
          if(results.length > 0){
               res.render('admin/view_course', {results: results,adminName:req.session.adminName});
          }else{
               res.redirect('/home');
          }
     });
});

router.get('/delete_course/:id', function(req, res){

	adminModel.deleteCourse(req.params.id, function(status){
			if(status){
				res.redirect('/home/view_course');
			}else{
				res.redirect('/home');
			}
	});
});

router.get('/edit_course/:id', function(req, res){

	adminModel.courseInfo(req.params.id, function(results){
          if(results.length > 0){
               res.render('admin/edit_course', {courseInfo: results,adminName:req.session.adminName});
          }else{
               res.redirect('/home');
          }
     });
});

router.post('/edit_course/:id', function(req, res){

     var cdata = {
          type: req.body.courseType,
          batch: req.body.batchType,
          day: req.body.day,
          time: req.body.time,
          fees: req.body.fees,
          courseId: req.params.id     
     }

     adminModel.courseUpdate(cdata, function(status){
          if(status){
               res.redirect('/home/view_course');
          }else{
               res.redirect('/home');
          }
     });
});


//approve student
router.get('/approve_student', function(req, res){

     adminModel.getStudent(function(results){
          if(results.length > 0){
               res.render('admin/approve_student', {results: results,adminName:req.session.adminName});
          }else{
               res.redirect('/home');
          }
     });
});

router.post('/approve_student/:id', function(req, res){

     var sdata = {
          status: 'yes',
          userId: req.params.id     
     }

     adminModel.approveStudent(sdata, function(status){
          if(status){
               res.redirect('/home/approve_student');
          }else{
               res.redirect('/home');
          }
     });
});



//approve teacher
router.get('/approve_teacher', function(req, res){

     adminModel.getTeacher(function(results){
          if(results.length > 0){
               res.render('admin/approve_teacher', {results: results,adminName:req.session.adminName});
          }else{
               res.redirect('/home');
          }
     });
});

router.post('/approve_Teacher/:id', function(req, res){

     var sdata = {
          status: 'yes',
          userId: req.params.id     
     }

     adminModel.approveTeacher(sdata, function(status){
          if(status){
               res.redirect('/home/approve_teacher');
          }else{
               res.redirect('/home');
          }
     });
});


//student customization
router.get('/student_info', function(req, res){

     adminModel.getStudent(function(results){
          if(results.length > 0){
               res.render('admin/student_info', {results: results,adminName:req.session.adminName});
          }else{
               res.redirect('/home');
          }
     });
});

router.post('/student_info', function(req, res){

     var sdata ={
          name: req.body.search
     }
          
     adminModel.getSearchStudent(sdata,function(results){
          if(results.length > 0){
               res.render('admin/student_info', {results: results,adminName:req.session.adminName});
          }else{
               res.redirect('/home/student_info');
          }
     });
    
});

router.get('/student_info_edit/:id', function(req, res){

     adminModel.getEditStudent(req.params.id,function(results){
          if(results.length > 0){
               res.render('admin/student_info_edited', {results: results,adminName:req.session.adminName});
          }else{
               res.redirect('/home');
          }
     });
});

router.post('/student_info_edit/:id', function(req, res){

     var sdata ={
          name: req.body.sname,
          institution:req.body.sinstitution,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.SPhoneNumber,
          spname: req.body.pname,
          spphone: req.body.PPhoneNumber,
          spemail: req.body.spemail,
          id:req.params.id
     }

     adminModel.getUpdateStudent(sdata,function(status){
          if(status){
               res.redirect('/home/student_info');
          }else{
               res.redirect('/home');
          }
     });
});

router.get('/student_delete/:id', function(req, res){

     adminModel.deleteStudent(req.params.id,function(status){
          if(status){
               res.redirect('/home/student_info');
          }else{
               res.redirect('/home');
          }
     });
});


//teacher customization
 router.get('/teacher_info', function(req, res){

     adminModel.getTeacher(function(results){
          if(results.length > 0){
               res.render('admin/teacher_info', {results: results,adminName:req.session.adminName});
          }else{
               res.redirect('/home');
          }
     });
});

router.post('/teacher_info', function(req, res){

     var tdata = {
          name: req.body.search
     }

     adminModel.getSearchTeacher(tdata, function(results){
          if(results.length > 0){
               res.render('admin/teacher_info', {results: results,adminName:req.session.adminName});
          }else{
               res.redirect('/home/teacher_info');
          }
     });
}); 

router.get('/teacher_info_edit/:id', function(req, res){

     adminModel.getEditTeacher(req.params.id,function(results){
          if(results.length > 0){
               res.render('admin/teacher_info_edited', {results: results,adminName:req.session.adminName});
          }else{
               res.redirect('/home');
          }
     });
});

router.post('/teacher_info_edit/:id', function(req, res){

     var tdata ={
          name: req.body.tname,
          email: req.body.temail,
          password: req.body.password,
          phone: req.body.TPhoneNumber,
          qualification: req.body.qualification_details,
          id:req.params.id
     }

     adminModel.getUpdateTeacher(tdata,function(status){
          if(status){
               res.redirect('/home/teacher_info');
          }else{
               res.redirect('/home');
          }
     }); 
});

router.get('/teacher_delete/:id', function(req, res){

     adminModel.deleteTeacher(req.params.id,function(status){
          if(status){
               res.redirect('/home/teacher_info');
          }else{
               res.redirect('/home');
          }
     });
});


//notice upload
router.get('/notice_upload', function(req, res){
     res.render('admin/notice_upload',{adminName:req.session.adminName});
});


router.post('/notice_upload', function(req, res){


     var today = new Date();

     var ndata = {
          topic: req.body.topic,
          details: req.body.details,
          date: today,
          adminId: req.session.adminId,
          teacherId: 'NULL'
     }

     if(ndata.topic=="" || ndata.details=="" || ndata.topic=="" && ndata.details=="" ){
          res.send({msg: 'Please Filled all fields'});
     }else{

          adminModel.noticeUpload(ndata, function(status){
               if(status){
                    res.send({msg: 'notice upload'});
               }else{
                    res.redirect('/home');
               }
          })
     }
     

     
});
     

//entry salary
router.get('/entry_salary', function(req, res){

     adminModel.getTeacherStatus(function(results){

          if(results.length > 0){
               
               var e = {
                    e:true
               };
               res.render('admin/entry_salary', {results: results,error: e,adminName:req.session.adminName});
          }else{
               var e = {
                    e:false
               };
               res.render('admin/entry_salary', {error: e,adminName:req.session.adminName});
          }
     });
     
});

router.post('/entry_salary', function(req, res){

     var ndata = {
          id: req.body.id,
          amount: req.body.amount,
          status: 'yes'
     }
     
     adminModel.entrySalary(ndata, function(status){
          if(status){
               adminModel.getSalaryTeacher(ndata,function(status){
                    if(status){
                         res.redirect('/home/entry_salary');
                    }else{
                         res.redirect('/home');
                    }
               });
          }else{
               res.redirect('/home');
          }
     })


});

router.get('/view_salary', function(req, res){

     adminModel.viewSalary(function(results){

          if(results.length > 0){
               res.render('admin/view_salary', {results: results,adminName:req.session.adminName});
          }else{
               res.redirect('/home');
          }
     })

});

router.get('/edit_salary/:id', function(req, res){

     console.log(req.params.id);

     adminModel.editSalary(req.params.id, function(results){
          if(results.length > 0){
               res.render('admin/edit_salary',{results: results,adminName:req.session.adminName});
          }else{
               res.redirect('/home');
          }
     })

});


router.post('/edit_salary/:id', function(req, res){

     var data ={
          id:req.params.id,
          amount: req.body.salary
     }
     adminModel.updateSalary(data, function(status){
          if(status){
               res.redirect('/home/view_salary');
          }else{
               res.redirect('/home');
          }
     })

});


//upload files or notes task
router.get('/notes_upload', function(req, res){


     adminModel.getCoursesId(function(results){
          if(results.length > 0){
               res.render('admin/notes_upload',{results: results,adminName:req.session.adminName});
          }else{
               res.redirect('/home');
          }
     })

});

router.post('/notes_upload',upload.single('file'),function(req, res){

     var ninfo = {
          filename: req.file.filename,
          title: req.body.title,
          courseid: req.body.courseid

     }

     adminModel.uploadFile(ninfo,function(status){
          if(status){
               res.redirect('/home/notes_upload');
          }else{
               res.redirect('/home');
          }
     })
     
});


//marks upload
router.get('/marks_entry', function(req, res){

     adminModel.getCoursesId(function(results){
          if(results.length > 0){
               res.render('admin/marks_entry',{results: results,adminName:req.session.adminName});
          }else{
               res.redirect('/home');
          }
     })

});


router.post('/marks_entry', function(req, res){

     var data = {
          examType: req.body.examType,
          examName: req.body.examName,
          courseid: req.body.courseid,
          userid: req.body.userid,
          marks: req.body.marks
     }

     adminModel.entryMarks(data,function(status){
          if(status){
               res.redirect('/home/marks_entry');
          }else{
               res.redirect('/home');
          }
     })

});
module.exports = router;


