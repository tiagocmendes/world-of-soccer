define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...');
        //---Variáveis locais
        var self = this;
        var currentUrl = window.location.href.split('/').reverse();
        var baseUri = 'http://192.168.160.28/football/api/teams/' + currentUrl[0];
        var baseUri2 = 'http://192.168.160.28/football/api/teams/seasons/' + currentUrl[0];
        self.className = 'Team Details';
        self.description = 'This page aims to demonstrate the use of the football web API for countries and the interconnection with other entities.<br > Called method(s): <ul><li>' + baseUri + '</li></ul>';
        self.error = ko.observable();
        self.teamDetails = ko.observableArray([]);

        //--- Internal functions
        function ajaxHelper(uri, method, data) {
            self.error(''); // Clear error message
            return $.ajax({
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + uri + "] Fail...");
                    self.error(errorThrown);
                }
            });
        }
        //--- Externel functions (accessible outside)
        getTeamDetails = function () {
            console.log('CALL: getTeamDetails...');
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.teamDetails(data);
            });
        };

        //---- initial call
        getTeamDetails();

        //---Team attributes by season
        self.seasons = ko.observableArray([]);
        self.season1516A = ko.observableArray([]);
        self.season1415A = ko.observableArray([]);
        self.season1314A = ko.observableArray([]);
        self.season1213A = ko.observableArray([]);
        self.season1112A = ko.observableArray([]);
        self.season1011A = ko.observableArray([]);
        self.season0910A = ko.observableArray([]);
        self.season0809A = ko.observableArray([]);

        self.season1516M = ko.observableArray([]);
        self.season1415M = ko.observableArray([]);
        self.season1314M = ko.observableArray([]);
        self.season1213M = ko.observableArray([]);
        self.season1112M = ko.observableArray([]);
        self.season1011M = ko.observableArray([]);
        self.season0910M = ko.observableArray([]);
        self.season0809M = ko.observableArray([]);

        getTeamAttributes = function () {
            console.log('CALL: getTeamAttributes...');
            ajaxHelper(baseUri2, 'GET').done(function (data) {
                self.seasons(data);
                self.season1516A(data[0].Attributes);
                self.season1415A(data[1].Attributes);
                self.season1314A(data[2].Attributes);
                self.season1213A(data[3].Attributes);
                self.season1112A(data[4].Attributes);
                self.season1011A(data[5].Attributes);
                self.season0910A(data[6].Attributes);
                self.season0809A(data[7].Attributes);

                self.season1516M(data[0].Matches);
                self.season1415M(data[1].Matches);
                self.season1314M(data[2].Matches);
                self.season1213M(data[3].Matches);
                self.season1112M(data[4].Matches);
                self.season1011M(data[5].Matches);
                self.season0910M(data[6].Matches);
                self.season0809M(data[7].Matches);
            });
        };


        getTeamAttributes(); //--- initial call
    };
    return vm;
});