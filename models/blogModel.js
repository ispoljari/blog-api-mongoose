"use strict";

const mongoose = require('mongoose');

// import the authors data model
const {Authors} = require('./authorsModel');


// schema for representing the  comments
const commentSchema = mongoose.Schema({content: 'string'});

// schema for representing blog posts with a subdocument that contains comments
const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'Authors'},
  comments: [commentSchema]
});

postSchema.pre('find', function(next) {
  this.populate('author');
  next();
})

postSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

postSchema.methods.serialize = function() {
  return {
    title: this.title,
    author: this.authorName,
    content: this.content
  }
}

const Post = mongoose.model('Blogposts', postSchema);
module.exports = {Post};