function EventGuestController ($state, $http, SERVER, $stateParams) {

  // Sets up this as vm.
	let vm = this;
	// Sets up variables

	// Adds the function to the vm object
  vm.submitRSVP = submitRSVP;


  init();

  function init() {
	    // var eventID = $stateParams.id;

	    // $http.get(SERVER.URL + '/event-guest/rsvp/:uuid').then((res) => {
	    //     // vm.event = res.data;
      //     console.log(res);
	    // });
	}

  function submitRSVP(egInfo, guestInfo){
    let uuid = $stateParams.uuid
    let payload = {
    			egInfo: egInfo,
    			guestInfo: guestInfo
    			}

    $http.post(SERVER.URL + 'event-guest/rsvp/' + uuid, payload).then(function (res) {
            if (res.status == 200) {
                alert("200 OK");
                // Guest needs to go somewhere after submitting RSVP. "Thanks for RSVPing!"
            } else if (res.status == 201) {
                alert("201 OK");
                // Guest needs to go somewhere after submitting RSVP. "Thanks for RSVPing!"
            } else {
              console.log(res);
            }
        },
        function (res) {
            if (res.status == 401) {
                alert("401 ERROR!!!!!");
            } else if (res.status == 403) {
                alert("403 Forbidden");
            } else {
              console.log(res);
            }

        });
  }

}

EventGuestController.$inject = ['$state', '$http', 'SERVER', '$stateParams'];
export { EventGuestController };
