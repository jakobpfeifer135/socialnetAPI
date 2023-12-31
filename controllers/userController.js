
const User = require("../models/user");

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
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
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
      )
        if (!user) {
          return res.status(404).json({ message: "No user with that ID" });
        } else {
          res.json(user);
        }
      ;
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete(
        { _id: req.params.userId }
      )
        if (!user) {
          return res.status(404).json({ message: "No user with that ID" });
        } else {
          res.json(user);
        }
      ;
    } catch (err) {
      res.status(500).json(err);
    }
  },
    addFriend({params},res){
    User.findOneAndUpdate(
        {_id:params.userId},
        {$push:{friends:params.friendId}},
        {runValidators:true,new:true}
    ).then((user) => {
        !user ? res.status(404).json({ message:"No user found with that id" })
        :res.json(user)
    }).catch((error) => res.status(500).json(error)
    )
  },
  deleteFriend({params},res){
    User.findOneAndUpdate(
        {_id:params.userId},
        {$pull:{friends:params.friendId}},
        {runValidators:true,new:true}
    ).then((user) => {
        !user ? res.status(404).json({ message:"No user found with that id" })
        :res.json(user)
    }).catch((error) => res.status(500).json(error)
    )
  }
};
