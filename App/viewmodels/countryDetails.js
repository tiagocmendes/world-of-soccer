﻿define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...');
        //---Variáveis locais
        var self = this;
        var currentUrl = window.location.href.split('/').reverse();
        var baseUri = 'http://192.168.160.28/football/api/countries/countryLeagues/' + currentUrl[0];
        self.className = 'Country Details';
        self.description = 'This page aims to demonstrate the use of the football web API for countries and the interconnection with other entities.<br > Called method(s): <ul><li>' + baseUri + '</li></ul>';
        self.error = ko.observable();
        self.countryDetails = ko.observableArray([]);

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
        getCountryDetails = function () {
            console.log('CALL: getCountryDetails...');
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.countryDetails(data);
            });
        };


        //---- initial call
        getCountryDetails();
    };


    return vm;

});