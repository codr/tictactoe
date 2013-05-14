'use strict';

angular.module('tictactoeApp')
  .controller('BoardCtrl', function ($scope) {
    var tiles = ['topLeft',
                'topCenter',
                'topRight',
                'middleLeft',
                'middleCenter',
                'middleRight',
                'bottomLeft',
                'bottomCenter',
                'bottomRight']

    $scope.turnNumber = 0;
    $scope.$watch('turnNumber', function(newValue, oldValue){
        if($scope.turnNumber % 2 != 0){
            computerMove();
        };
    });


    $scope.enterMark = function(tile){
        if(isEmpty(tile)){
            placeMark('X', tile);
        }
    }

    var isBoardFull = function () {
        for(var index in tiles){
            var tile = tiles[index];
            if(isEmpty(tile))
                return false;
        }
        return true;
    }

    var getWinner = function(){
        if($scope.winner)
            return $scope.winner
        //horizontal
        for(var i = 0; i < 9; i=i+3){
            if ($scope[tiles[i]] == $scope[tiles[i+1]] &&
                $scope[tiles[i+1]] == $scope[tiles[i+2]] &&
                !isEmpty(tiles[i]))
                return $scope.winner = $scope[tiles[i]];
        }
        //vertical
        for(var i = 0; i < 3; i++){
            if($scope[tiles[i]] == $scope[tiles[i+3]] &&
                $scope[tiles[i+3]] == $scope[tiles[i+6]] &&
                !isEmpty(tiles[i]))
                return $scope.winner = $scope[tiles[i]];
        }
        //diagonal
        if($scope[tiles[0]] == $scope[tiles[4]] &&
            $scope[tiles[4]] == $scope[tiles[8]] &&
            !isEmpty(tiles[0]))
            return $scope.winner = $scope[tiles[0]];
        if($scope[tiles[2]] == $scope[tiles[4]] &&
            $scope[tiles[4]] == $scope[tiles[6]] &&
            !isEmpty(tiles[2]))
            return $scope.winner = $scope[tiles[2]];
        return null;
    }

    var isEmpty = function(tile){
        return typeof($scope[tile]) == 'undefined';
    }

    var computerMove = function(){
        do{
            var index = Math.floor(Math.random()*tiles.length);
            var testTile = tiles[index];
        }while(!isEmpty(testTile) && !isBoardFull());
        placeMark('0', testTile);
    }

    var placeMark = function(mark, tile){
        $scope[tile] = mark;
        updateGame();
        $scope.turnNumber++;
    }

    var updateGame = function(){
        if(isBoardFull() || getWinner()){
            updateMessage();
            $('#modal').modal({keyboard: false});
        }
        updateMessage();
    }

    var updateMessage = function(){
        if(isBoardFull())
            $scope.modalMessage = "Draw";
        if(getWinner())
            $scope.modalMessage = getWinner() + " Wins!";
    }

    var resetGame  = $scope.resetGame = function(){
        $scope.turnNumber = 0;
        delete $scope.winner;
        delete $scope.modalMessage;
        for(var i in tiles){
            var tile = tiles[i];
            delete $scope[tile];
        }

    }

    $('#modal').on('hidden', function(){
        resetGame();
    });

  });