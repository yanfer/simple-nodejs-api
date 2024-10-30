import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json()); // & TO CONVERT REQUEST BODY TO JSON

const readData = () => {
	try {
		const data = fs.readFileSync("./db.json");
		return JSON.parse(data);
	} catch (error) {
		console.log(error);
	}
};

const writeData = (data) => {
	try {
		fs.writeFileSync("./db.json", JSON.stringify(data));
	} catch (error) {
		console.log(error);
	}
};

// ~~~~~~ ENDPOINTS ~~~~~~
app.get("/", (req, res) => {
	res.send("Hello World");
});

// ^^^^ GET BOOKS ^^^^
app.get("/books", (req, res) => {
	const data = readData();
	res.json(data.books);
});

// ^^^^ GET BY ID ^^^^
app.get("/books/:id", (req, res) => {
	const data = readData();
	const id = parseInt(req.params.id); // & TO CONVERT STRING TO INTEGER
	const book = data.books.find((book) => book.id === id);
	res.json(book);
});

// ^^^^ POST REQUEST ^^^^
app.post("/books", (req, res) => {
	const data = readData();
	const body = req.body;
	const newBook = {
		id: data.books.length + 1,
		...body,
	};

	data.books.push(newBook);
	writeData(data);
	res.json(newBook);
});

// ^^^^ PUT REQUEST ^^^^
app.put("/books/:id", (req, res) => {
	const data = readData();
	const body = req.body;
	const id = parseInt(req.params.id);
	const bookIndex = data.books.findIndex((book) => book.id === id);
	data.books[bookIndex] = {
		...data.books[bookIndex],
		...body,
	};
	writeData(data);
	res.json({ message: "Book updated successfully" });
});

// ^^^^ DELETE REQUEST ^^^^
app.delete("/books/:id", (req, res) => {
	const data = readData();
	const id = parseInt(req.params.id);
	const bookIndex = data.books.findIndex((book) => book.id === id);
	data.books.splice(bookIndex, 1);
	writeData(data);
	res.json({ message: "Book deleted successfully" });
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
