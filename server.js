import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import app from "./app.js";
import { dbConnection } from "./database/dbConnection.js";

const port = process.env.PORT || 4000;

// Connect to Database
dbConnection();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});