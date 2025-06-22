# JourNavi

JourNavi is a full-stack web application for travelers to document, share, and explore journeys around the world.

## Main Features 🗝️

- **Authentication & Account Management:**  
  - It is possible to create an account with an email address and a secure password that meets the defined complexity requirements.
  - Users can log in using the registration email and password and log out anytime.
  - Passwords can be changed later to enhance security.
  - Accounts can be deleted, which will also remove all associated data from the database.
- **Profile:**  
  - Each user has a profile page displaying their information, posts, visited and favorite countries.
  - Users can change their profile information (name, nationality, about) and picture (with [Cloudinary](https://cloudinary.com/) integration).
- **Countries Explorer:**  
  - List of countries with details such as languages and currencies (using [REST Countries API](https://www.restcountries.com/)).
  - Users can mark these countries as visited, favorite, or wish to visit.
- **Posts & Comments:**  
  - Users can create, edit, and delete posts with images about their journeys.
  - Every post has a comments section where users can react.
- **Pagination:**  
  Paginated views for better navigation.
- **Responsive UI:**  
  Modern, responsive interface with dark mode support.

## Architecture 🏗️

- **Frontend:** React.js (with React Router, Context API, and reusable components), Bootstrap 5.3, and CSS3.
- **Backend:** Python Flask (RESTful API, and JWT authentication).
- **Database:** SQLAlchemy (supports PostgreSQL, MySQL, and SQLite).

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
  - Improve alerts/messages' design.
- Use branches for your contributions and make clear and descriptive pull requests.
- If you add a new dependency or key feature, remember to update this README.

## Contact 🆘

Do not hesitate to contact [the author](https://github.com/JoniXSantos) for any question, suggestion, or to report any bug!
