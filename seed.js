import mongoose from "mongoose";
import { Product } from "./src/models/product.models.js";
import { Customer } from "./src/models/customer.models.js";
import { Table } from "./src/models/table.models.js";
import { sampleProducts, sampleCustomers, sampleTables } from "./sample-data.js";

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/FoodOrder");

    console.log("Connected to MongoDB");

    // Clear existing data
    await Product.deleteMany({});
    await Customer.deleteMany({});
    await Table.deleteMany({});

    console.log("Cleared existing data");

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`Inserted ${sampleProducts.length} products`);

    // Insert sample customers
    await Customer.insertMany(sampleCustomers);
    console.log(`Inserted ${sampleCustomers.length} customers`);

    // Insert sample tables
    const tablesWithQR = sampleTables.map(table => ({
      ...table,
      qr_code: `table-${table.table_number}`
    }));
    await Table.insertMany(tablesWithQR);
    console.log(`Inserted ${sampleTables.length} tables`);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
};

// Run the seed function
seedDatabase();