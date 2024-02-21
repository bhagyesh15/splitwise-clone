const {Router} = require("express");
const { getSplitwise, saveSplitwise, updateSplitwise, deleteSplitwise } = require("../controllers/SplitwiseController");
const { connection } = require("mongoose");
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/UserController");
const { getConnections, getConnectionById, getAllUserConnections, saveUserConnection, getAllUserGroupConnections, getAllUserIndividualConnections, updateUserConnection, deleteUserConnection } = require("../controllers/ConnectionController");
const { getGroups, getGroupById, saveGroup, deleteGroup, updateGroup, getGroupByUserId } = require("../controllers/GroupController");
const { getExpenses, getExpenseById, saveUserExpense, updateUserExpense, deleteUserExpense } = require("../controllers/ExpenseController");

const router = Router();

// router.get('/',getSplitwise);
// router.post('/save',saveSplitwise);
// router.put('/update',updateSplitwise);
// router.post('/delete',deleteSplitwise);


/***** USERS *****/ 
router.get('/users',getUsers);
router.get('/users/:id',getUser);
router.post('/users',createUser);
router.patch('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);


/***** CONNECTIONS *****/
router.get('/connections',getConnections);
router.get('/connections/:id',getConnectionById);
router.get('/connections/user/:id',getAllUserConnections);
router.get('/connections/group/:id',getAllUserGroupConnections);
router.get('/connections/ind/:id',getAllUserIndividualConnections);
router.post('/connections',saveUserConnection);
router.patch('/connections/:id',updateUserConnection);
router.delete('/connections/:id',deleteUserConnection);


/***** GROUPS *****/
router.get('/groups',getGroups);
router.get('/groups/:id',getGroupById);
router.get('/groups/user/:id',getGroupByUserId);
router.post('/groups',saveGroup);
router.patch('/groups/:id',updateGroup);
router.delete('/groups/:id',deleteGroup);


/***** EXPENSES *****/
router.get('/expenses',getExpenses);
router.get('/expenses/:id',getExpenseById);
router.post('/expenses',saveUserExpense);
router.patch('/expenses/:id',updateUserExpense);
router.delete('/expenses/:id',deleteUserExpense);


// /register
// /login
// /expense/new
// /expense/update
// /expense/delete
// /group/create
// /group/update
// /connection

// /getExpensesForGroup
// /getUserExpenses


module.exports= router;