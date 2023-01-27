import axios from "axios";
//const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://flashlive-sports.p.rapidapi.com/v1/events/list',
  params: {locale: 'en_INT', sport_id: '16', timezone: '-4', indent_days: '2'},
  headers: {
    'X-RapidAPI-Key': 'SECRET',
    'X-RapidAPI-Host': 'flashlive-sports.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	//console.log(response.data['DATA'][0]['NAME_PART_2']);
  for (let i = 0; i <= response.data['DATA'].length; i = i + 1) {
    //console.log(response.data['DATA'][i]['EVENTS'][0]['HOME_PARTICIPANT_NAME_ONE']);
    //fight divs
    var div = document.createElement('div');
    div.classList.add("fight-div");
    var divHeading = document.createElement('p');
    divHeading.classList.add("div-heading");
    divHeading.innerHTML = response.data['DATA'][i]['NAME_PART_2'];

    var homeFighterName = document.createElement('p');
    homeFighterName.classList.add("home-fighter-name");
    homeFighterName.innerHTML = response.data['DATA'][i]['EVENTS'][0]['HOME_PARTICIPANT_NAME_ONE'];

    var awayFighterName = document.createElement('p');
    awayFighterName.classList.add("away-fighter-name");
    awayFighterName.innerHTML = response.data['DATA'][i]['EVENTS'][0]['AWAY_PARTICIPANT_NAME_ONE'];

    var timeBox = document.createElement('div');
    timeBox.classList.add("time-box");
    timeBox.innerHTML = ((new Date((response.data['DATA'][i]['EVENTS'][0]['START_TIME']) * 1000)).getHours()) + ':' + ((new Date((response.data['DATA'][i]['EVENTS'][0]['START_TIME']) * 1000)).getMinutes());

    div.appendChild(divHeading);
    div.appendChild(timeBox);
    div.appendChild(homeFighterName);
    div.appendChild(awayFighterName);
  }
}).catch(function (error) {
	console.error(error);
});


//var mainDiv = document.querySelector("#maindiv");

//for loop for number of fights
//homeFighterName = response.data['DATA'][i]['EVENTS'][0]['HOME_PARTICIPANT_NAME_ONE'];
/*let awayFighterName = response.data['DATA'][i]['EVENTS'][0]['AWAY_PARTICIPANT_NAME_ONE'];
let divisionName = response.data['DATA'][i][NAME_PART_2];
let fightTime = response.data['DATA'][i]['EVENTS'][0]['START_TIME'];*/

//datas = Object.values(response.data);
//console.log(homeFighterName);
