const mongoose = require("mongoose");
const Book = require("../models/book.js");

const dbURL = "mongodb+srv://harshkr1890:123@cluster7.mrbhi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster7";

const bookData = [
    { "title": "To Kill a Mockingbird", "author": "Harper Lee", "serialNo": 1, "category": "Fiction" },
    { "title": "1984", "author": "George Orwell", "serialNo": 2, "category": "Dystopian" },
    { "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "serialNo": 3, "category": "Classic" },
    { "title": "The Catcher in the Rye", "author": "J.D. Salinger", "serialNo": 4, "category": "Young Adult" },
    { "title": "The Hobbit", "author": "J.R.R. Tolkien", "serialNo": 5, "category": "Fantasy" },
    { "title": "Pride and Prejudice", "author": "Jane Austen", "serialNo": 6, "category": "Romance" },
    { "title": "Moby-Dick", "author": "Herman Melville", "serialNo": 7, "category": "Adventure" },
    { "title": "War and Peace", "author": "Leo Tolstoy", "serialNo": 8, "category": "Historical Fiction" },
    { "title": "Crime and Punishment", "author": "Fyodor Dostoevsky", "serialNo": 9, "category": "Philosophical" },
    { "title": "The Art of War", "author": "Sun Tzu", "serialNo": 10, "category": "Strategy" },
    { "title": "The Brothers Karamazov", "author": "Fyodor Dostoevsky", "serialNo": 11, "category": "Classic" },
    { "title": "Don Quixote", "author": "Miguel de Cervantes", "serialNo": 12, "category": "Classic" },
    { "title": "Les Misérables", "author": "Victor Hugo", "serialNo": 13, "category": "Classic" },
    { "title": "Ulysses", "author": "James Joyce", "serialNo": 14, "category": "Modernist" },
    { "title": "The Divine Comedy", "author": "Dante Alighieri", "serialNo": 15, "category": "Epic" },
    { "title": "Hamlet", "author": "William Shakespeare", "serialNo": 16, "category": "Tragedy" },
    { "title": "Macbeth", "author": "William Shakespeare", "serialNo": 17, "category": "Tragedy" },
    { "title": "The Iliad", "author": "Homer", "serialNo": 18, "category": "Epic" },
    { "title": "The Odyssey", "author": "Homer", "serialNo": 19, "category": "Epic" },
    { "title": "Frankenstein", "author": "Mary Shelley", "serialNo": 20, "category": "Horror" },
    { "title": "Dracula", "author": "Bram Stoker", "serialNo": 21, "category": "Horror" },
    { "title": "Jane Eyre", "author": "Charlotte Brontë", "serialNo": 22, "category": "Romance" },
    { "title": "Wuthering Heights", "author": "Emily Brontë", "serialNo": 23, "category": "Romance" },
    { "title": "The Picture of Dorian Gray", "author": "Oscar Wilde", "serialNo": 24, "category": "Classic" },
    { "title": "Brave New World", "author": "Aldous Huxley", "serialNo": 25, "category": "Dystopian" },
    { "title": "Fahrenheit 451", "author": "Ray Bradbury", "serialNo": 26, "category": "Dystopian" },
    { "title": "Anna Karenina", "author": "Leo Tolstoy", "serialNo": 27, "category": "Romance" },
    { "title": "The Count of Monte Cristo", "author": "Alexandre Dumas", "serialNo": 28, "category": "Adventure" },
    { "title": "Middlemarch", "author": "George Eliot", "serialNo": 29, "category": "Classic" },
    { "title": "David Copperfield", "author": "Charles Dickens", "serialNo": 30, "category": "Classic" },
    { "title": "A Tale of Two Cities", "author": "Charles Dickens", "serialNo": 31, "category": "Historical Fiction" },
    { "title": "Oliver Twist", "author": "Charles Dickens", "serialNo": 32, "category": "Classic" },
    { "title": "Great Expectations", "author": "Charles Dickens", "serialNo": 33, "category": "Classic" },
    { "title": "The Scarlet Letter", "author": "Nathaniel Hawthorne", "serialNo": 34, "category": "Classic" },
    { "title": "The Adventures of Huckleberry Finn", "author": "Mark Twain", "serialNo": 35, "category": "Adventure" },
    { "title": "The Adventures of Tom Sawyer", "author": "Mark Twain", "serialNo": 36, "category": "Adventure" },
    { "title": "Treasure Island", "author": "Robert Louis Stevenson", "serialNo": 37, "category": "Adventure" },
    { "title": "The Jungle Book", "author": "Rudyard Kipling", "serialNo": 38, "category": "Adventure" },
    { "title": "Alice's Adventures in Wonderland", "author": "Lewis Carroll", "serialNo": 39, "category": "Fantasy" },
    { "title": "Through the Looking-Glass", "author": "Lewis Carroll", "serialNo": 40, "category": "Fantasy" },
    { "title": "The Wind in the Willows", "author": "Kenneth Grahame", "serialNo": 41, "category": "Children" },
    { "title": "The Call of the Wild", "author": "Jack London", "serialNo": 42, "category": "Adventure" },
    { "title": "White Fang", "author": "Jack London", "serialNo": 43, "category": "Adventure" },
    { "title": "Peter Pan", "author": "J.M. Barrie", "serialNo": 44, "category": "Fantasy" },
    { "title": "The Chronicles of Narnia", "author": "C.S. Lewis", "serialNo": 45, "category": "Fantasy" },
    { "title": "The Lion, the Witch and the Wardrobe", "author": "C.S. Lewis", "serialNo": 46, "category": "Fantasy" },
    { "title": "Prince Caspian", "author": "C.S. Lewis", "serialNo": 47, "category": "Fantasy" },
    { "title": "The Silver Chair", "author": "C.S. Lewis", "serialNo": 48, "category": "Fantasy" },
    { "title": "The Magician's Nephew", "author": "C.S. Lewis", "serialNo": 49, "category": "Fantasy" },
    { "title": "The Horse and His Boy", "author": "C.S. Lewis", "serialNo": 50, "category": "Fantasy" },
    { "title": "The Last Battle", "author": "C.S. Lewis", "serialNo": 51, "category": "Fantasy" },
    { "title": "The Lord of the Rings: The Fellowship of the Ring", "author": "J.R.R. Tolkien", "serialNo": 52, "category": "Fantasy" },
    { "title": "The Lord of the Rings: The Two Towers", "author": "J.R.R. Tolkien", "serialNo": 53, "category": "Fantasy" },
    { "title": "The Lord of the Rings: The Return of the King", "author": "J.R.R. Tolkien", "serialNo": 54, "category": "Fantasy" }
  ]
  

const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB!");

    for (const book of bookData) {
      const existingBook = await Book.findOne({ serialNo: book.serialNo });
      if (!existingBook) {
        await Book.create(book);
        console.log(`Added: ${book.title}`);
      } else {
        console.log(`Skipped: ${book.title} (already exists)`);
      }
    }

    console.log("Seeding completed!");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.disconnect();
  }
};

seedDatabase();