'use strict'

angular.module('pokemonApp', ['ngRoute'])

.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'assets/views/home.html',
            controller: 'homeCtrl'
        })
        .otherwise({ redirectTo: '/home' });
})

.controller('homeCtrl', function ($scope, putCouchdbSrv, pokemonSrv, putCouchdbSrv) {
    $('#searchButton').on('click', function(e){
        var date1 = $('#date1Text').val();
        var date2 = $('#date2Text').val();
        var BY_DATE = '_view/byDate';
        var db1 = 'http://localhost:5984/pokemon/';
        var COUCHDB = '../../' + actor;
        
        putCouchdbSrv.getCouchdbData(BY_DATE, date1, date2).then(function(data){
            console.log(data);
            if(data.data.rows.length == 0){
                console.log("actor does not yet exist");
                pokemonSrv.getIMDBData(IMDB, actor).then(function(data){
                    console.log(data);
                    
                    var pokemons = [];
                    
                    var htmlString = '<ul>';
                    for (var i = 0; i < data.filmography.actor.length; i++) {
                        pokemons.push(data);
                    }
                    var doc = {};
                    
                    doc.name = data.name;
                    doc.type = type;
                    doc.trainer = trainer;
                    doc.gender = gender;
                    doc.owned = owned;
                    
                    var json = JSON.stringify(doc);
                    console.log(json);
                    
                    $('#pokemons').html(htmlString);
                    
                    putCouchdbSrv.putCouchdbData(COUCHDB, json).then(function(data){
                        console.log(data);
                    })
                })
            }
            
        });
    })
})
.filter('dateRange', function() {
    return function( items, fromDate, toDate ) {
        var filtered = [];
        //here you will have your desired input
        console.log(fromDate, toDate);
        var from_date = Date.parse(fromDate);
        var to_date = Date.parse(toDate);
        angular.forEach(items, function(item) {
            if(item.completed_date > from_date && item.completed_date < to_date) {
                filtered.push(item);
            }
        });
        return filtered;
    };
})

.service('pokemonSrv', function($http, $q) {
    this.getPokemons = function(pokemon) {
        var q = $q.defer();
        var url = 'http://admin:admin@localhost:5984/pokemon2/';

        $http.get(url)
            .then(function(data) {
                var pokemonObj = data.data.results[0].known_for;
                var movies = [];
                for (var i = 0; i < pokemonObj.length; i++) {
                    pokemons.push(pokemonObj[i].id);
                }
                q.resolve(pokemons);
            }, function(err) {
                q.reject(err);
            });

        return q.promise;
    };
})

.service('putCouchdbSrv', function($http, $q){
    	
    var q = $q.defer();

    this.putCouchdbData = function(url, json){

        console.log(url);
        $http.put(url, json)
            .then(function(data){
                q.resolve(data);
            }, function error(err){
                q.reject(err);
                console.log(err);
            });
        return q.promise;
    };
})
