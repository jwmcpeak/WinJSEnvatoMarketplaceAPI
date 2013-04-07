WinJS.Namespace.define("Envato.Marketplace", (function () {
    "use strict";

    function _validateCredentials(username, apiKey) {
        if (typeof this.username !== "string") {
            throw new Error("Invalid value for username.");
        }

        if (typeof this.apiKey !== "string") {
            throw new Error("Invalid value for API key.");
        }
    }

    function Api3(username, apiKey) {
        Object.defineProperties(this, {
           username : {
               get : function() {
                   return username;
               }
           },
           apiKey : {
               get : function() {
                   return apiKey;
               }
           }
        });

        this.privateUrl = Api3.privateUrl
            .replace("{username}", username)
            .replace("{api}", apiKey);
    }

    // static properties
    Api3.publicUrl = "http://marketplace.envato.com/api/v3/{set}.json";
    Api3.privateUrl = "http://marketplace.envato.com/api/v3/{username}/{api}/{set}.json";

    Api3.prototype = {
        _fetchAndParse: function (dataSet, url) {
            
            return WinJS.xhr({ url: encodeURI(url) }).then(function (req) {
                var obj = JSON.parse(req.responseText);

                return new WinJS.Promise(function (c, e, p) {
                    c(obj[dataSet]);
                });
            }, function (err) {
                return new WinJS.Promise(function (c, e, p) {
                    e(err);
                });
            });
        },
        // pseudo-private methods
        _makePublicRequest: function (dataSet, value) {
            var str = (value === undefined) ? dataSet : dataSet + ":" + value;

            return this._fetchAndParse(dataSet, Api3.publicUrl.replace("{set}", str));
        },
        _makePrivateRequest: function (dataSet, value) {
            var str = (value === undefined) ? dataSet : dataSet + ":" + value;

            return this._fetchAndParse(dataSet, this.privateUrl.replace("{set}", str));
        },
        _makeRequest: function (dataSet, value, isPublic) {
            var str = (value === undefined) ? dataSet : dataSet + ":" + value,
        		url = isPublic ? Api3.publicUrl : this.privateUrl;

            return this._fetchAndParse(dataSet, url.replace("{set}", str))
        },

        // begin public methods
        activeThreads: function (marketplace) {
            if (typeof marketplace !== "string") {
                throw new Error("Invalid value passed to marketplace parameter.");
            }

            return this._makePublicRequest("active-threads", marketplace);
        },

        blogPosts: function (marketplace) {
            if (typeof marketplace !== "string") {
                throw new Error("Invalid value passed to marketplace parameter.");
            }

            return this._makePublicRequest("blog-posts", marketplace);
        },

        collection: function (collectionId) {
            if (typeof collectionId !== "number") {
                throw new Error("Invalid value passed to collectionId parameter.");
            }

            return this._makePublicRequest("collection", collectionId);
        },

        features: function (marketplace) {
            return this._makePublicRequest("features", marketplace);
        },

        item: function (itemId) {
            if (typeof itemId !== "number") {
                throw new Error("Invalid value passed to itemId parameter.");
            }

            return this._makePublicRequest("item", itemId);
        },

        itemPrices: function (itemId) {
            if (typeof itemId !== "number") {
                throw new Error("Invalid value passed to itemId parameter.");
            }

            return this._makePublicRequest("item-prices", itemId);
        },

        newFiles: function (marketplace, categories) {
            if (typeof marketplace !== "string") {
                throw new Error("Invalid value passed to marketplace parameter.");
            }

            if (!Array.isArray(categories)) {
                throw new Error("Invalid value passed to categories parameter.");
            }

            return this._makePublicRequest("new-files", marketplace + "," + categories.join(","));
        },

        newFilesFromUser: function (marketplace, username, categories) {
            if (typeof marketplace !== "string") {
                throw new Error("Invalid value passed to marketplace parameter.");
            }

            if (typeof username !== "string") {
                throw new Error("Invalid value passed to username parameter.");
            }

            if (!Array.isArray(categories)) {
                throw new Error("Invalid value passed to categories parameter.");
            }

            return this._makePublicRequest("new-files-from-user", username + "," + categories.join(","));
        },

        numberOfFiles: function (marketplace) {
            if (typeof marketplace !== "string") {
                throw new Error("Invalid value passed to marketplace parameter.");
            }

            return this._makePublicRequest("number-of-files", itemId);
        },

        popular: function (marketplace) {
            if (typeof marketplace !== "string") {
                throw new Error("Invalid value passed to itemId parameter.");
            }

            return this._makePublicRequest("popular", marketplace);
        },

        randomNewFiles: function (marketplace) {
            if (typeof marketplace !== "string") {
                throw new Error("Invalid value passed to marketplace parameter.");
            }

            return this._makePublicRequest("random-new-files", marketplace);
        },

        search: function (options) {
            if (!options) {
                throw new Error("Parameter cannot be undefined or null");
            }
            
            if (typeof options !== "string" && options.searchTerm === undefined) {
                throw new Error("A search term must be supplied");
            }

            var marketplace = ""; // default global search
            var categories = ""; // default all categories
            var term = options;
            

            if (options.marketplace !== undefined) {
                marketplace = options.marketplace;
            }
            
            if (options.categories !== undefined) {
                if (Array.isArray(options.categories)) {
                    categories = encodeURIComponent(options.categories.join("/"));
                } else {
                    categories = encodeURIComponent(options.categories);
                }
            }
            
            if (options.searchTerm !== undefined) {
                term = options.searchTerm;
            }
            
            if (term.indexOf(" ") > -1) {
                term = term.replace(" ", "|");
            }
            
            return this._makePublicRequest("search", [marketplace, categories, term].join(","));
        },

        threadStatus: function (threadId) {
            if (typeof threadId !== "number") {
                throw new Error("Invalid value passed to threadId parameter.");
            }

            return this._makePublicRequest("thread-status", threadId);
        },

        totalUsers: function () {
            return this._makePublicRequest("total-users");
        },

        user: function (username) {
            if (typeof username !== "string") {
                throw new Error("Invalid value passed to user parameter");
            }

            return this._makePublicRequest("user", username);
        },

        userItemsBySite: function (username) {
            if (typeof username !== "string") {
                throw new Error("Invalid value passed to user parameter");
            }

            return this._makePublicRequest("user-items-by-site", username);
        },
        // end public methods
        // begin user methods
        account: function () {
            _validateCredentials.call(this);

            return this._makePrivateRequest("account");
        },
        downloadPurchase: function (purchaseCode) {
            _validateCredentials.call(this);

            return this._makePrivateRequest("download-purchase", purchaseCode);
        },
        earningsAndSalesByMonth: function () {
            _validateCredentials.call(this);

            return this._makePrivateRequest("earnings-and-sales-by-month");

        },
        recentSales: function () {
            _validateCredentials.call(this);

            return this._makePrivateRequest("recent-sales");

        },
        statement: function () {
            _validateCredentials.call(this);

            return this._makePrivateRequest("statement");

        },
        verifyPurchase: function (purchaseCode) {
            _validateCredentials.call(this);

            return this._makePrivateRequest("verify-purchase", purchaseCode);

        },
        vitals: function () {
            _validateCredentials.call(this);

            return this._makePrivateRequest("vitals");
        }
        // end user methods
    };

    return {
        create: function (options) {
            var version = 3;

            if (!options) {
                options = {};
            }

            // version doesn't matter; nothing else implemented atm
            return new Api3(options.username, options.apiKey);
        }
    };

}()));