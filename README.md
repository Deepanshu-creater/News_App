# News Website

This is a news website built using the MERN stack (MongoDB, Express, React, Node.js). The website allows users to view news articles, search for articles by keyword, and create an account to save articles for later reading.

## Installation

To install the project, follow these steps:

1. Clone the repository: `git clone https://github.com/devanshkansagra/News-App.git`
2. Install the dependencies: `npm install`
3. Create a `config.env` file in the server directory with the following variables:
   ```
   DATABASE=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   PORT=5000
   SECRETKEY=<secret-key>
   ```
   Replace `<username>`, `<password>`, `<cluster>`, `<database>`, and `<secret-key>` with your own values.
4. Start the server: `nodemon app.js`
5. Start the client: `cd client && npm start`

The server will start on port 5000, and the client will start on port 3000.

## Usage

To use the website, follow these steps:

1. Open the website in your browser: `http://localhost:3000`
2. Browse the news articles on the home page.
3. Search for articles by keyword using the search bar.
4. Create an account to save articles for later reading.

## Contributing

Contributions are welcome! To contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`
3. Make your changes and commit them: `git commit -m "Add new feature"`
4. Push your changes to your fork: `git push origin my-feature-branch`
5. Create a pull request.
