const user = {
    "username": "hy",
    "admin": false,
    "avater": "https://smart.jpg",
    "description": "A handsome boy",
    "friends": [User.ObjectId],
    "posts" : [Post.ObjectId]
}

const post = {
    "title": "Iloveyou",
    "description": "you are my world",
    "by": User.ObjectId,
    "likedBy": [User.ObjectId],
    "image": "https://myheart.jpg",
    "tags": ["mylove", "baby"],
}

const comment = {
    "post": Post.ObjectId,
    "user": User.ObjectId,
    "content": "I love you",
    "comments": [Comment.ObjectId]
}

const chat = {
    "user": User.ObjectId,
    "friend": User.ObjectId,
    "messages": [Message.ObjectId],
    "direction": "to"
}

const message_1 = {
    "content": "Can you see my love?",
    "timeStamp": "123"
}
const message_2 = {
    "image": "https://myheart.jpg",
    "timeStamp": "223"
}

// chat:{
//     user->[friends]
//     user, friend -> [messages]
// }