#!/usr/bin/env node
var es   = require('event-stream');
var util = require('util');

var stdin = process.openStdin();
stdin.setEncoding('utf8');

process.stdout.write('Name\tEmail\tOccupation\tCompany\tTwitter\tLinkedin\tAngel List\n');

stdin
  .pipe(es.split())
  .pipe(es.parse())
  .pipe(es.map(function (data, callback) {
    var name = data.rapportive.first_name + ' ' + data.rapportive.last_name;
    var email = data.email;

    // check for more than one, separate by semicolon
    var occupation = "";
    var company = "";
    
    var twitter = "";   //check for more than 1
    var linkedin = ""; 
    var angellist = ""; 

    callback(null, util.format('%s\t%s\t%s\t%s\t%s\t%s\t%s\n', name, email, occupation, company, twitter, linkedin, angellist));
  }))
  .pipe(process.stdout);
