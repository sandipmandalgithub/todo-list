# Todo List Application

A full-stack Todo List application built using **Node.js, Express.js, MongoDB and Mongoose**.

The application allows users to create, view, search, filter, edit, complete and delete todos through a responsive web interface.

---

## 🚀 Live Project

Live Demo: Coming Soon

GitHub Repository:

https://github.com/sandipmandalgithub/todo-list

---

## 📌 Features

- Create a new Todo
- View all Todos
- View Todo by ID
- Edit Todo
- Mark Todo as Completed
- Mark Todo as Pending
- Delete Todo
- Search Todos by title or description
- Filter Todos by status
- Todo counter
  - Total
  - Completed
  - Pending
- Loading state
- Error messages
- Success messages
- Empty state
- Responsive design
- MongoDB database integration
- REST API
- Edit Todo modal

---

## 🛠️ Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

### Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API

### Development Tools

- VS Code
- Git
- GitHub
- Nodemon
- MongoDB Atlas

---

## 📂 Project Structure


todo-list/
│
├── models/
│   └── Todo.js
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md


---

## ⚙️ Installation

### 1. Clone the Repository


git clone https://github.com/sandipmandalgithub/todo-list.git


### 2. Open the Project


cd todo-list


### 3. Install Dependencies


npm install


### 4. Create Environment File

Create a `.env` file in the root directory.


PORT=5000
MONGO_URI=your_mongodb_connection_string


Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string.

---

## ▶️ Run the Application

### Development Mode


npm run dev


The server will start at:


http://localhost:5000


### Production Mode


npm start


---

## 🔌 API Endpoints

### Create Todo


POST /api/todos


Example request:


{
    "title": "Learn Node.js",
    "description": "Learn Express.js and MongoDB"
}


---

### Get All Todos


GET /api/todos


---

### Search Todos


GET /api/todos/search?keyword=node


---

### Filter Todos


GET /api/todos/filter?completed=true


For pending todos:


GET /api/todos/filter?completed=false


---

### Get Todo by ID


GET /api/todos/:id


---

### Update Todo


PUT /api/todos/:id


Example request:

{
    "title": "Learn Node.js and Express",
    "description": "Learn REST API and MongoDB"
}


---

### Complete / Uncomplete Todo


PATCH /api/todos/:id/complete


This endpoint toggles the Todo between completed and pending status.

---

### Delete Todo


DELETE /api/todos/:id


---

## 🗄️ Database

The application uses **MongoDB Atlas** as the database.

Each Todo contains:


_id
title
description
completed
createdAt
updatedAt


---

## 📱 Responsive Design

The frontend is designed to work across:

* Mobile phones
* Tablets
* Laptops
* Desktop computers

The layout automatically adjusts based on screen size.

---

## 🔐 Environment Variables

The MongoDB connection string is stored inside `.env`.

The `.env` file is excluded from Git using `.gitignore`.

Never commit database credentials or other secrets to GitHub.

---

## 🧪 Testing

The following functionality has been tested:

* Todo creation
* Todo listing
* Todo search
* Todo filtering
* Todo editing
* Todo completion
* Todo deletion
* Empty state
* Responsive layout
* Edit modal
* MongoDB connection

---

## 👨‍💻 Author

**Sandip Mandal**

Full Stack Developer

GitHub:

https://github.com/sandipmandalgithub

Portfolio:

https://sandipmandalgithub.github.io/sandip-portfolio/

LinkedIn:

https://www.linkedin.com/in/mrsandipmandal/

---

## 📄 License

This project is licensed under the ISC License.
