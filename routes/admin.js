var express = require("express");
var mustache = require('mustache');

var events = require("../lib/events");
var templates = require("../lib/templates");
const settings = require("../config");

var app = express();
app.get("/admin/log",function(req,res) {
    var context = {};
    context.sessionuser = req.session.user;
    events.get().then(function(events) {
        context.events = events;
        res.send(mustache.render(templates.events,context,templates.partials));
    }).catch(function(err) {
        console.log(err);
        context.err = err;
        context.events = [];
        res.send(mustache.render(templates.events,context,templates.partials));
    });
});



app.get("/admin/node/delete",function(req,res) {
    var context = {};
    context.sessionuser = req.session.user;
    console.log(context.sessionuser)
    if (context.sessionuser){
        //TODO if user is in admins, send the delete page
        res.send(mustache.render(templates.events,context,templates.partials));
    } else{
        // otherwise 403
        res.status(403).send()
    }
});

module.exports = app;
