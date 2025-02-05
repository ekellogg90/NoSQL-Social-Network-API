const { Thought, User } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            res.json(dbThoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found at this ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought at this ID' });
            }
            // const user = await User.findOneAndDelete(
            // { thoughts: req.params.thoughtId },
            // { $pull: { thoughts: req.params.thoughtId } },
            // { new: true }
            // );
            // if (!user) {
            //     return res.status(404).json({ message: 'No user found at this ID' });
            // }
            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        console.log('You are adding a Reaction');
        console.log(req.body);
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No Thought found at this ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeReaction(req, res) {
        try {
            console.log('This is the delete route reaction route');
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                // reactionId: new ObjectId( req.params.reactionId )
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No Thought found with this ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};