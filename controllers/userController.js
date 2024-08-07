const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found at this ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No such User exists' });
            }

            // const user = await User.findOneAndDelete(
            // { users: req.params.userId },
            // { $pull: { users: req.params.userId } },
            // { new: true }
            // );
            // if (!user) {
            //     return res.status(404).json({ message: 'No user found at this ID' });
            // }
            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found at this ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            console.log(req);
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                // { $pull: { friends: { friendId: req.params.friendId } } },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found at this ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};