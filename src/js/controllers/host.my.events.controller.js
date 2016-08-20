function HostMyEventsController ($state, $scope, $http, SERVER, $cookies, $location) {

  // Sets up this as vm.
  let vm = this;
  // Sets up variables
  vm.events = [];
  // Adds the function to the vm object
  vm.deleteEvent = deleteEvent;
  vm.eventDetails = eventDetails;

  init();

	function init() {
			let token = $cookies.get('access_token');
			let config = {
				headers: { 'Authorization': `Bearer ${token}` }
			};
			$http.get(SERVER.URL + 'my-events', config).then((res) => {
				vm.events = res.data;
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
  }

}

HostMyEventsController.$inject = ['$state', '$scope', '$http', 'SERVER', '$cookies', '$location'];
export { HostMyEventsController };
