/**
 * Created by aspetko on 06.12.17.
 */
////////////////////////////
// TODO List
////////////////////////////
// - Impact control
// - Game Over Screen
// - New Game

////////////////////////////
// Helper Methods
////////////////////////////
function generateRandom(maxvalue) {
    return Math.floor(Math.random() * maxvalue);
}

////////////////////////////
// Create the Namespace
////////////////////////////

/**
 * Namespace for the game engine
 * If it is already set, reassign it
 */
var GameEngine = GameEngine || {};
/**
 * Global constants for the game
 */
var FixedValues = FixedValues || {};

/** Game matrix
 *
 * @param numberOfRows the dimension
 * @param numberOfColumns the dimension in fields
 * @param bounceOfTheBorder should a ball, the player bet
 * @constructor
 */
function Board(context, numberOfRows, numberOfColumns, bounceOfTheBorder) {
    this.numberOfRows = numberOfRows;
    this.numberOfColumns = numberOfColumns;
    this.bounceOfTheBorder = bounceOfTheBorder;
    this.context = context;

    this.fields = new Array(numberOfColumns);
    for (var x =0; x<numberOfColumns; x++){
        this.fields[x] = new Array(numberOfRows);
        for (var y=0;  y<numberOfRows; y++){
            this.fields[x][y] = 0;
        }
    }

    this.positionElementsByRandom = function(element) {
        var done = false;

        while (!done){
            var random_x = generateRandom(numberOfColumns);
            var random_y = generateRandom(numberOfRows);
            if (this.fields[random_x][random_y] == 0){
                done = true;
                this.fields[random_x][random_y] = element;
                switch(element){
                    case FixedValues.PLAYER_1:
                        this.drawPlayer(this.context, random_x, random_y, FixedValues.fieldWidth, FixedValues.fieldHeight, "#FFFFFF");
                        GameEngine.player1.pos_x = random_x;
                        GameEngine.player1.pos_y = random_y;
                        break;
                    case FixedValues.PLAYER_2:
                        this.drawPlayer(this.context, random_x, random_y, FixedValues.fieldWidth, FixedValues.fieldHeight, "#000000");
                        GameEngine.player2.pos_x = random_x;
                        GameEngine.player2.pos_y = random_y;
                        break;
                    case FixedValues.BARRIER:
                        this.drawBarrier(this.context, random_x, random_y, FixedValues.fieldWidth, FixedValues.fieldHeight, "#FFFFFF");
                        // drawBarrier(ctx, random_x, random_y, FixedValues.fieldWidth, FixedValues.fieldWidth, "#FF0000" );
                        break;
                    case FixedValues.WEAPON_KNIFE:
                        this.drawKnife(this.context, random_x, random_y, FixedValues.fieldWidth, FixedValues.fieldHeight, "#FFFFFF");
                        break;
                    case FixedValues.WEAPON_GUN:
                        this.drawGun(this.context, random_x, random_y, FixedValues.fieldWidth, FixedValues.fieldHeight, "#FFFFFF");
                        break;
                    case FixedValues.WEAPON_FLAME_THROWER:
                        this.drawFlameThrower(this.context, random_x, random_y, FixedValues.fieldWidth, FixedValues.fieldHeight, "#FFFFFF");
                        break;
                    case FixedValues.WEAPON_BOMB:
                        this.drawBomb(this.context, random_x, random_y, FixedValues.fieldWidth, FixedValues.fieldHeight, "#FFFFFF");
                        break;
                }
            } else {
                console.log("Placed occupied ["+random_x+"]["+random_y+"]...")
            }
        }
    }

    this.debugPlayer = function(player){
        console.log("player.pos_x: "+player.pos_x);
        console.log("player.pos_y: "+player.pos_y);
        console.log("player.playerNr: "+player.playerNr);
    }


    this.movePlayerMatrix = function(player, newX, newY){
        this.redraw(player.pos_x, player.pos_y, player.playerNr, newX, newY);
        console.log("Before: ("+player.pos_x+", "+player.pos_y+")->("+newX+", "+newY+")");
        GameEngine.Board.debug();
        this.fields[player.pos_x][player.pos_y] = 0;
        this.fields[newX][newY] = player.playerNr;
        player.pos_x = newX;
        player.pos_y = newY;
        console.log("After: "+player.pos_x+" "+player.pos_y);
        GameEngine.Board.debug();
        if (player.playerNr == 1){
            console.log("Move to player 2");
            GameEngine.currentPlayer = GameEngine.player2;
        } else {
            console.log("Move to player 1");
            GameEngine.currentPlayer = GameEngine.player1;
        }
    };


    this.movePlayerUp = function(){
        var player = GameEngine.currentPlayer;
        // this.debugPlayer(player);
        if (player.pos_y == 0){ // topmost row, continue on the lowest row ...
            console.log("topmost row, continue on the lowest row ...");
            if (this.bounceOfTheBorder){
                console.log("bounceOfTheBorder: no move possible");
            } else {
                var newPos = FixedValues.numberOfRows-1;
                if (this.fields[player.pos_x][newPos] == FixedValues.EMPTY_FIELD){
                    this.movePlayerMatrix(player, player.pos_x, player.pos_y-1);
                } else {
                    console.log("Move not possible, field occupied");
                }
            }
        } else { // check if element above is not a barrier
            var y = player.pos_y - 1;
            if (this.fields[player.pos_x][y] == FixedValues.EMPTY_FIELD){
                this.movePlayerMatrix(player, player.pos_x, y);
            } else {
                console.log("Move not possible, field occupied");
            }
        }
    };

    this.movePlayerDown = function(player){
        var player = GameEngine.currentPlayer;
        // this.debugPlayer(player);
        if (player.pos_y == numberOfRows-1){ // lowest row, continue on the topmost row ...
            console.log("lowest row, continue on the topmost row ...");
            if (this.bounceOfTheBorder){
                console.log("bounceOfTheBorder: no move possible");
            } else {
                var newPos = 0;
                if (this.fields[player.pos_x][newPos] == FixedValues.EMPTY_FIELD){
                    this.movePlayerMatrix(player, player.pos_x, player.pos_y+1);
                } else {
                    console.log("Move not possible, field occupied");
                }
            }
        } else { // check if element below is not a barrier
            var y = player.pos_y + 1;
            if (this.fields[player.pos_x][y] == FixedValues.EMPTY_FIELD){
                this.movePlayerMatrix(player, player.pos_x, y);
            } else {
                console.log("Move not possible, field occupied");
            }
        }
    };

    this.movePlayerLeft = function(){
        var player = GameEngine.currentPlayer;
        if (player.pos_x == 0){ // leftmost column, continue on the right column ...
            console.log("leftmost column, continue on the right column ...");
            if (this.bounceOfTheBorder){
                console.log("bounceOfTheBorder: no move possible");
            } else {
                var newPos = numberOfColumns-1;
                if (this.fields[newPos][player.pos_y] == FixedValues.EMPTY_FIELD){
                    this.movePlayerMatrix(player, newPos, player.pos_y);
                } else {
                    console.log("Move not possible, field occupied");
                }
            }
        } else { // check if element left is not a barrier
            var x = player.pos_x - 1;
            if (this.fields[x][player.pos_y] == FixedValues.EMPTY_FIELD){
                this.movePlayerMatrix(player, x, player.pos_y);
            } else {
                console.log("Move not possible, field occupied");
            }
        }
    };

    this.movePlayerRight = function(player){
        var player = GameEngine.currentPlayer;
        if (player.pos_x == numberOfColumns-1){ // rightmost column, continue on the left ...
            console.log("rightmost column, continue on the right column ...");
            if (this.bounceOfTheBorder){
                console.log("bounceOfTheBorder: no move possible");
            } else {
                var newPos = 0;
                if (this.fields[newPos][player.pos_y] == FixedValues.EMPTY_FIELD){
                    this.movePlayerMatrix(player, newPos, player.pos_y);
                } else {
                    console.log("Move not possible, field occupied");
                }
            }
        } else { // check if element right is not a barrier
            var x = player.pos_x + 1;
            if (this.fields[x][player.pos_y] == FixedValues.EMPTY_FIELD){
                this.movePlayerMatrix(player, x, player.pos_y);
            } else {
                console.log("Move not possible, field occupied");
            }
        }
    };

    this.fire = function () {
        console.log("Fire");
    };

    this.debug = function() {
        var output = "  0 1 2 3 4 5 6 7 8 9\n";
        for (var y=0; y<numberOfRows; y++){
            output += y+"[";
            for (var x=0; x<numberOfColumns; x++){
                output += this.fields[x][y]+" ";
            }
            output += "]\n";
        }
        console.log(output);
    };

    this.resetBoard = function(){
        for (var y=0; y < numberOfColumns; y++){
            for (var x=0; x < numberOfRows; x++){
                board[x][y]=0;
            }
        }
    };

    this.redraw = function(x,y, playerNr, newX, newY){
        console.log("Redraw called ("+x+", "+y+")->("+newX+", "+newY+")");
        this.context.clearRect(x * FixedValues.fieldWidth, y * FixedValues.fieldHeight, FixedValues.fieldWidth, FixedValues.fieldHeight);
        this.context.beginPath();
        this.context.rect(x * FixedValues.fieldWidth, y * FixedValues.fieldHeight, FixedValues.fieldWidth, FixedValues.fieldHeight);
        // this.context.fillStyle = "#FFF";
        this.context.closePath();
        this.context.stroke();
        // this.context.fill();

        if (playerNr == 1){
            this.drawPlayer(this.context, newX, newY, FixedValues.fieldWidth, FixedValues.fieldHeight, "#FFFFFF");
        } else {
            this.drawPlayer(this.context, newX, newY, FixedValues.fieldWidth, FixedValues.fieldHeight, "#000000");
        }
    }

    this.drawPlayer = function(context, x, y, fieldWidth, fieldHeight, fillStyle){
        context.beginPath();
        context.moveTo(x * fieldWidth+10, y * fieldHeight);
        context.lineTo(x * fieldWidth+40,  y * fieldHeight+10);
        context.lineTo(x * fieldWidth+10, y * fieldHeight+50);
        context.fillStyle = fillStyle;
        context.closePath();
        context.stroke();
        context.fill();
    }

    this.drawKnife = function(context, x, y, fieldWidth, fieldHeight, fillStyle){
        context.beginPath();
        context.moveTo(x * fieldWidth+10, y * fieldHeight);
        context.lineTo(x * fieldWidth+10, y * fieldHeight+50);
        context.lineTo(x * fieldWidth+15, y * fieldHeight+50);
        context.fillStyle = fillStyle;
        context.closePath();
        context.stroke();
        context.fill();
    }

    this.drawGun = function(context, x, y, fieldWidth, fieldHeight, fillStyle){
        context.beginPath();
        context.moveTo(x * fieldWidth+10, y * fieldHeight);
        context.lineTo(x * fieldWidth+100, y * fieldHeight);
        context.lineTo(x * fieldWidth+15, y * fieldHeight+50);
        context.fillStyle = fillStyle;
        context.closePath();
        context.stroke();
        context.fill();
    }

    this.drawBomb = function(context, x, y, fieldWidth, fieldHeight, fillStyle){
        context.beginPath();
        context.arc(x* fieldWidth+25, y*fieldHeight+25, 5, 0, 2 * Math.PI, false);
        // context.fillStyle = fillStyle;
        context.moveTo(x * fieldWidth+25, y * fieldHeight+20);
        context.lineTo(x * fieldWidth+25, y * fieldHeight+10);
        context.closePath();
        context.fillStyle = 'black';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#003300';
        context.stroke();
    }
    this.drawFlameThrower = function(context, x, y, fieldWidth, fieldHeight, fillStyle){
        context.beginPath();
        context.moveTo(x * fieldWidth+10, y * fieldHeight);
        context.lineTo(x * fieldWidth+100, y * fieldHeight);
        context.lineTo(x * fieldWidth+15, y * fieldHeight+50);
        context.fillStyle = fillStyle;
        context.closePath();
        context.stroke();
        context.fill();
    }

/*
    this.drawBomb = function(context, x, y, fieldWidth, fieldHeight, fillStyle){
        context.beginPath();
        context.moveTo(x * fieldWidth+10, y * fieldHeight);
        context.lineTo(x * fieldWidth+100, y * fieldHeight);
        context.lineTo(x * fieldWidth+15, y * fieldHeight+50);
        context.fillStyle = fillStyle;
        context.closePath();
        context.stroke();
        context.fill();
    }
*/

    this.drawChessField = function(context, fieldWidth, fieldHeight, fillStyle, fillStyle2){
        for (var y = 0; y < 10; y++) {
            for (var x = 0; x < 10; x++) {
                context.beginPath();
                context.rect(x * fieldWidth, y * fieldHeight, fieldWidth, fieldHeight);
                context.fillStyle = (x + y) % 2 ? fillStyle : fillStyle2;
                context.closePath();
                context.fill();
            }
        }
    }

    this.drawEmptyChessField = function(context, fieldWidth, fieldHeight){
        // var  = 100;
        var y = 0;
        context.beginPath();
        for (var x =0; x<10; x++){
            context.moveTo(x* fieldWidth, y);
            context.lineTo(x* fieldWidth, 10* fieldHeight);
        }
        x = 0;
        for (y =0; y<10; y++){
            context.moveTo(x* fieldWidth, y * fieldHeight);
            context.lineTo(10* fieldWidth, y * fieldHeight);
        }
        // context.fillRect(x * fieldWidth, y * fieldHeight, fieldWidth, fieldHeight);
        context.fillStyle = "#000";
        context.closePath();
        context.stroke();
        context.fill();
    }

    this.drawBarrier = function(context, x, y, fieldWidth, fieldHeight, fillStyle){
        context.beginPath();
        context.moveTo(x * fieldWidth+15, y * fieldHeight+5);
        context.lineTo(x * fieldWidth+45, y * fieldHeight+5);
        context.lineTo(x * fieldWidth+55, y * fieldHeight+15);
        context.lineTo(x * fieldWidth+55, y * fieldHeight+45);
        context.lineTo(x * fieldWidth+45, y * fieldHeight+55);
        context.lineTo(x * fieldWidth+15, y * fieldHeight+55);
        context.lineTo(x * fieldWidth+5, y * fieldHeight+45);
        context.lineTo(x * fieldWidth+5, y * fieldHeight+15);
        context.lineTo(x * fieldWidth+15, y * fieldHeight+5);
        context.fillStyle = fillStyle;
        context.closePath();
        context.stroke();
        context.fill();
    }

};

