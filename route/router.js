const express = require('express');
const router = express.Router();
const ctrl = require('../controller/controller');

router.post('/createUser', ctrl.createUser);
router.post('/createBook', ctrl.createBook);
router.get('/listBooks', ctrl.listBooks);
router.post('/borrow', ctrl.borrow);
router.post('/listBorrowed', ctrl.listBorrowedBooks);
router.post('/return', ctrl.returnBook);

module.exports = router;