"use strict";angular.module("tictactoeApp",[]).config(["$routeProvider",function(n){n.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("tictactoeApp").controller("MainCtrl",function(){}),angular.module("tictactoeApp").controller("BoardCtrl",["$scope",function(n){var e=["topLeft","topCenter","topRight","middleLeft","middleCenter","middleRight","bottomLeft","bottomCenter","bottomRight"];n.turnNumber=0,n.$watch("turnNumber",function(){0!==n.turnNumber%2&&i()}),n.enterMark=function(n){o(n)&&u("X",n)};var r=function(){for(var n in e){var r=e[n];if(o(r))return!1}return!0},t=function(){if(n.winner)return n.winner;var r;for(r=0;9>r;r+=3)if(n[e[r]]===n[e[r+1]]&&n[e[r+1]]===n[e[r+2]]&&!o(e[r]))return n.winner=n[e[r]],n.winner;for(r=0;3>r;r++)if(n[e[r]]===n[e[r+3]]&&n[e[r+3]]===n[e[r+6]]&&!o(e[r]))return n.winner=n[e[r]],n.winner;return n[e[0]]!==n[e[4]]||n[e[4]]!==n[e[8]]||o(e[0])?n[e[2]]!==n[e[4]]||n[e[4]]!==n[e[6]]||o(e[2])?null:(n.winner=n[e[r]],n.winner):(n.winner=n[e[r]],n.winner)},o=function(e){return void 0===n[e]},i=function(){var n,t;do n=Math.floor(Math.random()*e.length),t=e[n];while(!o(t)&&!r());u("0",t)},u=function(e,r){n[r]=e,a(),n.turnNumber++},a=function(){(r()||t())&&(l(),$("#modal").modal({keyboard:!1})),l()},l=function(){r()&&(n.modalMessage="Draw"),t()&&(n.modalMessage=t()+" Wins!")},c=n.resetGame=function(){n.turnNumber=0,delete n.winner,delete n.modalMessage;for(var r in e){var t=e[r];delete n[t]}};$("#modal").on("hidden",function(){c()})}]);