/**
 *
 * @param name
 * @param playerState
 * @param playerNr
 * @constructor
 */
function Player(name, playerState, playerNr) {
    this.name = name;
    this.playerNr = playerNr;
    this.playerState = playerState;
    this.health = 100;
    this.pos_x = -1;
    this.pos_y = -1;
    this.weapon = FixedValues.WEAPON_KNIFE;
    document.getElementById(this.playerState).style.backgroundColor = "green";

    this.hit = new function () {
        this.health -= 10;
    }

    this.isAlive = function () {
        return this.health > 0;
    }

    this.setWeapon = function (weapon) {
        this.weapon = weapon;
    };

    this.showDamage = function () {
        var line = document.getElementById("tester").value; // exchange by real event
        if (line === '100') {
            $("#"+this.playerState).css('background', 'red');
        } else if (line === '0') {
            $("#"+this.playerState).css('background', 'green');
        } else {
            $("#"+this.playerState).css('background', 'linear-gradient(to bottom, red ' + line + '%, green 100%)');
        }
    }
}

function Barrier() {
};

function Weapon(name, damage) {
   this.name = name;
   this.damage = damage;
};















/////////////////////////
// Some Game Variables
/////////////////////////
// Moves...

window.onload = function(){
    FixedValues.EMPTY_FIELD = 0;
    FixedValues.PLAYER_1 = 1;
    FixedValues.PLAYER_2 = 2;
    FixedValues.BARRIER = 3;
    FixedValues.WEAPON_KNIFE = 4;
    FixedValues.WEAPON_GUN = 5;
    FixedValues.WEAPON_FLAME_THROWER = 6;
    FixedValues.WEAPON_BOMB = 7;
    FixedValues.UP = 38;
    FixedValues.DOWN = 40;
    FixedValues.LEFT = 37;
    FixedValues.RIGHT = 39;
    FixedValues.SHOOT = 13;
    GameEngine.player1 = new Player("Alexander", "player1", FixedValues.PLAYER_1);
    GameEngine.player2 = new Player("Joshua", "player2", FixedValues.PLAYER_2);
    GameEngine.currentPlayer = GameEngine.player1;
    var ctx = null;
    FixedValues.fieldWidth = 60;
    FixedValues.fieldHeight = 60;
    FixedValues.numberOfColumns = 10;
    FixedValues.numberOfRows = 10;
    var board = document.getElementById("board");
    ctx = board.getContext("2d");
    GameEngine.Board = new Board(ctx, FixedValues.numberOfColumns, FixedValues.numberOfRows, true);
    GameEngine.Barrier = new Barrier();
    GameEngine.Knife = new Weapon("Knife", 10);
    GameEngine.Gun = new Weapon("Gun", 10);
    GameEngine.FlameThrower = new Weapon("FlameThrower", 10);
    GameEngine.KNIFE = new Weapon("KNIFE", 10);

    GameEngine.Board.drawEmptyChessField(ctx, FixedValues.fieldWidth, FixedValues.fieldHeight);
    // GameEngine.Board.positionElementsByRandom(FixedValues.BARRIER);
    // GameEngine.Board.positionElementsByRandom(FixedValues.BARRIER);
    // GameEngine.Board.positionElementsByRandom(FixedValues.BARRIER);
    // GameEngine.Board.positionElementsByRandom(FixedValues.BARRIER);
    // GameEngine.Board.positionElementsByRandom(FixedValues.BARRIER);
    // GameEngine.Board.positionElementsByRandom(FixedValues.BARRIER);
    // GameEngine.Board.positionElementsByRandom(FixedValues.BARRIER);
    // GameEngine.Board.positionElementsByRandom(FixedValues.BARRIER);
    // GameEngine.Board.positionElementsByRandom(FixedValues.BARRIER);
    // GameEngine.Board.positionElementsByRandom(FixedValues.BARRIER);
    // GameEngine.Board.positionElementsByRandom(FixedValues.BARRIER);
    // GameEngine.Board.positionElementsByRandom(FixedValues.BARRIER);
    // GameEngine.Board.positionElementsByRandom(FixedValues.BARRIER);
    // GameEngine.Board.positionElementsByRandom(FixedValues.PLAYER_1);
    // GameEngine.Board.positionElementsByRandom(FixedValues.PLAYER_2);
    // GameEngine.Board.positionElementsByRandom(FixedValues.WEAPON_KNIFE);
    // GameEngine.Board.positionElementsByRandom(FixedValues.WEAPON_GUN);
    // GameEngine.Board.positionElementsByRandom(FixedValues.WEAPON_FLAME_THROWER);
    GameEngine.Board.positionElementsByRandom(FixedValues.WEAPON_BOMB);
// Representation on the board

    if(document.addEventListener){
        document.addEventListener('keypress', function(e){
            switch(e.keyCode){
                case FixedValues.SHOOT: GameEngine.Board.fire(); break;
                case FixedValues.LEFT: GameEngine.Board.movePlayerLeft(); break;
                case FixedValues.UP: GameEngine.Board.movePlayerUp(); break;
                case FixedValues.RIGHT: GameEngine.Board.movePlayerRight(); break;
                case FixedValues.DOWN: GameEngine.Board.movePlayerDown(); break;
                default: console.log(e.keyCode); break;
            }
        }, false)
    }


    // drawEmptyChessField(ctx, FixedValues.fieldWidth, FixedValues.fieldHeight);
    // drawChessField(ctx, FixedValues.fieldWidth, FixedValues.FixedValues.fieldHeight, "#1f1f1", "#d1eefc");
            // drawBarrier(ctx, 5, 5, FixedValues.fieldWidth, FixedValues.fieldWidth, "#FF0000");
    // console.log(GameEngine.player1);
    // console.log(GameEngine.player2);
};


