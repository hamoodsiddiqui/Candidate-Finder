# Candidate Finder

Candidate Checker is a web application that allows administrators to filter and view candidates based on required qualifications. It provides an admin dashboard where administrators can see all candidates or apply specific filters to narrow down the list of candidates. The filtered results can then be used to send emails to selected candidates.

## Features

- Admin dashboard to view all candidates.
- Filter candidates by qualifications and additional qualifications.
- Multiple selection of qualifications and additional qualifications using checkboxes.
- Send email to selected candidates directly from the admin dashboard.

## Technologies Used

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL (Database)
- EJS (Templating Engine)
- Tailwind CSS (Styling)
- JavaScript (Client-side scripting)


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/candidate-checker.git
    ```
2. Navigate to the project directory:
    ```sh
    cd candidate-checker
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file in the root directory and add your database configuration:
    ```env
    DB_HOST=your_db_host
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```
2. Open your web browser and navigate to `http://localhost:3000`.

## Future Improvements

- Add more filters such as location, experience, etc.
- Improve the email sending functionality with more options and templates.
- A responsive and decent frontend

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.



