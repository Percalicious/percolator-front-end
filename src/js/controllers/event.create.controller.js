function EventCreateController ($state, $scope, $http, SERVER, $cookies) {

  let vm = this;
  vm.createEvent = createEvent;
  vm.uploadImage = uploadImage;
  // vm.submitStateChange = submitStateChange;

  // Variable for storing uploadImage() filepicker image-url to hand to createEvent() eventInfo object
  let image = "";

  function createEvent(eventInfo) {
      eventInfo.photo_url = image;
      let token = $cookies.get('access_token');
      let config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      $http.post(SERVER.URL + 'event-create', eventInfo, config).then(function successCallback(res) {
              if (res.status == 200) {
                  alert("200 OK");
                  $state.go('root.host.myEvents');
              } else if (res.status == 201) {
                  alert("201 OK");
                  $state.go('root.host.myEvents');
              }
          },
          function errorCallback(res) {
              if (res.status == 401) {
                  alert("401 ERROR!!!!!");
              } else if (res.status == 403) {
                  alert("403 Forbidden");
              }

          });
  };

  function uploadImage() {  
      filepicker.pick(function(Blob) {
          image = Blob.url;  
      }); 
  }

  // function submitStateChange(){
  //   $state.go('root.host.eventHost');
  // }

}

EventCreateController.$inject = ['$state', '$scope', '$http', 'SERVER', '$cookies'];
export { EventCreateController };
