# Projects

A web application for managing and showcasing projects. This application allows users to create, update, and view project details, including descriptions, images, and links.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Preconditions](#preconditions)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

---

## About the Project

The `projects` application is designed to help users manage and organize their project portfolios. It provides a user-friendly interface for adding project details, descriptions, and images, making it easy to showcase project work in a visually appealing way.

---

### Built With

- **React** - Using well known libraries such as Redux, useContext and axios, also used small libraries like DropZone, SlickCarousel, etc. for punctual problems.
- **Node.js**, **Nest** and **TypeScript** - Backend and REST API.
- **Postgres** - SQL database for storing project and image data.
- **Sass** - For styling the application.

---

## Features

--**View Projects**: You can see visible projects

- **Create Projects**: Add project titles, descriptions, images, and links.
- **Edit and Delete**: Update or remove existing project details.

---

## Getting Started

### Preconditions

For running this project you need Docker, Node.js and npm.

Run in terminal

```bash
git clone https://github.com/leomatei/projects.git
cd  projects
```

### Installation

Start Docker. Would be better to run `npm install` in frontend and backend directory to not have errors and warnings in your IDE.

### Running the Application

Run this command to build containers.

```bash
docker-compose up --build
```

Wait for the app to build.
FE will start on http://localhost:3001/
BE will start on http://localhost:3000/

#### OPTIONAL pg-admin

In docker-compose.yml you can uncomment the pg-admin container. This container will run on http://localhost:5050
https://github.com/leomatei/projects/blob/main/docker-compose.yml
I chose to comment this container for better performance.

---

## Usage

- **Home Page**:
  You can see visible (with status true) projects. This is a paginated query, you will get the most recent 10 projects, pressing load more will fetch 10 more projects and the previous 10 projects will still be visible.

From the HomePage you can press the '+ Add Project' button to redirect to create new project page.

From the HomePage you can press the 'Add 10 more dummy projects' button to create 10 more new projects.

Looking at a Project you can press 'Edit Project' button to be redirected to the update project page. Also you can press the 'Delete Project' button in order to delete the selected project.

- **Create and Update Page**:
  On those pages you can choose a title with a max length of 100 characters; description with a max length of 1000 character; links, also localhost links work; adding images, you can use dialog box to add, or you can drag and drop.
  IMPORTANT: you can upload images up to 10MBs, the formula used in code to evaluate total size is not accurate! Images are saved ar URI with a base64 code. The formula used just count the string size of the URI for image. This is the size of the URI in the request to BE. The actual size of the image is ~30% smaller. This is a miscommunication that I will work on later.

- **Admin Panel**:
  There is no link in the app for this page. You have to access it manually.
  http://localhost:3001/admin
  You can see a paginated query to see all the projects, no matter the status.
  Yon can also change the status of the project.

```
├── backend/
│   ├── src/
│   │   ├── images/
│   │   │   └── image.dto.ts
│   │   │   └── image.entity.ts
│   │   │   └── images.controller.ts       ---routes for images
│   │   │   └── images.module.ts
│   │   │   └── images.service.spec.ts     ---test for images
│   │   │   └── images.service.ts
│   │   ├── projects/
│   │   │   └── project.dto.ts
│   │   │   └── project.entity.ts
│   │   │   └── projects.controller.ts     ---routes for projects
│   │   │   └── projects.module.ts
│   │   │   └── projects.service.spec.ts   ---test for projects
│   │   │   └── projects.service.ts
│   │   └── app.controller.spec.ts
│   │   └── app.controller.ts
│   │   └── app.module.ts
│   │   └── app.service.ts
│   │   └── main.ts
│   ├── test/
│   │   └── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   └── .dockerignore
│   └── .eslintrc.js
│   └── .gitignore
│   └── .prettierrc
│   └── Dockerfile
│   └── nest-cli.json
│   └── package-lock.json
│   └── package.json
│   └── README.md
│   └── tsconfig.build.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   │   └── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── assets/                        ---SVGs
│   │   │   └── back-arrow.svg
│   │   │   └── click.svg
│   │   │   └── delete.svg
│   │   │   └── edit.svg
│   │   │   └── plus.svg
│   │   ├── components/
│   │   │   ├── imageSliderModal/
│   │   │   │   └── index.jsx
│   │   │   │   └── styles.scss
│   │   │   ├── modal/                     ---Abstract component for modal
│   │   │   │   └── index.jsx
│   │   │   │   └── styles.scss
│   │   │   ├── projectForm/               ---Abstract component for form
│   │   │   │   └── index.jsx
│   │   │   │   └── styles.scss
│   │   │   ├── projectItem/
│   │   │   │   └── index.jsx
│   │   │   │   └── styles.scss
│   │   │   ├── projectsList/
│   │   │   │   └── index.jsx
│   │   │   │   └── styles.scss
│   │   │   ├── spinner/
│   │   │   │   └── index.jsx
│   │   │   │   └── styles.scss
│   │   ├── customHooks/
│   │   │   └── modalContext.jsx           ---You can see the use of useContext in my app for handling modal content
│   │   │   └── useImageUploader.js        ---Hook for handling the image uploader
│   │   │   └── useOutsideClick.js         ---Hook for closing the modal if you click outside the modal
│   │   ├── pages/
│   │   │   ├── adminPanel/
│   │   │   │   └── index.jsx              ---code for /admin page
│   │   │   ├── homePage/
│   │   │   │   └── index.jsx              ---code for root route '/'
│   │   │   │   └── styles.scss
│   │   │   ├── newProjectForm/
│   │   │   │   └── index.jsx              ---code for /project
│   │   │   ├── updateProjectForm/
│   │   │   │   └── index.jsx              ---code for /project/:id
│   │   ├── services/
│   │   │   └── projectServices.js         ---code for sending the requests to BE using axios
│   │   ├── store/                         ---redux store for global variables
│   │   │   └── generalSlice.js
│   │   │   └── projectsSlice.js
│   │   │   └── store.js
│   │   ├── styles/
│   │   │   └── variables.scss
│   │   ├── utils/
│   │   │   └── handleModals.jsx           ---Handling modal content and opening the modal
│   │   └── App.css
│   │   └── App.jsx
│   │   └── App.test.js
│   │   └── index.css
│   │   └── index.jsx
│   │   └── reportWebVitals.js
│   │   └── setupTests.js
│   └── .dockerignore
│   └── .gitignore
│   └── Dockerfile
│   └── index.html
│   └── package-lock.json
│   └── package.json
│   └── README.md
│   └── vite.config.js
├── init-db/
│   └── 01-tables.sql                      ---Schema of the tables in DB
│   └── 02-tables-data.sql                 ---Initial data for DB
└── docker-compose.yml
└── project_structure.txt
└── README.md
```
