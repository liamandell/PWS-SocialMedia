const{
    User,Thought
    
} = require('../models');
const thoughtController = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find();
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // get thought by id
    async getThoughtById({ params }, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: params.id });
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // create thought
    async createThought({ params, body }, res) {
        try {
            const thoughtData = await Thought.create(body);
            const userData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
            );
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // update thought
    async updateThought({ params, body }, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true });
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // delete thought
    async deleteThought({ params }, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({ _id: params.id });
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async addReaction({ params, body }, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            );
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async deleteReaction({ params }, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true }
            );
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
};
module.exports = thoughtController;