// Elements of the game...








/**
 * Draw an empty chess field
 *
function drawEmptyChessField(context, fieldWidth, fieldHeight){
    var x = 100;
    var y = 100;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x+fieldWidth, y);
    context.lineTo(x+fieldWidth, y+fieldHeight);
    context.lineTo(x, y+fieldHeight);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
}

// /**
//  * Draw an empty field
//  *
// function drawEmptyChessField(context, x, y, fieldWidth, fieldHeight){
//     context.beginPath();
//     context.moveTo(x * fieldWidth, y * fieldHeight);
//     context.lineTo(fieldWidth, fieldHeight);
//     context.closePath();
//     context.stroke();
// }



// /**
//  * Draw an Star explosion
//  */
// function drawStarExplosion(context, fieldWidth, fieldHeight){
//     for (var y = 0; y < 10; y++) {
//         for (var x = 0; x < 10; x++) {
//             context.beginPath();
//             context.moveTo(x * fieldWidth, y * fieldHeight);
//             context.lineTo(fieldWidth, fieldHeight);
//             context.closePath();
//             context.stroke();
//         }
//     }
// }


/**
 * Test of dynamic assigned player
 */
function showResult(){
    if (document.getElementById('player1Radio').checked) {
        GameEngine.player1.showDamage();
    } else {
        GameEngine.player2.showDamage();
    }
}
