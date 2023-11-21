const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
   
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },

        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
        ],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]

    
  },
{
    
    toJSON: {
        virtuals: true,
        getters:true
    },
    id: false,
  }
);


userSchema
    .virtual("friendCount")
    // Getter
    .get(function () {
        return this.friends.length
    })
    

// Initialize our User model
const User = model("User", userSchema);

module.exports = User;
