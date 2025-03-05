import User from '../models/userModel.js';

export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* new approach but not pure "update()" function;
   there is an update() function, but it's advisable to use other methods or functions */
export const updateUser = async (req, res) => {
    try {
        const result = await User.updateOne({ _id: req.params.id }, req.body);
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "No user was updated." });
        }

        res.json({ message: "User updated successfully." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
