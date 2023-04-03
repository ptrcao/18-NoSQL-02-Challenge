const {Thought, User} = require('../models')

const thoughtController = {
// create, update, and delete users and thoughts
// POST, PUT, and DELETE routes
getThoughts(req, res){
    Thought.find()
    .sort({createdAt: -1})
    .then(dbThoughtData => res.json(dbThoughtData))
.catch((err) => {console.log(err)
res.status(500).json(err);
})
},
// POST and DELETE
// reactions

getSingleThought(req, res){
    Thought.findOne({ _id: req.params.thoughtid})
    .then(dbThoughtData => {
        if(!dbThoughtData){
            res.status(404).json({message: 'No thought found with this id!'});
            return;
        }
        res.json(dbThoughtData);
    }
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err)
})
},

createThought(req, res){
    Thought.create(req.body)
    .then( (dbThoughtData) =>
    {   console.log('dbThoughtData: ', dbThoughtData)
        return User.findOneAndUpdate(
        { _id: req.body.userid },
        { $push: { thoughts: dbThoughtData._id} }
        )
    })
    .then( dbUserData => {
        if(!dbUserData){
            return res.status(404).json({ message: 'Thought created but no user with this id!'})
        }
        res.json({ message: 'Thought successfully created!' });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},


updateThought(req,res){

Thought.findOneAndUpdate({ _id: req.params.thoughtid}, {$set: req.body}, {runValidators:true, new: true})
.then( (dbThoughtData) => {
    if(!dbThoughtData){
        return res.status(404).json({ message: 'No thought found with this id!'})
    }
    res.json(dbThoughtData);
    })
.catch((err) => {
    console.log(err);
    res.status(500).json(err);
});

},

// delete thought
deleteThought(req, res){
    Thought.findOneAndRemove( { _id: req.params.thoughtid })
    .then( (dbThoughtData) => {
        if(!dbThoughtData){
            return res.status(404).json({ message: 'No thought found with this id!'})
        }
        // remove the thought from the user's thoughts array
        return User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { thoughts: req.params.thoughtid } }
        );
    })
    .then( dbUserData => {
        if(!dbUserData){
            return res.status(404).json({ message: 'Thought deleted by no user with this id!'})
        }
        res.json({ message: 'Thought successfully deleted!' });
    }).
    catch((err)=> {
        console.log(err);
        res.status(500).json(err);
    });
},

// add a reaction to a thought

addReaction(req, res){
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtid },
        { $addToSet: { reactions: req.body }},
        { runValidators: true, new: true }
    )
    .then( (dbThoughtData) => {
        if(!dbThoughtData){
            return res.status(404).json({ message: 'No thought found with this id!'})
        }
        res.json(dbThoughtData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},

removeReaction(req, res) {
    console.log(req.params)
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtid },
        { $pull: { reactions: { reactionId: req.params.reactionid } } },
        { runValidators: true, new: true }
    )
    .then( (dbThoughtData) => {
        if(!dbThoughtData){
            return res.status(404).json({ message: 'No thought found with this id!'})
        }
        res.json(dbThoughtData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},
};

module.exports = thoughtController;