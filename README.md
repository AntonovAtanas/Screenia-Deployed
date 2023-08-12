# Screenia - Watch The Best Movies

Welcome to Screenia, your ultimate destination for discovering and exploring a vast collection of movies and TV series. MovieFlix is a dynamic and user-friendly movie catalog website developed using Angular, designed to provide users with a seamless and engaging movie browsing experience.

# Demo:
https://screenia.netlify.app/

# Deployment

- **Frontend** - The frontend is deployed on [Netlify](https://www.netlify.com/)
- **Backend** - The RESTful backend server is deployed on [Render](https://render.com/)
- **Database** - The MongoDB database is stored on the MongoDB [Atlas](https://cloud.mongodb.com) cloud.


# Technologies Used
- **Angular**: The frontend of Screenia is developed using the Angular framework, enabling dynamic, single-page application behavior.
- **TypeScript**: Angular applications are built using TypeScript for improved code structure and maintainability.
- **HTML and CSS**: The website's structure and styling are implemented using HTML5 and CSS3.
- **RESTful API**: I created a custom RESTful API server using Node.js, Express.js, MongoDB with Mongoose, Bcrypt and JsonWebtoken to handle server-side functionalities and backend operations.
- **Other**: Implemented Angular Animations, Moment.js library, SVG icons

# Purpose
Screenia was created with the aim of connecting movie enthusiasts with their favorite films and helping them discover new interesting movies. Our platform allows users to search, add, explore movies, access detailed information about each film, writing reviews to each movie and even discuss every movie with other people.

# Key Features

- **Home Page**: The home page is accessible for both logged and guest users. It shows:
     - The top movie - the movie with the highest review. If there are multiple movies with the same review rating, the secondary criteria is the most liked movie.
     - The 3 latest added movies
     - The 6 most liked movies
     - The 3 latest posts from the forum
- **User Authentication**: You can register an account or log in to access additional features like add movies, add post, comment post, like a movie and leaving reviews.
- **Search Movie**: Easily search movies by title. Accessible for both logged and guest users.
- **All Movies**: Shows all movies which are added so far, sorted by the oldest first. Accessible for both logged and guest users.
- **Movie Details Page**: Accessible for all users. This page shows a detail page for an exact movie.
     - Movie details: Shows movie title, year, director and description.
     - Movie rating: Shows movie rating left by the users from 1 to 5. Only logged in users and not owners of the added movie can leave a review.
     - Movie likes: Shows total movie likes by the users. Only logged in users and not owners of the added movie can like a movie.
     - Edit Movie: Only the owner of the added movie can edit it.
     - Delete Movie: Only the owner of the movie can delete it.
- **Add Movie**: Only logged in users can add a movie. The add movie form requires the user to provide title, year, director, description and a image link to the movie poster image.
- **User Profile**: Accessible only for logged in users. The user profile page shows the movies which the user has liked.
- **Forum**: Accessible for all users. It shows all posts added by the users.
     - Only logged in users can add a new post.
     - Only logged in can open the post page.
     - Only logged in users can add a comment to a post.
       
# App architecture

# App Module
In Angular this is the entry point and central configuration for the application. It declares components, imports modules, and provides services.

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/fe55b55d-ff4e-4ab6-adb4-f031039e5bc8)

# App Routing Module
The app routing module uses lazy loading for loading the User Module, Movie Module and Forum Module. It also loads the Home Component and custom created 404 page when no route has been matched.

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/f3e1dcd6-29c9-490b-bf48-cd2c961b6f5a)

# Home Module
The home module contains multiple components which receive data from the API and then renders them to the home page.

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/d6b75d55-a8a6-4681-a905-6823827d677b)

# User Module
The User Module contains components which are related to user authentication (register and login) and component for the user profile page.

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/8696f6e7-a005-4b51-baf0-3af234b63aaa)

# Movies Module
The movies contains every component which is related to movies.

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/c2e9054a-e021-4d44-aba2-30f415470c14)

# Forum Module
The Forum Module contains components which are related to the forum.

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/244e6388-12a9-4518-adf7-a6ce4b7aa248)

# Shared Module
The Shared Module includes components that are shared across the application.

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/f59f5060-b8c7-418a-b1fb-7fca88af4758)

# Screenshots

# Home Page

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/6414eab8-1206-4cf0-ad42-4c4131862129)

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/e8db02f1-59e8-4295-847f-a03251c25fec)

# All movies

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/b1e98370-4e11-4994-81a0-b11df993216e)

# Add a movie

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/6dfa96a9-144a-4074-8a96-88c67419649e)

# Movie details page

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/f30e3897-db20-444f-8b1b-3b1f69629b06)

# Leave a review

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/5da2c7f8-39c5-4f87-a151-c6efe923ae43)

# Forum Page

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/1b87fa3b-4828-4af2-a898-bcbb64eb1eee)

# Forum post details page

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/ee239800-cf37-4e27-8c9a-7c37f80ef611)

# Forum add post 

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/5f276540-2cd7-4ff8-b436-5cf9860d008b)

# User profile page

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/6de04e6c-6725-4b15-97e5-1c1bae177d64)

# User register page + validation view

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/e609bdd3-ee29-4630-af6b-e62d9c5b4ad7)

# User login page

![image](https://github.com/AntonovAtanas/Screenia---Movie-Website/assets/114076833/6342bdba-d0f1-4fcd-99fa-2fe9e46252c9)
