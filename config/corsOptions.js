// const allowedOrigins = require('./allowedOrigins');

// Remove !origin when to develop
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };

module.exports = corsOpts;