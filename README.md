### SCOREMARK

Welcome to ScoreMark!

ScoreMark is a range tool, designed to help target shooters track their shooting performance and improve their skills on the range.

Some features:

- Record and store your shooting scores
- Track your progress over time
- View analysis of your shooting performance
- Record notes/goals to further measure your improvement

### Author

## T Mark Schisel ##

## Table of Contents
- [Updates](#updates)
- [About](#usage)
- [Games](#games)
- [Install](#getting-started)
- [Thanks](#acknowledgments)
- [Dependencies](#dependencies)

### Project Mission:

This application was developed to address the need for a way to track my scores while at the shooting range, as well as have the ability to visualize personal improvement. This was also created as my Solo Project for my course work at Emerging Digital Academy.

Emerging Digital Academy is an immersive 20-week program that empowers learners to begin their new careers in the technology industry. This full-time, classroom-based coding school provides small cohort sizes, one-on-one instructor support, weekly presentations by local industry professionals, and project-based learning principles. Students graduate the program with a portfolio of unique and meaningful projects to demonstrate their talents. You can learn more about Emerging Digital Academy at http://www.emergingacademy.org.

## Updates

I am currently updating this application to clean up my components, and to clean up the code within. If you are here to view the project: Welcome! and thank you for visiting. Most components in this project need some revisiting, and to make the overall project more DRY.  Excuse the dust, and again, thanks for the visit!

## Usage

Whether you are a novice or an experienced shooter, ScoreMark can assist you in honing your skills and achieving your shooting goals.

![Login Screen](image.png)

## 1. Profile

  - Displays username and total rounds played
  - Two graph views of the last 10 games played
    - option to toggle view to most recent 5 games
  - Setting to edit username

![Profile](image-1.png)

## 2. History

  - Displays games played by user
  - Ability to edit a game:
    - Date
    - Notes
    - Game Name
    - Total Score
    - Target Score Value
  - Option to delete a game

![History](image-2.png)

## 3. Train

  - Dashboard for navigating to different targets, with example pictures
  - Can start a quick game, where user can log hits or misses on a target

![Train](image-3.png)  

## 4. Games
  
  - Displays a list of game modes

  ## Games List
  ### Three Ring
  This 3-Ring Target Game Mode is perfect for those
  looking to refine their shooting precision. Concentrate on
  hitting the different rings to score points. This mode
  offers a great way to enhance your aim and enjoy the
  satisfaction of hitting your target. Are you up for the
  challenge? Give it a shot!
  ### 4-Ring
  Sharpen your shooting accuracy with the Four Ring Target
  Game Mode. Focus on hitting the smaller target areas to
  earn higher scores. Challenge yourself to aim for the
  center and achieve the elusive bullseye. Whether you're a
  beginner or a seasoned shooter, this mode offers an
  exciting test of your marksmanship skills.
  ### 5-Ring
  Experience the thrill of precision shooting with the
  5-Ring Target Game Mode. Test your accuracy and focus as
  you aim for the center of the target. Hit the bullseye to
  maximize your score. Perfect for both novice and expert
  marksmen, this mode will challenge your shooting skills
  and keep you coming back for more.
  ### Hits / Miss
  Record Hits/Misses on a target
  ### Trap
  Record your shooting scores for each round of trap
  shooting
  ### Bullseyes Only
  Record your shooting scores for bullseye hits only

![Games](image-4.png)  

## 5. About

  - Displays information about the application, its intended use, and some safety information
  - Author contact information, links to GitHub and LinkedIn

![About](image-5.png)

## 6. Light / Dark Mode

  - Switch in the bottom left corner toggles between light and dark mode

## 7. Mobile View

  - It was a stretch goal of mine to be able to have a mobile view for this application

<img src="image-7.png" alt="Quick Round mobile view" width="300" height="550">

<img src="image-8.png" alt="Trap mobile view" width="300" height="550">

<img src="image-9.png" alt="Bullseye only game view" width="300" height="550">


## Getting Started

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

### Installing

## Development Setup Instructions

- Create a database named 'your database name',
- The queries in the database.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries.
- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Deployment

**_ ( Adding additional notes about how to deploy this on a live system )_**

## Built With

- JavaScript
- React
- Node
- CSS
- Material UI
- animate.css
- SweetAlerts
- Javascript

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Emerging Digital Academy, for teaching me the skills to create this project
- Thank you to https://css-generators.com/starburst-shape/ for the CSS generator and assisting with creating the animations in the Results component of this project

## Dependencies

- Material UI
- Material UI x-charts
- Sweet Alerts
- A full list of dependencies can be found in `package.json`
