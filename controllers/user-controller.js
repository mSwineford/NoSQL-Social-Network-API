const {User} = require("../models");

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .select("-__v")
        .then(dbUserData => res,json(dbUserData))
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    },
    getUserById({params}, res) {
        User.findOne({_id: params.id})
        .populate({
            path: "thoughts",
            select: "-__v"
        })
        .select("-__v")
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    },
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: "Invalid User Id."});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            {$addToSet: {friends: params.friendsId}},
            {new: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: "Invalid User Id."});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            {$pull: {friends: params.friendsId}},
            {new: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: "Invalid User Id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
};

module.exports = userController;