var workouts = [
    {id:0 , title:"Introduction to Ionic", youtubeId:"CHRISTOPHE COENRAETS", time:"9:40am", youtubeThumbnail:"Ballroom A", description: "In this session, you'll learn how to build a native-like mobile application using the Ionic Framework, AngularJS, and Cordova."},
    {id:1 , title:"AngularJS in 50 Minutes", youtubeId:"LISA SMITH", time:"10:10am", youtubeThumbnail:"Ballroom B", description: "In this session, you'll learn everything you need to know to start building next-gen JavaScript applications using AngularJS."},
    {id:2 , title:"Contributing to Apache Cordova", youtubeId:"JOHN SMITH", time:"11:10am", youtubeThumbnail:"Ballroom A", description: "In this session, John will tell you all you need to know to start contributing to Apache Cordova and become an Open Source Rock Star."},
    {id:3 , title:"Mobile Performance Techniques", youtubeId:"JESSICA WONG", time:"3:10Pm", youtubeThumbnail:"Ballroom B", description: "In this session, you will learn performance techniques to speed up your mobile application."},
    {id:4 , title:"Building Modular Applications", youtubeId:"LAURA TAYLOR", time:"2:00pm", youtubeThumbnail:"Ballroom A", description: "Join Laura to learn different approaches to build modular JavaScript applications."}
];

exports.findAll = function (req, res, next) {
    res.send(workouts);
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(workouts[id]);
};
