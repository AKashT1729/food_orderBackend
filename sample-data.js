// Sample data to populate the database
export const sampleProducts = [
  // Pasta
  { name: "Red Serve Pasta", price: 259, category: "Pasta" },
  { name: "Creamy White Serve Pasta", price: 269, category: "Pasta" },
  { name: "Pink Serve Pasta", price: 269, category: "Pasta" },
  { name: "Alfredo Pasta", price: 279, category: "Pasta" },
  { name: "Pesto Pasta", price: 289, category: "Pasta" },

  // Pizza
  { name: "Margherita Pizza", price: 299, category: "Pizza" },
  { name: "Pepperoni Pizza", price: 349, category: "Pizza" },
  { name: "BBQ Chicken Pizza", price: 399, category: "Pizza" },
  { name: "Veggie Supreme Pizza", price: 329, category: "Pizza" },

  // Fries
  { name: "French Fries", price: 129, category: "Fries" },
  { name: "Cheese Fries", price: 159, category: "Fries" },
  { name: "Loaded Fries", price: 189, category: "Fries" },

  // Cold Coffee
  { name: "Iced Cappuccino", price: 149, category: "Cold Coffee" },
  { name: "Cold Brew Coffee", price: 139, category: "Cold Coffee" },
  { name: "Vanilla Iced Coffee", price: 159, category: "Cold Coffee" },

  // Hot Coffee
  { name: "Espresso", price: 99, category: "Hot Coffee" },
  { name: "Cappuccino", price: 129, category: "Hot Coffee" },
  { name: "Latte", price: 139, category: "Hot Coffee" },
  { name: "Americano", price: 109, category: "Americano" },

  // Shakes
  { name: "Chocolate Shake", price: 169, category: "Shakes" },
  { name: "Strawberry Shake", price: 169, category: "Shakes" },
  { name: "Vanilla Shake", price: 159, category: "Shakes" },
  { name: "Oreo Shake", price: 189, category: "Shakes" },

  // Sandwiches
  { name: "Grilled Cheese Sandwich", price: 199, category: "Sandwiches" },
  { name: "Club Sandwich", price: 229, category: "Sandwiches" },
  { name: "BLT Sandwich", price: 219, category: "Sandwiches" },

  // Soups
  { name: "Tomato Soup", price: 129, category: "Soups" },
  { name: "Chicken Soup", price: 149, category: "Soups" },
  { name: "Mushroom Soup", price: 139, category: "Soups" },
];

export const sampleCustomers = [
  {
    name: "John Doe",
    phone_number: "+1234567890",
    email: "john@example.com",
    address: "123 Main St, City, State"
  },
  {
    name: "Jane Smith",
    phone_number: "+1234567891",
    email: "jane@example.com",
    address: "456 Oak Ave, City, State"
  }
];

export const sampleTables = [
  { table_number: 1, capacity: 4 },
  { table_number: 2, capacity: 4 },
  { table_number: 3, capacity: 6 },
  { table_number: 4, capacity: 4 },
  { table_number: 5, capacity: 6 },
  { table_number: 6, capacity: 4 },
];