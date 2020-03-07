var db = require('./db');

module.exports= {

//admin info
validate: function(user, callback){
    var sql = "SELECT * FROM admin WHERE aemail=? and apass=?"; 

    db.execute(sql,[user.email, user.password], function(results){
        if(results){
            callback(true);
        }else{
            callback(false);
        }
    });
},

getByAemail: function(adminEmail, callback){
    var sql = "SELECT * FROM admin WHERE aemail=?"; 

    db.getResults(sql,[adminEmail], function(results){
        if(results.length > 0){
            callback(results);
        }else{
            callback([]);
        }
    });
},
getAdminInfo: function(id, callback){
    var sql = "SELECT * FROM admin WHERE id=?"; 

    db.getResults(sql,[id], function(results){
        if(results.length > 0){
            callback(results);
        }else{
            callback([]);
        }
    });
},
adminInfoUpdate: function(admin, callback){

    var sql = "update admin set aname=?,apass=?,aemail=? where id=?";
    db.execute(sql, [admin.name,admin.password,admin.email,admin.id], function(status){
         if(status){
              callback(true);
         }else{
              callback(false);
         }
    });
},


//insert courses
courseInsert: function(course, callback){

    var sql = "insert into courses values(?,?,?,?,?,?,?,?,?,?)";

     db.execute(sql,[null, course.type, course.batch, course.date, course.fees,course.time,course.day,course.status,course.adminId,course.teacherId], function(status){
         if(status){
                 callback(true);
            }else{
                 callback(false);
            }
     });
},

getAllCourse: function(callback){

    var sql = "SELECT * FROM courses"; 

    db.getResults(sql, null, function(results){
        if(results.length > 0){
            callback(results);
        }else{
            callback([]);
        }
    });
},
deleteCourse: function(courseId, callback){
    var sql = "delete from courses where cid=?";
    db.execute(sql,[courseId], function(status){
        if(status){
            callback(true);
        }else{
            callback(true);
        }
    });
},
courseInfo: function(id, callback){
    var sql = "SELECT * FROM courses WHERE cid=?"; 

    db.getResults(sql,[id], function(results){
        if(results.length > 0){
            callback(results);
        }else{
            callback([]);
        }
    });
},

courseUpdate: function(course, callback){

    var sql = "update courses set ctype=?,batch=?,fees=?,classtime=?,classday=? where cid=?";

     db.execute(sql,[course.type, course.batch, course.fees,course.time,course.day,course.courseId], function(status){
         if(status){
                 callback(true);
            }else{
                 callback(false);
            }
     });
},

//student info
getStudent: function(callback){
    var sql = "SELECT * FROM studentreg ORDER BY sid DESC";  

    db.getResults(sql,null, function(results){
        if(results.length > 0){
            callback(results);
        }else{
            callback([]);
        }
    });
},

approveStudent: function(sdata, callback){

    var sql = "update studentreg set status=? where sid=?";

     db.execute(sql,[sdata.status,sdata.userId], function(status){
         if(status){
                 callback(true);
            }else{
                 callback(false);
            }
     });
},


//teacher info
getTeacher: function(callback){
    var sql = "SELECT * FROM teacherreg ORDER BY tid DESC";  

    db.getResults(sql,null, function(results){
        if(results.length > 0){
            callback(results);
        }else{
            callback([]);
        }
    });
},

approveTeacher: function(sdata, callback){

    var sql = "update teacherreg set status=? where tid=?";

     db.execute(sql,[sdata.status,sdata.userId], function(status){
         if(status){
                 callback(true);
            }else{
                 callback(false);
            }
     });
},

/* getSearchStudent: function(sdata, callback){

    var sql = 'SELECT * FROM studentreg where sname LIKE "%' + sdata.name + '%"';  

    db.getResults(sql,null, function(results){
        if(results.length > 0){
            callback(results);
        }else{
            callback([]);
        }
    });
}, */


getSearchTeacher: function(tdata, callback){

    var sql = 'SELECT * FROM teacherreg where tname LIKE "%' + tdata.name + '%"';  

    db.getResults(sql,null, function(results){
        if(results.length > 0){
            callback(results);
        }else{
            callback([]);
        }
    });
},

deleteTeacher: function(tid,callback){
    var sql = "delete from teacherreg where tid=?";
    db.execute(sql,[tid], function(status){
        if(status){
            callback(true);
        }else{
            callback(true);
        }
    });
},

getUpdateTeacher: function(tdata, callback){

    var sql = "update teacherreg set tname=?, temail=?, tpass=?, tphone=?, tqualification=?, status=? where tid=?";

     db.execute(sql,[tdata.name,tdata.email, tdata.password, tdata.phone, tdata.qualification ,tdata.status,tdata.id], function(status){
         if(status){
                 callback(true);
            }else{
                 callback(false);
            }
     });
},

getEditTeacher: function(tid,callback){
    var sql = "select * from teacherreg where tid=?";
    db.getResults(sql,[tid], function(results){
        if(results){
            callback(results);
        }else{
            callback([]);
        }
    });
},

//notice task
noticeUpload: function(ndata, callback){

    var sql = "insert into notice values(?,?,?,?,?,?)";

     db.execute(sql,[null, ndata.topic, ndata.details, ndata.date, ndata.adminId, ndata.teacherId], function(status){
         if(status){
                 callback(true);
            }else{
                 callback(false);
            }
     });
},


//salary
getTeacherStatus: function(callback){

    var sql = "SELECT * FROM teacherreg where salarystatus='no'";  

    db.getResults(sql,null, function(results){
        if(results.length > 0){
            callback(results);
        }else{
            callback([]);
        }
    });
},

entrySalary: function(ndata, callback){

    var sql = "insert into salary values(?,?,?)";

     db.execute(sql,[null, ndata.amount, ndata.id], function(status){
         if(status){
                 callback(true);
            }else{
                 callback(false);
            }
     });
},

getSalaryTeacher: function(ndata, callback){

    var sql = "update teacherreg set salarystatus=? where tid=?" ;

     db.execute(sql,[ndata.status, ndata.id], function(status){
         if(status){
                 callback(true);
            }else{
                 callback(false);
            }
     });
},

viewSalary: function(callback){

    var sql = "select * from salary" ;

     db.getResults(sql,null,function(results){
        if(results.length > 0){
            callback(results);
        }else{
            callback([]);
        }
     });
},

editSalary: function(id, callback){

    var sql = "SELECT * FROM salary where salaryid=?";  

    db.getResults(sql,[id], function(results){
        if(results.length > 0){
            callback(results);
        }else{
            callback([]);
        }
    });
},

updateSalary: function(data, callback){

    var sql = "update salary set amount=? where salaryid=?";  
    db.execute(sql,[data.amount, data.id], function(status){
        if(status){
            callback(status);
        }else{
            callback([]);
        }
    });
},


//notes 

getCoursesId: function(callback){

    var sql = "select * from courses" ;

     db.getResults(sql,null,function(results){
        if(results.length > 0){
            callback(results);
        }else{
            callback([]);
        }
     });
},

uploadFile: function(ninfo, callback){

    var sql = "insert into notes values(?,?,?,?)";

     db.execute(sql,[null, ninfo.title, ninfo.filename, ninfo.courseid], function(status){
         if(status){
                 callback(true);
            }else{
                 callback(false);
            }
     });
},


}