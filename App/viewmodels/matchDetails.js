define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...');
        //---Variáveis locais
        var self = this;
        var currentUrl = window.location.href.split('/').reverse();
        var baseUri = 'http://192.168.160.28/football/api/matches/' + currentUrl[0];
        self.className = 'Match Details';
        self.description = 'This page aims to demonstrate the use of the football web API for countries and the interconnection with other entities.<br > Called method(s): <ul><li>' + baseUri + '</li></ul>';
        self.error = ko.observable();
        self.matchDetails = ko.observableArray([]);
        self.leagueDetails = ko.observableArray([]);
        self.awayPlayers = ko.observableArray([]);
        self.homePlayers = ko.observableArray([]);

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

        getLeagueDetails = function (baseUri2) {
            console.log('CALL: getLeagueDetails...');
            ajaxHelper(baseUri2, 'GET').done(function (data) {
                self.leagueDetails(data);


            });
        };
        //--- Externel functions (accessible outside)
        getMatchDetails = function () {
            console.log('CALL: getTeamDetails...');
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.matchDetails(data);
                self.awayPlayers(data.Away_player);
                self.homePlayers(data.Home_player);
                var baseUri2 = 'http://192.168.160.28/football/api/leagues/' + data.league_id;
                getLeagueDetails(baseUri2);
            });
        };



        //---- initial call
        getMatchDetails();
    };
    return vm;
});