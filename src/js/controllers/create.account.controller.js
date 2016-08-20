function CreateAccountController($http, SERVER, $state, $cookies) {

    // Sets up this as vm.
    let vm = this;

    // Adds the function to the vm object.
    vm.createAccount = createAccount;
    vm.uploadImage = uploadImage;

    let image = "";

    function createAccount(user) {
        user.photo_url = image;

        $http.post(SERVER.URL + 'register', user).then(function successCallback(res) {
                if (res.status == 200) {
                    alert("200 OK");
                    $http.post(SERVER.URL + 'login', user).then(function successCallback(res) {
                        if (res.status == 200) {
                            alert("200 OK");
                            $cookies.put('access_token', res.data.access_token);
                            $state.go('root.host');
                        }
                    },
                    function errorCallback(res) {
                        if (res.status == 401) {
                            alert("401 ERROR!!!!!");
                        } else if (res.status == 403) {
                            alert("403 Forbidden");
                        }

                    });                    
                }
                else if (res.status == 201) {
                    alert(res.status + " Account Created Successfully!");
                    $http.post(SERVER.URL + 'login', user).then(function successCallback(res) {
                        if (res.status == 200) {
                            alert("200 OK");
                            $cookies.put('access_token', res.data.access_token);
                            $state.go('root.host');
                        }
                    },
                    function errorCallback(res) {
                        if (res.status == 401) {
                            alert("401 ERROR!!!!!");
                        } else if (res.status == 403) {
                            alert("403 Forbidden");
                        }

                    });
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

}

CreateAccountController.$inject = ['$http', 'SERVER', '$state', '$cookies'];
export { CreateAccountController };
