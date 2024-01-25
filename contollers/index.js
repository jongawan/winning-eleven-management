const { Store } = require('../models')
const { Employee } = require('../models')
const { Op } = require("sequelize");
const sequelize = require('sequelize');



class Controller {
    static async landingPage(req, res) {
        try {

            res.render('landing-page');

        } catch (error) {
            console.log(error)
            res.send(error)

        }
    }

    static async showHomeLoginPage(req, res) {
        try {

            let data = await Store.findAll();


            res.render('login', { data });

        } catch (error) {
            console.log(error)
            res.send(error)

        }
    }


    static async showAllStores(req, res) {
        try {
            //res.send('Hello World!')

            let deletedClubName = req.query.deletedclub
            //console.log(deletedClubName)


            let data = await Store.findAll();

            res.render('stores', { data, deletedClubName });

            //throw new Error('Something went wrong');


        } catch (error) {

            //next(error);

            console.log(error)
            res.send(error)

        }
    }



    static async deleteClub(req, res) {
        try {

            let deletedClub = await Store.findOne({
                attributes: ['name'],
                where: {
                    id: req.params.storeId,
                },
            })
            //console.log(deletedClub.name, ">>> to DELETE")


            await Store.destroy({
                where: {
                    id: req.params.storeId,
                },
            })

            res.redirect(`/stores?deletedclub=${deletedClub.name}`)



        } catch (error) {
            console.log(error)
            res.send(error)

        }
    }



    static async addNewStoreForm(req, res) {
        try {

            res.render('add-new-store');

        } catch (error) {
            console.log(error)
            res.send(error)

        }
    }

    static async addNewStore(req, res) {
        try {

            await Store.create({ name: req.body.name, location: req.body.location, category: req.body.category });

            res.redirect('/stores');

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async showAllEmployees(req, res) {
        try {

            let deletedEmployeesName = req.query.deleted
            //console.log(deletedEmployeesName, ">>> deleted employees name")

            let dataStore = await Store.findAll({
                // where: {
                //   id: req.params.id
                // }
            });

            let dataEmployee = await Employee.findAll({

            });

            res.render('employees', { dataEmployee, dataStore, deletedEmployeesName });
            //console.log(data)
            //res.json(data)

        } catch (error) {
            console.log(error)
            res.send(error)

        }
    }

    static async showStorenItsEmployees(req, res) {
        try {
            //res.send(`ID is ${req.params.storeId}`)


            let dataStore = await Store.findAll({
                where: {
                    id: req.params.storeId,
                },
            })
            let storeId = req.params.storeId
            //console.log(dataStore[0].dataValues.id, ">>>>>>")

            let dataEmployee = await Employee.findAll({
                where: {
                    StoreId: req.params.storeId,
                },
            })


            let deletedEmployeesName = req.query.deleted
            console.log(deletedEmployeesName, ">>> deleted employees name")

            //console.log(dataEmploye, ">>> data Employee")
            res.render('employees-per-store', { dataEmployee, dataStore, deletedEmployeesName, storeId })
            //res.send (dataEmployee)

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }


    static async deleteEmployeeInStore(req, res) {
        try {

            let StoreId = req.params.storeId
            let deletedEmployeeInStore = await Employee.findOne({
                attributes: ['firstName'],
                where: {
                    id: req.params.employeeId,
                },
            })

            await Employee.destroy({
                where: {
                    id: req.params.employeeId,
                },
            })
            //res.send(deletedEmployeeInStore)
            //console.log(deletedEmployeeInStore, ">>> deleted employee in store")
            res.redirect(`/stores/${StoreId}/?deleted=${deletedEmployeeInStore.firstName}`)


        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }


    static async deleteEmployeeById(req, res) {
        try {
            //res.send(`delete by ID ${req.params.id}`)

            let deletedEmployee = await Employee.findOne({
                attributes: ['firstName'],
                where: {
                    id: req.params.id,
                },

            })

            await Employee.destroy({
                where: {
                    id: req.params.id,
                },

            })

            //res.send(deletedEmployee)
            //console.log(deletedEmployee,">>> deleted employe's store ID");
            res.redirect(`/employees?deleted=${deletedEmployee.firstName}`)

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }



    static async addNewEmployee(req, res) {
        try {

            let dataStore = await Store.findAll({
                where: {
                    id: req.params.storeId,
                },
            })

            let reqParamsId = req.params.storeId;
            //console.log(reqParamsId, ">>> req params ID")
            //console.log(req.params.storeId, "++++")
            //console.log(dataStore, "------")
            let dataEmployee = await Employee.findAll()
            console.log(req.query);
            let errorMessage = []
            if (req.query.errorsMessages) {
                errorMessage = (req.query.errorsMessages).split(",")
                console.log(errorMessage, ">>>????////")
            }

            res.render('add-new-employee', { dataEmployee, dataStore, reqParamsId, errorMessage })

        } catch (error) {
            res.send(error)

        }
    }


    static async newEmployeeAddedData(req, res) {
        try {
            //console.log(req.params.storeId, ">>>>>>>>")

            let dataEmployee = await Employee.create({
                firstName: req.body.firstName, lastName: req.body.lastName, dateOfBirth: req.body.dateOfBirth,
                education: req.body.education, position: req.body.position, salary: req.body.salary, StoreId: req.params.storeId
            });

            let reqParamsId = req.params.storeId;

            res.redirect(`/stores/${reqParamsId}`)

        } catch (error) {

            //console.log(error)
            //res.send(error) 


            if (error.name = "SequelizeValidationError") {
                let errorsMessages = error.errors.map((perError) => {
                    return perError.message
                })
                res.redirect(`/stores/${req.params.storeId}/employees/add/?errorsMessages=${errorsMessages}`)

            } else {
                console.log(error)
                res.send(error)
            }
        }
    }

    static async editEmployeeForm(req, res) {
        try {

            let storeId = req.params.storeId
            let employeeId = req.params.employeeId

            let joinedData = await Store.findAll({
                include: {
                    model: Employee
                }
            })

            let data = await Employee.findOne({
                where: {
                    id: employeeId
                }
            })
            //res.send(joinedData)

            res.render('edit-employee', { storeId, data, employeeId })

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }



    static async editedEmployeeData(req, res) {
        try {

            let storeId = req.params.storeId
            let employeeId = req.params.employeeId

            console.log(req.body);
            await Employee.update({
                firsName: req.body.firstName, lastName: req.body.lastName, dateOfBirth: req.body.dateOfBirth,
                education: req.body.education, position: req.body.position, salary: req.body.salary
            }, {
                where: {
                    id: employeeId
                }
            });

            res.redirect(`/stores/${storeId}`)


        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }


    static async showErrorPage(req, res) {
        try {


            res.render('error', {})


        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }


    static async search(req, res) {
        try {


            let combinedTable

            res.render('search')


        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }




}







module.exports = Controller