function HostMyEventsController ($state, $http, SERVER, $cookies, $location, $rootScope) {

  // Sets up this as vm.
  let vm = this;
  // Sets up variables
  vm.events = [];
  // Adds the function to the vm object
  vm.deleteEvent = deleteEvent;
  vm.eventDetails = eventDetails;
  vm.formatDate = formatDate;
  vm.getTime = getTime;
  vm.hideHost = hideHost;
  vm.rsvp = [];

  init();

	function init() {
			let token = $cookies.get('access_token');
			let config = {
				headers: { 'Authorization': `Bearer ${token}` }
			};
			$http.get(SERVER.URL + 'my-events', config).then((res) => {
        eventRSVPCount(res.data);
				vm.events = res.data;
			});


	}

  function formatDate(d){
    //Formats UTC Date into mm/dd/yyyy format
    let date = new Date(d)
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    if(dd<10){dd='0'+dd}
    if(mm<10){mm='0'+mm};
    return d = mm+'/'+dd+'/'+yyyy;
  }

  function getTime(timeInfo){
    //Formats UTCTime into hh:mm A.M./P.M. format
    let time = new Date(timeInfo);
    let UTCHoursVal = time.getUTCHours() - 1;
    var hours = UTCHoursVal;
    let UTCMinutesVal = time.getUTCMinutes();
    var minutes;
    var aa;
    if (UTCHoursVal === 4) {
        hours = 12;
        aa = "A.M.";
    } else if (UTCHoursVal < 4 && UTCHoursVal>= 0){
      hours = UTCHoursVal-4+12;
      aa = "P.M.";
    } else if (UTCHoursVal<16 && UTCHoursVal>=4){
      hours = UTCHoursVal-4;
      aa= "A.M.";
    } else if (UTCHoursVal===16){
      hours = 12;
      aa= "P.M.";
    } else if (UTCHoursVal<24 && UTCHoursVal >= 16) {
      hours = UTCHoursVal-4-12;
      aa="P.M.";
    };


    if(UTCMinutesVal < 10){
      minutes = "0" + UTCMinutesVal;
    } else {
      minutes = UTCMinutesVal;
    }
    return hours + ":"+minutes + " " + aa;
  }


    function eventRSVPCount(rsvpInfo) {
        // forEaches through the EventGuest info and counts the
        // RSVP status of each EventGuest and a total invite count.
        rsvpInfo.forEach(function(outerData, i) {
          if (outerData.event_guest != null){
            outerData.rsvp = {
             yes: 0,
             no: 0,
             maybe: 0,
             not_responded: 0,
             invites: 0
            };
            outerData.event_guest.forEach(function(innerData, j){
                if (innerData.rsvp === "Yes") {
                    outerData.rsvp.yes++;
                    outerData.rsvp.invites++;
                } else if (innerData.rsvp === "No") {
                    outerData.rsvp.no++;
                    outerData.rsvp.invites++;
                } else if (innerData.rsvp === "Maybe") {
                    outerData.rsvp.maybe++;
                    outerData.rsvp.invites++;
                } else if (innerData.rsvp === "Not responded") {
                    outerData.rsvp.not_responded++;
                    outerData.rsvp.invites++;
                }
              });
            } else {
              outerData.rsvp = {
               yes: 0,
               no: 0,
               maybe: 0,
               not_responded: 0,
               invites: 0
              };
            }
            return outerData;
        });
    }

  function deleteEvent(eventID) {
    var result = confirm("Confirm delete of this event?");
      if (result) {
        let token = $cookies.get('access_token');
  			let config = {
  				headers: { 'Authorization': `Bearer ${token}` }
  			};
  			$http.delete(SERVER.URL + 'host/my-events/' + eventID, config).then((res) => {
          $state.reload('root.host.myEvents');
  			});
      }
  }

  function eventDetails(eventID) {
    $location.url('host/my-events/' + eventID);
    vm.hideHost();
  }

  function hideHost(){
    console.log('hello')
    $rootScope.$broadcast('hideHost');
  }

}

HostMyEventsController.$inject = ['$state', '$http', 'SERVER', '$cookies', '$location', '$rootScope'];
export { HostMyEventsController };
