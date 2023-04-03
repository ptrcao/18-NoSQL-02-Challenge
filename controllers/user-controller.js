const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res){
        User.find({new: true})
        .select('-__v')
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

},

getSingleUser(req, res){
    User.findOne({ _id: req.params.id })
    .select('-__v')
    .populate('friends')
    .populate('thoughts')
    .then( (dbUserData) => {
        if(!dbUserData){
            res.status(404).json({ message: 'No user found with this id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) =>{
        console.log(err);
        res.status(500).json(err);
    });
},

// create a new user
createUser(req, res){
    console.log(req.body)
    // User.create(req.body)
    // User.create({  }, {new: true})
    User.create(req.body)
    .then( (dbUserData) => {res.json(dbUserData)})
    .catch((err) =>{
        console.log(err);
        res.status(500).json(err);
    });
},





deleteUser(req, res){
    User.deleteOne({ _id: req.params.id }, {new: true})
    .then( (dbUserData) => {res.json(dbUserData)})
    .catch((err) =>{
        console.log(err);
        res.status(500).json(err);
    });  

    },

// // update a user
updateUser(req, res){
    User.findOneAndUpdate(
        { _id: req.params.id },
        {$set: req.body,},
        {new: true}
    )
    .then( (dbUserData) => {res.json(dbUserData)})
    .catch((err) =>{
        console.log(err);
        res.status(500).json(err);
    });  
},

// POST and DELETE
// friends
addFriend(req, res){
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendid } },
        {new: true}
    )
    .then( (dbUserData) => {
        if(!dbUserData){
            return res.status(404).json({ message: 'No user found with this id!'})
        }
        res.json(dbUserData)
    })
    .catch((err) =>{
        console.log(err);
        res.status(500).json(err);
    });  
},
// delete user (BONUS: and delete all owned thoughts)
// deleteFriend(req, res) {
//     User.deleteOne({ _id: req.params.friendid })
//       .then(result => {
//         if (result.deletedCount === 0) {
//           return res.status(404).json({ message: 'Friend not found' });
//         }

//         //  BONUS: delete all thoughts in the array of user's thoughts
//        return Thought.deleteMany({_id: {$in: dbUserData.thoughts }})
//         // res.json(result);
//       })
//       .then(() => res.json({message: 'User and all owned thoughts deleted!'}))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({ message: 'Failed to delete friend' });
//       });
//   }

deleteFriend(req, res){
    User.findOneAndUpdate({ _id: req.params.id}, { $pull: {friends: req.params.friendid}},{new:true})
    .then( (dbUserData) => {
        if(!dbUserData){
            return res.status(404).json({ message: 'No user found with this id!'})
        }
        res.json(dbUserData)
    })
    .catch((err) =>{
        console.log(err);
        res.status(500).json(err);
    })

}
}

module.exports = userController;