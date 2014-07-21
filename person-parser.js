#!/usr/bin/env node
var es   = require('event-stream');
var util = require('util');

var stdin = process.openStdin();
stdin.setEncoding('utf8');

process.stdout.write('Name\tEmail\tOccupation\tCompany\tTwitter\tLinkedin\tAngel List\n');

stdin
  // .pipe(es.split())
  .pipe(es.parse())
  .pipe(es.map(function (data, callback) {
    var name = data.rapportive.first_name + ' ' + data.rapportive.last_name;
    var email = data.email;

    var occupation = '';
    var company = '';

    // if (data.rapportive.occupations.length > 1) {
    for(var i=0;i<data.rapportive.occupations.length;i++) {
      occupation = occupation + data.rapportive.occupations[i].job_title + ';';
      company = company + data.rapportive.occupations[i].company + ';';
    }
    // } else {
    //   occupation = data.rapportive.occupations.job_title;
    //   company = data.rapportive.occupations.company;
    // }

    var twitter = ''; 
    var linkedin = ''; 
    var angellist = ''; 

    if (data.rapportive.memberships.length > 0) {
      for(var i=0;i<data.rapportive.memberships.length;i++) { 
        if (data.rapportive.memberships[i].icon_name === 'linkedin'){
          linkedin = linkedin + data.rapportive.memberships[i].profile_url + ';';
        }
        if (data.rapportive.memberships[i].icon_name === 'twitter'){
          twitter = twitter + data.rapportive.memberships[i].profile_url + ';';
        }
        if (data.rapportive.memberships[i].icon_name === 'angellist'){
          angellist = angellist + data.rapportive.memberships[i].profile_url + ';'; 
        }
      }
    }
    callback(null, util.format('%s\t%s\t%s\t%s\t%s\t%s\t%s\n', name, email, occupation, company, twitter, linkedin, angellist));
  }))
  .pipe(process.stdout);
