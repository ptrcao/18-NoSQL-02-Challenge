# Project Name: Social Network API

GitHub URL:
> https://github.com/ptrcao/18-NoSQL-02-Challenge.git

Video demo URL:
> 

## Project Description
This project is an API for a social network web application that allows users to share their thoughts, react to friends' thoughts, and create a friend list. The application uses Express.js for routing, a MongoDB database, and the Mongoose ODM.

## Installation
To use this application, you will need Node.js and MongoDB installed on your computer.

Clone the repository to your local machine:

```
git clone https://github.com/ptrcao/18-NoSQL-02-Challenge.git
```

Install dependencies:
```
npm install
```
Start the application:

```
npm start
```

## Usage
This API has the following routes:

`/api/users`

GET all users
GET a single user by its `_id` and populated thought and friend data
POST a new user
PUT to update a user by its `_id`
DELETE to remove user by its `_id`

`/api/users/:userId/friends/:friendid`

POST to add a new friend to a user's friend list
DELETE to remove a friend from a user's friend list

`/api/thoughts`

GET to get all thoughts
GET to get a single thought by its `_id`
POST to create a new thought (pushes the created thought's `_id` to the associated user's thoughts array field)
PUT to update a thought by its `_id`
DELETE to remove a thought by its `_id`

`/api/thoughts/:thoughtid/reactions`

POST to create a reaction stored in a single thought's reactions array field
DELETE to pull and remove a reaction by the reaction's `reactionid` value

To test these routes, use a tool like Insomnia.

## Technologies Used

* Express.js
* MongoDB
* Mongoose ODM
