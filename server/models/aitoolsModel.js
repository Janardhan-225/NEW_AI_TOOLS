const mongoose = require('mongoose');

const aitoolsSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        websiteUrl: {
            type: String,
            required: true
        },
        cost: {
            type: String,
            enum: ['Free', 'Freemium', 'Paid','Free Trial','Active deal'],
        },
        category: {  // Corrected typo from 'catogery' to 'category'
            type: String,
            required: true
        },
        aitoolImage: {
            type: String,
            required: true
        },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('AITool', aitoolsSchema);
