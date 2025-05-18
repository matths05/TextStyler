const express = require("express");
const app = express();
const fs = require('fs');
const portNumber = 5000;
const httpSuccessStatus = 200;
const path = require("path");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

/* Directory where templates will reside */
app.set("views", path.resolve(__dirname, "views"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

app.get("/", (request, response) => { 
    response.render("index");
})

app.listen(portNumber); 
console.log(`Web server is running at http://localhost:${portNumber}`);
process.stdout.write("Type stop to shutdown the server: ");
process.stdin.setEncoding("utf8"); /* encoding */
process.stdin.on('readable', () => {  /* on equivalent to addEventListener */
	const dataInput = process.stdin.read();
	if (dataInput !== null) {
		const command = dataInput.trim();
		if (command === "stop") {
			// Not using console.log as it adds a newline by default
			process.stdout.write("Shutting down the server"); 
            process.exit(0);  /* exiting */
        } else {
			/* After invalid command, we cannot type anything else */
			process.stdout.write(`Invalid command: ${command}`);
            process.stdout.write("\nType itemList or stop to shutdown the server: ");
		}
		process.stdin.resume(); // Allows the code to process next request
    }
});