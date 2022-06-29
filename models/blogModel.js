const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    bannerImage : {
        type : String,
    },
    author : {
        type: String
    },
    date : {
        type : String
    },
    title: {
        type : String,
        required : true
    },
    mainDesc : {
        type : String,
        required : true
    },

    contentImages : [
        {
            type : String,
        }
    ],
    content : [
        {
        title : {
            type : String
        },
        description : [
            {
                type : String
            }
        ]
    }],
    categories :[
        {
            type: String
        }
    ],
    quotes : [
        {
            type : String,
        },
    ],
    metaDesc : [
        {
            type: String
        }
    ],
    keywords : [
        {
            type :String
        }
    ],
}, { timestamps: true })

module.exports = mongoose.model('blogData',blogSchema);

