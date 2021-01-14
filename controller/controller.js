const User = require('../model/user');
const Book = require('../model/book');
var mongoose = require('mongoose');


const createUser = async (req,res) =>{
	try{
		const { name, email } = req.body;
		let user = await User.findOne({ email: email });
		if(user){
			return res.status(200).send({
				msg: 'User already present for given credentials',
				user: user
			});
		}
		else{
			let user = new User({
				name: name,
				email: email
			});
			await user.save();
			return res.status(200).send({
				msg: 'User created',
				user: user
			});
		}
	}
	catch(err){
		console.log(err);
		return res.status(400).send({
			msg: 'Error in CreateUser '+err
		});
	}
}

const createBook = async (req,res) => {
	try{
		const { name, author } = req.body;
		let book = await Book.findOne({ name: name });
		if(book){
			return res.status(200).send({
				msg: 'Book already present in database',
				book: book
			});
		}
		else{
			let book = new Book({
				name: name,
				author: author
			});
			await book.save();
			return res.status(200).send({
				msg: 'Book created',
				book: book
			});
		}
	}
	catch(err){
		console.log(err);
		return res.status(400).send({
			msg: 'Error in CreateBook '+err
		});
	}
}

const listBooks = async (req,res) => {
	try{
		let books = await Book.find({isBorrowed: false});
		if (books.length == 0) {
			return res.status(404).send({
				msg:'Library is empty'
			});
		}
		return res.status(200).send({
			msg:'All books listed',
			books: books
		});
	}
	catch{err}{
		console.log(err);
		return res.status(400).send({
			msg: 'Error in ListBooks '+err
		});
	}
}

const borrow = async (req, res) => {
	try{
		let { bookId, email } = req.body;
		let user = await User.findOne({email : email});
		if(user.borrowedBooks.length >= 2){
			return res.status(400).send({
				msg: 'you can only borrow 2 books at a time'
			});
		}
		else{
		 	let book = await Book.findById(mongoose.mongo.ObjectId(bookId));
		 	book.isBorrowed = true;
		 	await book.save();
			user.borrowedBooks.push(bookId);
			await user.save();
			return res.status(200).send({
				msg: 'book borrowed successfully'
			})
		}
	}
	catch(err){
		console.log(err);
		return res.status(400).send({
			msg: 'Error in borrow '+err
		});
	}
}

const listBorrowedBooks = async (req,res) =>{
	try{
		let { email } = req.body;
		let user = await User.findOne({email : email});
		if(user.borrowedBooks.length == 0){
			return res.status(404).send({
				msg:'no borrowed books found'
			});
		}
		else{
			let borrowed=[];
			for(let i = 0; i < user.borrowedBooks.length; i++){
				let book = await Book.findById(user.borrowedBooks[i]);
				let { name, author } = book;
				let bookinfo = { name: name, author: author };
				borrowed.push(bookinfo);
			}
			return res.status(200).send({
				borrowed: borrowed
			});
		}
	}
	catch(err){
		console.log(err);
		return res.status(400).send({
			msg: 'Error in listBorrowedBook '+err
		});
	}
}

const returnBook = async (req,res) => {
	try{
		let { bookId, email } = req.body;
		let user = await User.findOne({email: email});
		let book = await Book.findById(mongoose.mongo.ObjectId(bookId));
		book.isBorrowed = false;
        await book.save();
        const i = user.borrowedBooks.map(m => m._id).indexOf(bookId);
		if(i > -1){
			user.borrowedBooks.splice(i,1);
		}
		await user.save();
		return res.status(200).send({
			msg: 'book returned successfully'
		})
	}
	catch(err){
		console.log(err);
		return res.status(400).send({
			msg: 'Error in unBorrow '+err
		});
	}
}

module.exports = {createUser, createBook, listBooks, borrow, listBorrowedBooks, returnBook};
