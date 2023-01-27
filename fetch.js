const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'SECRET',
		'X-RapidAPI-Host': 'flashlive-sports.p.rapidapi.com'
	}
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


$(function () {
  $("#datePicker").datepicker({
      onSelect: function (date, datepicker) {
          if (date != "") {
              alert("Selected Date: " + date);
              var userInputtedDate = date;
              console.log(userInputtedDate);
              var today = new Date();
              var dd = String(today.getDate()).padStart(2, '0');
              var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
              var yyyy = today.getFullYear();

              today = mm + '/' + dd + '/' + yyyy;
              console.log(today);

              var diffInDays = moment(date).diff(moment(today), 'days');
              console.log(diffInDays);

              url = 'https://flashlive-sports.p.rapidapi.com/v1/events/list?locale=en_INT&sport_id=16&timezone=-4&indent_days=' + diffInDays.toString();
              async function getResponse() {
                const response = await fetch(url, options)
                if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                //console.log(data);
                //console.log(data['DATA']);
                return data;
              }

              getResponse().then(data => {
                //console.log(data);
              
                for (let g = 0; g < data['DATA'].length; g++) {
                  for (let i = 0; i < data['DATA'][g]['EVENTS'].length; i++) {
                  
                    var homeFighterPictureData = data['DATA'][g]['EVENTS'][i]['HOME_IMAGES'][0];
                    var awayFighterPictureData = data['DATA'][g]['EVENTS'][i]['AWAY_IMAGES'][0];
                    
                
                    var div = document.createElement("div");
                    div.classList.add("fightdiv");
                    document.body.appendChild(div);
                
                    var LeagueName = document.createElement("div");
                    LeagueName.classList.add("LeagueName");
                    div.appendChild(LeagueName);
                
                    var timeBox = document.createElement("div");
                    timeBox.classList.add("timeBox");
                    div.appendChild(timeBox);
                
                    var fighterBox = document.createElement("div");
                    fighterBox.classList.add("fighterBox");
                    div.appendChild(fighterBox);
                
                    var names = document.createElement("div");
                    names.classList.add("nameBox");
                    div.appendChild(names);
                    
                    var homeFighterName = document.createElement("span");
                    homeFighterName.classList.add("homeFighterName");
                    names.appendChild(homeFighterName);
                
                    var awayFighterName = document.createElement("span");
                    awayFighterName.classList.add("awayFighterName");
                    names.appendChild(awayFighterName);
                
                    var homeFighterPicture = document.createElement("img");
                    homeFighterPicture.src = homeFighterPictureData;
                    homeFighterPicture.classList.add("homeFighterPicture");
                    fighterBox.appendChild(homeFighterPicture);
                
                    var awayFighterPicture = document.createElement("img");
                    awayFighterPicture.src = awayFighterPictureData;
                    awayFighterPicture.classList.add("awayFighterPicture");
                    fighterBox.appendChild(awayFighterPicture);
                
                    
                    
                
                    LeagueName.innerHTML = data['DATA'][g]['NAME_PART_2'];
                    homeFighterName.innerHTML = data['DATA'][g]['EVENTS'][i]['HOME_PARTICIPANT_NAME_ONE'];
                    awayFighterName.innerHTML = data['DATA'][g]['EVENTS'][i]['AWAY_PARTICIPANT_NAME_ONE'];
                    timeBox.innerHTML = ("Date: " + new Date((data['DATA'][g]['EVENTS'][i]['START_TIME']) * 1000));
                
                    
                  }
              
              
                }
              
              });
          }
      }
  });
});
