# Attryb.com
  
## Objective:
The objective of this website is to provide a user-friendly platform for individuals to buy and sell their old cars easily and efficiently.

## Description:

Welcome to our website! We provide a platform for users to buy and sell old cars. With our user-friendly interface, you can easily navigate through features such as login, signup, adding cars for sale, and searching for your desired vehicle. Whether you're looking to sell your old car or find a new set of wheels, our website offers a convenient and efficient way to connect buyers and sellers. Join our community today and experience the convenience of buying and selling cars online.


## Some Snapshots of the UI

# Signup-Page
![Screenshot (141)](https://github.com/kshivang80/Attryb-Car-app/assets/103144321/6276a3fd-f65e-46dc-aa76-57e3e166159f)


# Login-Page
![Screenshot (144)](https://github.com/kshivang80/Attryb-Car-app/assets/103144321/7e2daefc-ce8d-4b25-b6b3-f65bad8f5545)


# Home-Page
![Screenshot (139)](https://github.com/kshivang80/Attryb-Car-app/assets/103144321/3d0b44d8-6144-4034-bb0d-db32bb36264c)

# Add-Your-Cars
![Screenshot (140)](https://github.com/kshivang80/Attryb-Car-app/assets/103144321/c8c384ac-ce8b-47d5-8791-0980db9ac51b)

# Search-Page
![Screenshot (143)](https://github.com/kshivang80/Attryb-Car-app/assets/103144321/85283535-34a3-402b-87b5-645a73be4543)



## Tech Stacks:
    
    1) Front-end:
        * React (HTML5, JS, CSS3)
        * Redux (React-redux, redux-thunk)
        * Chakra Ui
        * External CSS Libraries (Styled-Components, framer-motion)
        
    2) Back-end:
        * Node
        * Express
        * Mongoose (server-databse)
        * www.cyclic.sh (To Deploy Server)

    3) DataBase:
        * MongoDB (MongoDB Atlas)
        
## Dependencies:

### Front-end

    1) react
    2) react-dom
    3) react-scripts
    4) styled-components
    5) react-router-dom
    6) react-icons
    7) chakra ui realated libararies including chakra icons
    8) react-slick
    9) axios
    10) redux, redux thunk, react-redux
    11) chartJS
    
   ### Backend

    1) express
    2) cors
    3) dotenv
    4) mongoose
    5) nodemon
    6) bcrypt
    7) jsonwebtoken

    
  
## Setting Up Project in local

### Frontend

#### 1) Setting up node environment

    1) navigate to Front-end directory
    2) use node version 16 or higher. version 18 is recommended
    3) run command npm install

#### 2) Starting frontend on localhost
(make sure you are confirming url of server)

    npm start /*or*/ npm run start

#### 3) Making Production ready folder

    npm run build
    
### Server

#### 1) Setting up node environment

    1) navigate to Back-end directory
    2) use node version 16 or higher. version 18 is recommended
    3) run command npm install


#### 1) Starting Server in deployment

    npm start

#### 1) Starting Server with nodemon on locahost

    npm run server

### Database: MongoDB

#### 1) Atlas

    in .env file provide MONGODB_URL with proper credentials

#### 2) Local database

    if MONGODB_URL not declared in .env, by default it will connect to local data base

    in case not working try changing MONGODB_URL in Back-end/config/db.js






