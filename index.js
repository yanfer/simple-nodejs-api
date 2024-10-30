import express from "express";
import fs from "fs";

const app = express();

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

/*  **NOTE -  ENDPOINTS */
app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/books", (req, res) => {
	const data = readData();
	res.json(data.books);
});
app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
