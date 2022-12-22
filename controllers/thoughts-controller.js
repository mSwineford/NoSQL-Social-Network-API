const { Thoughts, User } = require("../models");

const thoughtsController = {
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({path: "thoughts"})
        .sort({_id: -1})
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => { res.status(400).json(err) });
    },
    getThoughtById({ params }, res) {
        Thoughts.findOne({_id: params.thoughtId })
        .populate({path: "thoughts"})
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "Cannot find thoughts with whis id."});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
    createThought ({params, body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            console.log(_id);
            return User.findByIdAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id }},
                { new: true }
            );
        })
        .then((dbThoughtData) => {
            console.log(dbThoughtData);
            if (!dbThoughtData) {
                res.status(404).json({message: "Cannot find thoughts whith this id"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },
    updateThought({ params, body }, res) {
        console.log(params.thoughtId);
        console.log(body);
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, body, {
            new: true,
            runValitators: true
        })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({message: "Cannot find any thoughts with this id"});
                return;
            }
        })
        .catch(err => res.json(err));
    },
    deleteThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "Cannot find any thoughts with this id" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    createReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { reactions: body } },
            { new: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: "Cannot find any thoughts with this id" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    deleteReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch( err => res.json(err));
    },
};

module.exports = thoughtsController;