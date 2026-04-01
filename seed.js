import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/userSchema.js";
import { Dish } from "./models/dishSchema.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Restaurant",
    });
    console.log("Connected to database for seeding...");

    // 1. Create default admin if not exists
    let admin = await User.findOne({ role: "admin" });
    if (!admin) {
      admin = await User.create({
        name: "Admin User",
        email: "admin@gmail.com",
        password: "adminpassword123",
        role: "admin",
      });
      console.log("Admin user created: admin@gmail.com / adminpassword123");
    }

    // 2. Clear existing dishes
    await Dish.deleteMany({});
    console.log("Existing dishes cleared.");

    // 3. Load dishes from restApi.json
    const filePath = path.join(__dirname, "..", "frontend", "src", "restApi.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(rawData);
    const apiDishes = jsonData.data[0].dishes;

    const dishesToInsert = apiDishes.map((d) => ({
      title: d.title,
      description: d.description,
      image: d.image,
      category: d.category,
      price: d.price,
      createdBy: admin._id,
    }));

    await Dish.insertMany(dishesToInsert);
    console.log(`${dishesToInsert.length} dishes migrated from restApi.json to MongoDB.`);

    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

seedDatabase();
