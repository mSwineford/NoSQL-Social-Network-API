const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createATVal => dateFormat(timeStamp)
        },
        username: {
            type: String,
            require: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        },
    }
);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});
const Thoughts = model("Thoughts", thoughtSchema);
module.exports = Thoughts;