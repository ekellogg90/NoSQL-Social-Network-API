const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email"
            },
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
    ],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
    },
    {
    toJSON: {
        virtuals: true,
    },
    }
);

userSchema
.virtual('friendCount')
.get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;