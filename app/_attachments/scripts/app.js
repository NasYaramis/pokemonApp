'use strict'
var pokemondb = '../../../pokemon/_all_docs?include_docs=true';
var pokemon2db = '../../_all_docs?include_docs=true';

angular.module('pokemonApp', ['ngRoute'])

pokemonApp.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'assets/views/home.html',
            controller: 'homeController'
        })
        .otherwise({ redirectTo: '/home' });
})

pokemonApp.controller('homeController', function($scope, pokemonSrv){
    $('#searchButton').on('click', function(){
        var url = '../../_design/by_owned/_view/owned?startkey="'+$('#date1').val()+'"$endkey="' +$('#date2').val()+'"';
        pokemonSrv.getPokemonsFromDb(url).then(function succes(data){
            $scope.pokemons = data;
            console.log(data);
        }, function error(msg){
            alert('Er is een fout!')
            console.log(msg);
        });
    });

    pokemonSrv.getPokemonsFromDb(pokemondb).then(function success(data){
        for (var i = 0; i < data.length-1; i++){
            pokemonSrv.addPokemon(data[i].name, data[i]);
        }
    }, function error(msg){
            alert('Er is een fout bij db!')
            console.log(msg);
        });
    });

    pokemonApp.service('pokemonSrv', function($http, $q){
        this.getPokemonsFromDb = function(url){
            var deferred = $q.defer();
            var url2 = url;
            $http.get(url2)
            .then(function(data){
                var pokemonDoc = data.data.rows;
                deferred.resolve(pokemonDoc);
            }, function(err){
                deferrred.reject(err);
            });
            return defered.promise;
        };


        this.getPokemonsFromDb = function(databaseURL){
            var deferred = $q.defer();
            var url = databaseURL;
            $http.get(url2)
            .then(function(data){
                var pokemonDoc = data.data.rows[0].doc;
                var pokemonArr = [];
                for (var i = 0; i < pokemonDoc.docs.length; i++){
                    pokemonArr.push(pokemonDoc.docs[i]);
                }
                deferred.resolve(pokemonArr);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        };

    this.addPokemon = function(key, value){
        $http.put('../../' + key, value);
    };

});
