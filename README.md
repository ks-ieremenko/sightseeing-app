# Sightseeing app

The goal of a project is to help users share and find beautiful places for sightseeing in any city. They can view places created by other users and choose the ones they'd love for visiting.

**Frontend:** React

**Backend:** Express, MySQL+Sequelize

---

>*server folder*
* Install dependencies with `npm install`
* Run the dev server with `npm start`
* The application is run on 8080 port

>*client folder*
* Install dependencies with `npm install`
* Run the react application with `npm start`
* The application is run on 3000 port

---
**Possible actions:**
- Authorization: 
  - Sign up (with or without admin rights)
  - Sign in
  - Log out
- For admin only:
  - View and delete registered users
  - Delete places
- For users:
  - View page with categories, add new ones
  - View places that look like cards with title, image and description and 2 buttons - delete and more info
  - Go to more info page that includes title, description, address, nearest subway station and category
  - Edit the information of a place
  - View profile, change username 

