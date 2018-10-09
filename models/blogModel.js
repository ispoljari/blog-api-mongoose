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

// add middleware before find() 

postSchema.pre('find', function(next) {
  this.populate('author');
  next();
});

// create a virtual property with the authors full name

postSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

// create instance methods which filter return data

postSchema.methods.serializeAll = function() {
  return {
    title: this.title,
    author: this.authorName,
    content: this.content
  }
}

postSchema.methods.serializeOne = function() {
  return {
    title: this.title,
    author: this.authorName,
    content: this.content,
    comments: this.comments
  }
}

const Post = mongoose.model('Blogposts', postSchema);
module.exports = {Post};