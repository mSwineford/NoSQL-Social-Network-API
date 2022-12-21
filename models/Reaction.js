const { Schema, model, Types } = require("mongoose");
// add date format here

const reactionSchema = new Schema (
    {
        ractionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String, 
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    }
);

module.exports = reactionSchema;