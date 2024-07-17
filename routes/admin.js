const express = require("express");
const router=express.Router({mergeParams:true}); 

const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn, isAdmin}= require("../middleware.js");
const adminController=require("../controllers/admin.js");

router.use('*', isLoggedIn, isAdmin);
router.get("/",wrapAsync(adminController.getDashbord));

router.get("/user",wrapAsync(adminController.getUser));
router.delete('/users/:id', wrapAsync(adminController.deleteUser));
router.patch('/users/:id/toggle-admin',wrapAsync(adminController.toggleAdmin));


router.route("/subjects")
      .get(wrapAsync(adminController.getSubjects)) 
      .post(wrapAsync(adminController.postSubject));  

router.route('/subjects/:id')
      .get(wrapAsync(adminController.getTopics))  
      .post(wrapAsync(adminController.postTopic))  
      .delete(wrapAsync(adminController.deleteSubject));  

router.route('/subjects/:id/:topicId')
      .get(wrapAsync(adminController.getTopic)) 
      .put(wrapAsync(adminController.putTopic))  
      .delete(wrapAsync(adminController.deleteTopic)); 

module.exports= router;