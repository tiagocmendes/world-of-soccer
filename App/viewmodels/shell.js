define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        activate: function () {
            router.map([
                { route: '', title: 'Welcome', moduleId: 'viewmodels/welcome', nav: true, menu: '<i class="fa fa-home"></i> Home' },
                { route: 'countries', title: 'Countries', moduleId: 'viewmodels/countries', nav: true, menu: '<i class="fa fa-globe"></i> Countries' },
                {
                    route: 'leagues', title: 'Leagues', moduleId: 'viewmodels/leagues', nav: true, menu: '<i class="fa fa-trophy"></i> Leagues' },
                { route: 'countryDetails/:id', title: 'Country Details', moduleId: 'viewmodels/countryDetails', nav: false },
                { route: 'leagueDetails/:id', title: 'League Details', moduleId: 'viewmodels/leagueDetails', nav: false },
                { route: 'teamDetails/:id', title: 'Team Details', moduleId: 'viewmodels/teamDetails', nav: false },
                { route: 'matchDetails/:id', title: 'Match Details', moduleId: 'viewmodels/matchDetails', nav: false },
                { route: 'teams', title: 'Teams', moduleId: 'viewmodels/teams', nav: true, menu: '<i class="fa fa-get-pocket"></i > Teams' },
                { route: 'players', title: 'Players', moduleId: 'viewmodels/players', nav: true, menu: '<i class="fa fa-users"></i> Players' },
                { route: 'playerDetails/:id', title: 'Player Details', moduleId: 'viewmodels/playerDetails', nav: false } 
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});