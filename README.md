# Duetto 

## Duetto is an app designed to connect music teachers and music students, using a swiping interface, communicating, booking classes and performing payments. It was created as the final project to my Full-Stack WebDeveloper Bootcamp at WBS Coding School (done in the month of August 2022).

## Front-end Tooling:
- React
- TailwindCSS for the UI Library
- Stripe for payments
- Pusher for communication
- React day-time-picker for scheduling

## Back-end Tooling:
- NodeJs
- Express for the Node web framework
- Bcrypt / JWT for the authentication/authorization flow
- MongoDB as database
- Mongoose as ODM 

##Backend server repository:

https://github.com/danilobml/duetto-backend

## Live version:

https://duetto.netlify.app

*Instructions to check functionalities: 

1. first login with a "teacher" user, Trina - username: trina@gmail.com ; password: trina;
2. Swipe right or click on the green button on the "student" Dan to "like" him;
3. On the main screen, click on the user profile (pictire on the upper-left corner). Select logout;
4. Login with the "student" user, Dan - username: dan@gmail.com ; password: dan;
5. Swipe right or click on the green button on the "teacher" Trina to "like" her;
6. After the match, click on "check availabilities".
7. Choose a date/time
8. At the payment screen, type the test card number given by Stripe:  4242 4242 4242 4242
Use a valid future date, such as 12/34.
Use any three-digit CVC
9. Go back to main (click on logo, or "Match" on the menu), and check the other screen accessible by the menu options. 


