CREATE TABLE IF NOT EXISTS book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price INTEGER NOT NULL,
    pages INTEGER NOT NULL
);

INSERT INTO book (title, author, price, pages) VALUES
('JavaScript for Beginners', 'Mark Myers', 350, 280),
('Clean Code Basics', 'Daniel Green', 480, 320),
('Computer Organization', 'William Stallings', 620, 720),
('Practical SQL', 'Anthony DeBarros', 450, 390),
('Python Projects', 'Laura Cassell', 390, 300),
('Fundamentals of Networking', 'James Kurose', 580, 650),
('Learning Node.js', 'Ethan Brown', 520, 410),
('C++ Programming Guide', 'Stephen Prata', 550, 850),
('Basics of Cloud Computing', 'Thomas Erl', 470, 360),
('Introduction to Data Science', 'Joel Grus', 490, 340);

