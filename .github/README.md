# JourNavi

JourNavi is a full-stack web application for travelers to document, share, and explore journeys around the world.

## Main Features 🗝️

- **Account Management:**  
  - Accounts are created using an email address and a secure password, which are used for authentication.
  - Supports password changes for improved security.
  - Allows users to delete their account, with all associated information automatically removed from the system.
- **User Profile:**  
  - Each user has a profile page displaying their information, posts, visited and favorite countries.
  - Profile details such as name, nationality, bio, and profile picture can be updated at any time.
- **Countries Explorer:**  
  - Provides a comprehensive list of countries with key details including languages and currencies.
  - Users can mark these countries as visited, favorite, or wish to visit.
- **Posts & Comments:**  
  - Enables users to create, edit, and delete posts about their travel experiences, including the option to upload images.
  - Each post features a comment section where other users can leave reactions.
- **Pagination:**  
  Implements paginated views to enhance content navigation and performance.
- **Responsive UI:**  
  Features a modern, mobile-friendly interface with support for dark mode.

## Architecture 🏗️

- **Frontend:** React.js (with React Router, Context API, and reusable components), Bootstrap 5.3, and CSS3.
- **Backend:** Python Flask (RESTful API, and JWT authentication).
- **Database:** SQLAlchemy (supports PostgreSQL, MySQL, and SQLite).
- **Other Services:** [Cloudinary](https://cloudinary.com/) (for user image management), and [REST Countries API](https://www.restcountries.com/) (for details of countries).

## Main Folder Structure 🔎

```
src/
api/ # Flask backend (models, routes, utilities)
front/ # React frontend (components, pages, styles)
contexts/ # Authentication and global contexts
stories/ # Storybook components and documentation
```

## Installation and Configuration ⚙️

1. Clone the repository and navigate to the project folder.

2. Install the backend dependencies:
```sh
pipenv install
pipenv install cloudinary
```

3. Install the frontend dependencies:
```sh
npm install
```

4. Set the environment variables:
- Copy the file `.env.example` to `.env` and fill in the necessary details for the database and external services.

5. **Perform the database migrations:**
```sh
pipenv run migrate
pipenv run upgrade
```

6. **Run the backend:**
```sh
pipenv run start
```

7. **Run the frontend:**
```sh
npm run start
```

## Collaboration and Development 👩‍💻

- There are so many things you can do in this project, for instance:
  - Create new login methods using Firebase.
  - Include IA assistance as a feature.
  - Enhance the design of alerts and messages to improve clarity, visibility, and overall user experience.
- Use branches for your contributions and make clear and descriptive pull requests.
- If you add a new dependency or key feature, remember to update this README.

## Contact 🆘

Do not hesitate to contact [the author](https://github.com/JoniXSantos) for any question, suggestion, or to report any bug!
