define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...');
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.28/football/api/teams/search?srcStr=';
        var baseUri2 = 'http://192.168.160.28/football/api/teams';
        self.className = 'Teams';
        self.description = 'This page aims to demonstrate the use of the football web API for countries and the interconnection with other entities.<br > Called method(s): <ul><li>' + baseUri + '</li></ul>';
        self.error = ko.observable();
        self.teams = ko.observableArray([]);
        self.teamsInput = ko.observable();
       

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
        self.getTeams = function () {
            console.log('CALL: getTeams...');
            console.log(self.teamsInput());
            ajaxHelper(baseUri + self.teamsInput(), 'GET').done(function (data) {
                self.teams(data);
            });
        };

        self.removeTeams = function () {
            self.teams.removeAll();
            getFirstTeams();
        };

        getFirstTeams = function () {
            console.log('CALL: getFirstTeams...');
            ajaxHelper(baseUri2, 'GET').done(function (data) {
                self.teams(data);
            });
        };

        getFirstTeams();

    };


    return vm;

});