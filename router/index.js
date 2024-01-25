const express = require('express');
const Controller = require('../contollers/index')
const UserController = require('../contollers/UserController')
const router = express.Router();

router.get('/register',UserController.registerForm)
router.post('/register',UserController.postRegister)

router.get('/login',UserController.loginForm )

router.get('/', Controller.landingPage)
// router.get('/login', Controller.showHomeLoginPage)
//router.get('/login', Controller.showLoginPage)
router.get('/stores', Controller.showAllStores)
router.get('/clubs', Controller.showAllStores)

router.get('/stores/delete/:storeId', Controller.deleteClub)

router.get('/stores/add', Controller.addNewStoreForm)
router.post('/stores/add', Controller.addNewStore);
router.get('/stores/:storeId',Controller.showStorenItsEmployees)
router.get('/employees', Controller.showAllEmployees)
router.get('/employees/delete/:id', Controller.deleteEmployeeById)
router.get('/stores/:storeId/employees/add', Controller.addNewEmployee)
router.post('/stores/:storeId/employees/add', Controller.newEmployeeAddedData)
router.get('/stores/:storeId/employees/delete/:employeeId', Controller.deleteEmployeeInStore)
router.get('/stores/:storeId/edit/:employeeId',Controller.editEmployeeForm)
router.post('/stores/:storeId/edit/:employeeId',Controller.editedEmployeeData)

router.get('/error', Controller.showErrorPage)
router.get('/search/',Controller.search)


// router.use((err, req, res, next) => {
//     // Log the error for debugging purposes
//     console.error(err.stack);
  
//     // Redirect to the error page
//     res.redirect('/error'); // Assuming '/error' is the route for the error page
//   });



module.exports = router;

//stores change to clubs