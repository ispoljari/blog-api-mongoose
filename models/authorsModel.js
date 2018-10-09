"use strict";

const mongoose = require('mongoose');

// schema for representing the authors
const authorsSchema = mongoose.Schema({
  firstName: 'string',
  lastName: 'string',
  userName: {
    type: 'string',
    unique: true
  } 
});

const Authors = mongoose.model('Authors', authorsSchema);

module.exports = {Authors};
