# URL Shortener

A simple full-stack URL Shortener web application that converts long URLs into short and easy-to-share links.

## Features

* Shorten long URLs into short links
* Redirect short links to the original URL
* Store URLs in MongoDB
* Track the number of clicks on each short URL
* Validate URLs before shortening
* Copy the generated short URL
* Clear the input and result
* Handle invalid or unavailable short URLs with a 404 page
* Press Enter to shorten a URL

## Technologies Used

* **HTML** – Structure of the web page
* **CSS** – Styling and layout
* **JavaScript** – Frontend functionality
* **Node.js** – Backend runtime
* **Express.js** – Server and API handling
* **MongoDB Atlas** – Database
* **Mongoose** – MongoDB connection and data management
* **dotenv** – Managing environment variables

## How It Works

1. The user enters a long URL.
2. The frontend sends the URL to the Express.js server.
3. The server generates a unique short ID.
4. The URL and short ID are stored in MongoDB.
5. The generated short URL is shown to the user.
6. When the short URL is opened, the server finds the original URL in MongoDB.
7. The click count is increased and the user is redirected to the original URL.

## Project Structure

```text
URL-Shortener/
│
├── public/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── 404.html
│
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── urlModel.js
```

## Database

The application uses MongoDB Atlas to store shortened URLs.

Each URL record contains:

* `longUrl` – Original URL
* `shortId` – Generated short identifier
* `clicks` – Number of times the short URL has been opened

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/kanak-0911/URL-Shortener.git
```

### 2. Open the project folder

```bash
cd URL-Shortener
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Add your MongoDB connection string:

```text
MONGO_URI=your_mongodb_connection_string
```

Do not upload the `.env` file to GitHub.

### 5. Start the server

```bash
npm start
```

### 6. Open the application

Open:

```text
http://localhost:3000
```

## Future Improvements

* User login and registration
* Custom short URLs
* URL expiration
* Better analytics and click statistics
* Deployment for public access

## Author

**Kanak Sharma**

BCA Student | Interested in Web Technologies, Data Analytics and Technical Content Writing
