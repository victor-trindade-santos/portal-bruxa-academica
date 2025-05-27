const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dmnfftrdh', 
    api_key: '322461967833241', 
    api_secret: '6PTVSB0C3-TD_OD5F07FvTgbedU' 
});

module.exports = cloudinary;
