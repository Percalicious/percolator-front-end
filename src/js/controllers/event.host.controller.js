function EventHostController (MailService, $state, $http, SERVER, $cookies, $stateParams) {

	// Sets up this as vm.
	let vm = this;
	// Sets up variables
	vm.inviteNew = false;
	vm.inviteMyContacts= false;
	vm.guest = {};
	vm.rsvp = {
		yes: 0,
		no: 0,
		maybe: 0,
		not_responded: 0,
		invites: 0
	};
	vm.yesGuests = [];
	vm.noGuests = [];
	vm.maybeGuests = [];
	vm.nrGuests = [];

	// Adds the function to the vm object
	vm.showInviteNew = showInviteNew;
	vm.showInviteMyContacts = showInviteMyContacts;
	vm.hideInviteNew = hideInviteNew;
	vm.hideInviteMyContacts = hideInviteMyContacts;
	vm.deleteEvent = deleteEvent;
	vm.sendInvite = sendInvite;

	init();

	function init() {
	    var eventID = $stateParams.id;
	    let token = $cookies.get('access_token');
	    let config = {headers: {'Authorization': `Bearer ${token}`}};

	    $http.get(SERVER.URL + 'host/my-events/' + eventID, config).then((res) => {

				// forEaches through the EventGuest info and counts the
				// RSVP status of each EventGuest and a total invite count.
				let rsvpInfo = res.data.rsvpInfo;
				rsvpInfo.forEach(function(data, i){
		      if(data.rsvp === "Yes"){
		        vm.rsvp.yes++;
		        vm.rsvp.invites++;
		      }
					else if (data.rsvp === "No"){
		        vm.rsvp.no++;
		        vm.rsvp.invites++;
		      } else if (data.rsvp === "Maybe"){
		        vm.rsvp.maybe++;
		        vm.rsvp.invites++;
		      } else if (data.rsvp === "Not responded"){
		        vm.rsvp.not_responded++;
		        vm.rsvp.invites++;
		      }
		    });

				// forEaches through the Guest info and adds the
				// RSVP status to each respective Guest.
				 res.data.allGuests.forEach(function(guest, i){
					guest.rsvpInfo = res.data.rsvpInfo[i].rsvp;
				});

					// Sorts the Guests into different arrays based on their RSVP status
					res.data.allGuests.forEach(function(guest){
						if (guest.rsvpInfo === "Yes"){vm.yesGuests.push(guest);
						} else if (guest.rsvpInfo === "No"){vm.noGuests.push(guest);
						} else if (guest.rsvpInfo === "Maybe"){vm.maybeGuests.push(guest);
						} else if (guest.rsvpInfo === "Not responded"){vm.nrGuests.push(guest);
					};
				});

				// Attempt at solving the previous with lodash groupBy
				// var  = _.groupBy(res.data.allGuests, res.data.allGuests.rsvpInfo);

					vm.event = res.data;
	    });


	}

	function deleteEvent() {
		var result = confirm("Confirm delete of this event?");
			if (result) {
				var eventID = $stateParams.id
				console.log(eventID);
				let token = $cookies.get('access_token');
				let config = {
					headers: { 'Authorization': `Bearer ${token}` }
				};
				$http.delete(SERVER.URL + 'host/my-events/' + eventID, config).then((res) => {
					$state.go('root.host.myEvents');
				});
			}
	}

	function showInviteNew() {
		vm.inviteNew = true;
	}

	function showInviteMyContacts (){
		vm.inviteMyContacts=true;
	}

	function hideInviteNew(){
		vm.inviteNew = false;
	}

	function hideInviteMyContacts(){
		vm.inviteMyContacts=false;
	}

// First step of the process kicked off by the sendInvite function
// this has the backend create the guest in the guest table
function createGuest(guestInfo){
				let guestInstance = guestInfo;
				let token = $cookies.get('access_token');
				let config = {
					headers: { 'Authorization': `Bearer ${token}` }
							};
				$http.post(SERVER.URL + 'guests', guestInfo, config).then(function (res) {
								if (res.status == 200) {
										alert("200 OK - Guest Created");
										createEventGuest(res.data, guestInstance);
								} else if (res.status == 201) {
										alert("201 OK - Guest Created");
										createEventGuest(res.data, guestInstance);
								}
						},
						function (res) {
								if (res.status == 401) {
										alert("401 ERROR!!!!!");
								} else if (res.status == 403) {
										alert("403 Forbidden");
								}
						});
}

// Second step of the process kicked off by the sendInvite function
// this has the backend create the eventguest in the eventguest join table
function createEventGuest(guestInfo, guestInstance){
      let token = $cookies.get('access_token');
      let config = {
        headers: { 'Authorization': `Bearer ${token}` }
			      };
			let payload = {
				guestInfo: guestInfo,
				eventID: $stateParams.id
			}
      $http.post(SERVER.URL + 'createEventGuest', payload, config).then(function (res) {
				if (res.status == 200) {
						alert("200 OK - EventGuest Created");
						emailGuest(res.data, guestInstance);
				} else if (res.status == 201) {
						alert("201 OK - EventGuest Created");
						emailGuest(res.data, guestInstance);
				}
		});
  };


// Third step of the process kicked off by the sendInvite function
// this composes the email that will go out to the guest via the MailGun service.
function emailGuest(egInfo, guestInstance){
	let guestInfo = guestInstance.first_name + " " + guestInstance.last_name + " " + '<' + guestInstance.email + '>';
	let eventURL = "http://localhost:8081/#/event-guest/rsvp/" + egInfo.uuid;
	let emailMessage = vm.event.eventInfo.message + " Please use this link to RSVP.  We look forward to seeing you there! " + eventURL;
		var data = {
			from: 'Excited User <me@mg.javahuddle.com>',
			to: guestInfo,
			subject: 'You are invited to join us at ' + vm.event.eventInfo.title,
			text: guestInstance.privateMessage + " " + emailMessage
		};
		MailService.sendEmail(data);
}

// This function kicks off several steps neede to create the guest and send them an email.
	function sendInvite(guest){
		//Should probably check validation of email against eventguest table to avoid duplicate invites
		//Calls first step of sendInvite -> creating the guest
		createGuest(guest);
		$state.reload('root.host.eventHost');
	}

	function eventDetails(eventID) {
		$location.url('host/my-events/' + eventID);
	}

}

EventHostController.$inject = ['MailService', '$state', '$http', 'SERVER', '$cookies', '$stateParams'];
export { EventHostController };
