This is a WinJS wrapper for the Envato Marketplace API. Currently, only v3 is implemented.

### Usage

Create a new API object:

    var publicOnly = Envato.Marketplace.create();

	var publicAndAccount = Envato.Marketplace.create({
		username : "usernameValue",
        apiKey : "apiKeyValue"
	});


The `username` and `apiKey` properties are only required for the the User/Private sets (see [the API documentation](http://marketplace.envato.com/api/documentation))

### Examples 

#### Retreive a User's Information
    var api = Envato.Marketplace.create();
    api.user("jwmcpeak").then(function(user) {
		var img = user.image;
		var followers = user.followers;
	}, function(err) {
		alert(err.status);
	});

#### Search for Sliders Across All Marketplaces
    var api = Envato.Marketplace.create();
	api.search("sliders").then(function(results) {
		results.forEach(function(item)) {
			var description = item.description;
			var url = item.url;
		});
	}, function(err) {
		alert(err.status);
	});

##### Limit Results to a Marketplace...
    var api = Envato.Marketplace.create();
    api.search({ marketplace: "codecanyon", searchTerm: "sliders"}).then(function(results) {
		results.forEach(function(item)) {
			var description = item.description;
			var url = item.url;
		});
	}, function(err) {
		alert(err.status);
	});

##### Limit Results to a Marketplace Category or Categories...
    var api = Envato.Marketplace.create();
	
	// single category search	
	api.search({
        marketplace: "codecanyon",
        categories : "plugins",
        searchTerm: "sliders"
    }).then(function(obj) {
        results.forEach(function(item)) {
			var description = item.description;
			var url = item.url;
		});
    }, function(obj) {
        alert(err.status);
    });

	// multi-category search
	api.search({
        marketplace: "codecanyon",
        categories : ["plugins", "mootools"], // or "plugins/mootools"
        searchTerm: "sliders"
    }).then(function(obj) {
        results.forEach(function(item)) {
			var description = item.description;
			var url = item.url;
		});
    }, function(obj) {
        alert(err.status);
    });

	

#### Get Account Balance
    var api = Envato.Marketplace.create({
		username: "YOUR USERNAME",
		apiKey: "YOUR API KEY"
	});

	api.vitals().then(function(acct) {
		var balance = acct.balance;
	}, function(obj) {
        alert(err.status);
    });
    
	// OR

	api.account().then(function(acct) {
		var balance = acct.balance;
	}, function(obj) {
        alert(err.status);
    });

### Notes
The returned objects, their types, and their properties are the result of parsing the JSON result returned by Envato's API. Envato's API documentation does not list this information (and I'm not going to document them); so you're on your own in this respect.

The object passed to the error handler is the XHR object that made the request.