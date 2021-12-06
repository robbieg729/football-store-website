## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Setup](#setup)
4. [Interaction](#interaction)

## General Info
***
This project is a single page web application, which allows users to shop for second-hand football gear, and list their own items if they wish to. The app contains several pieces to it, including a navigation bar, a de facto home page, item lists, individual item information, seller lists, and individual seller information. The layout of the app is coded in a single HTML, which is linked to a CSS stylesheet, style.css. The different pieces of the app mentioned above all have their own HTML template, which is either visible or not depending on the current URL. The HTML file is also linked to an index.js file, and there is also an 'Images' folder in the same directory.
The client-side of the app is joined with server-side coding through the app.js file, using the Express package from Node JS. The app.js file has access to the items.json and sellers.json files, which hold data about items and sellers on the server. The server.js file codes the app to listen to the local server port 8090.
***

## Technologies
***
The technologies used in this project are:
* [Bootstrap](https://getbootstrap.com/): Version 5.0.0
* [jQuery](https://jquery.com/): Version 3.5.1
* [Node.js](https://nodejs.org/en/): Version 14.16.0 (including packages like Express, Jest, Multer, Supertest, and Nodemon)
***

## Setup
***
First, unzip the folder into an easily accessible file directory on your machine. If you do not have Node JS installed on your machine, then you should download it from https://nodejs.org/en/download/. Once Node JS is installed, open a Command Prompt and using the 'cd' command, go to the directory where the folder was unzipped. Then, type in the commands 'npm install', 'npm install express', 'npm install multer', 'npm install jest', 'npm install supertest', 'npm install nodemon' one after the other. You should notice a new folder has been created in the directory called 'node_modules'. Once this is done, type the command 'npm start' into the Command Prompt. Finally, open your browser and type in the search bar http://127.0.0.1:8090. You should now see the home page.
***

## Interaction
***
The app is fairly simple to use. All of the information display parts of the app contain links whose destination are fairly self explanatory. It is similar to using any other store website - click on items to see their information. There are 2 forms which can be navigated to that add data to the server. One is for adding an item, the other is for adding a seller. For some entries, the forms require a specific input format, which is labelled with placeholders. As it is a store, users will be expecting to be able to buy stuff, which it is not so clear how to do when using the website as there is no 'cart' or 'basket'. The idea is that users can contact the sellers of the item to arrange purchases.
***