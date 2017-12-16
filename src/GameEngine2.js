/**
 * Created by aspetko on 06.12.17.
 */
/////////////////////////////
// TODO:
////////////////////////////
// - Set focus of new Game away from button
// - When to pick up the weapon, when I reach it or when I leave the square?
// - Does shoting count as a move?
// - Does taking up the shield count as one move?
// - Does changing the default by the other weapon count as a move?
// - Can I change the direction while I am moving?
// - Do I show again the directions that are possible, while I am moving?
// - Redraw use thinner line
// - Redraw possible ways
// - Count how many steps have been done
// - Draw possible moves removing already taken steps
// - Is raising the shield counted as a single move?
// - Can I move with a raised shield.
// - drawEmptyChessFieldPossible adjust, width and hight when not 10*10 matrix is given



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

////////////////////////////
// Helper Methods
////////////////////////////
function generateRandom(maxvalue) {
    return Math.floor(Math.random() * (maxvalue-1));
}

function disableWeaponsAndItems(id){
    document.getElementById(id).style.pointerEvents="hidden";
    document.getElementById(id).style.opacity = "0.6";
}


///////////////////////////
// Game Control
///////////////////////////

/**
 * Read the game, player and other settings
 */
GameEngine.newGame = function () {
    // Set up the players
    var pName1= $("#player1Name").val();
    var pName2= $("#player2Name").val();
    // Players
    GameEngine.player1 = new Player(pName1, "player1", FixedValues.PLAYER_1);
    GameEngine.player2 = new Player(pName2, "player2", FixedValues.PLAYER_2);
    GameEngine.currentPlayer = GameEngine.player1;
    document.getElementById("currentPlayerName").innerHTML = "<p>"+pName1+"</p>";
    document.getElementById("currentPlayerName2").innerHTML = "<p>"+pName2+"</p>";

    // Calculate the board by user selection and set up additional parameters
    GameEngine.numberOfColumns = $("#cols").val();
    GameEngine.numberOfRows = $("#rows").val();
    GameEngine.numberOfObstacles = $("#obstacles").val();
    GameEngine.numberOfMoves= $("#numberOfMoves").val();
    var board = document.getElementById("board");
    GameEngine.fieldWidth = board.width/ GameEngine.numberOfColumns;
    GameEngine.fieldHeight = board.height / GameEngine.numberOfRows;

    // Setting up the default Weapon Player 1
    if (document.getElementById('CV1').checked){
        document.getElementById("superHeroDefaultWeapon").innerHTML = "<p>"+GameEngine.captainVolume.defaultWeapon+"</p>";
        GameEngine.player1.superHeroClass = GameEngine.captainVolume;
    } else if (document.getElementById('PH1').checked){
        document.getElementById("superHeroDefaultWeapon").innerHTML = "<p>"+GameEngine.parryHotter.defaultWeapon+"</p>";
        GameEngine.player1.superHeroClass = GameEngine.parryHotter;
    } else if (document.getElementById('CL1').checked){
        document.getElementById("superHeroDefaultWeapon").innerHTML = "<p>"+GameEngine.caraLoft.defaultWeapon+"</p>";
        GameEngine.player1.superHeroClass = GameEngine.caraLoft;
    } else if (document.getElementById('LT1').checked){
        document.getElementById("superHeroDefaultWeapon").innerHTML = "<p>"+GameEngine.lordTandump.defaultWeapon+"</p>";
        GameEngine.player1.superHeroClass = GameEngine.lordTandump;
    } else{
        document.getElementById("superHeroDefaultWeapon").innerHTML = "<p>Error: No more super heros defined</p>";
    }

    // Setting up the default Weapon Player 2
    if (document.getElementById('CV2').checked){
        document.getElementById("superHeroDefaultWeapon2").innerHTML = "<p>"+GameEngine.captainVolume.defaultWeapon+"</p>";
        GameEngine.player2.superHeroClass = GameEngine.captainVolume;
    } else if (document.getElementById('PH2').checked){
        document.getElementById("superHeroDefaultWeapon2").innerHTML = "<p>"+GameEngine.parryHotter.defaultWeapon+"</p>";
        GameEngine.player2.superHeroClass = GameEngine.parryHotter;
    } else if (document.getElementById('CL2').checked){
        document.getElementById("superHeroDefaultWeapon2").innerHTML = "<p>"+GameEngine.caraLoft.defaultWeapon+"</p>";
        GameEngine.player2.superHeroClass = GameEngine.caraLoft;
    } else if (document.getElementById('LT2').checked){
        document.getElementById("superHeroDefaultWeapon2").innerHTML = "<p>"+GameEngine.lordTandump.defaultWeapon+"</p>";
        GameEngine.player2.superHeroClass = GameEngine.lordTandump;
    } else{
        document.getElementById("superHeroDefaultWeapon2").innerHTML = "<p>Error: No more super heros defined</p>";
    }

    // Disable the other weapons and items
    disableWeaponsAndItems("knifeWeapon");
    disableWeaponsAndItems("gunWeapon");
    disableWeaponsAndItems("flameThrowerWeapon");
    disableWeaponsAndItems("bombWeapon");
    disableWeaponsAndItems("shield");
    disableWeaponsAndItems("knifeWeapon2");
    disableWeaponsAndItems("gunWeapon2");
    disableWeaponsAndItems("flameThrowerWeapon2");
    disableWeaponsAndItems("bombWeapon2");
    disableWeaponsAndItems("shield2");

    GameEngine.gameRunning = true;
    $(document).keydown(function(e) {
        switch(e.which) {
            case FixedValues.END_MOVE: // Enter
                console.log("END Move requested");
                break;
            case FixedValues.LEFT:
                console.log("<- pressed");
                GameEngine.Board.movePlayerLeft();
                break;
            case FixedValues.SHOOT:
                console.log("Fire");
                GameEngine.Board.fire();
                break;
            case FixedValues.SHIELD:
                console.log("Shield");
                GameEngine.Board.shield();
                break;
            case FixedValues.UP:
                console.log("/\\ pressed");
                GameEngine.Board.movePlayerUp();
                break;
            case FixedValues.RIGHT:
                console.log("-> pressed");
                GameEngine.Board.movePlayerRight();
                break;
            case FixedValues.DOWN:
                console.log("\\/ pressed");
                GameEngine.Board.movePlayerDown();
                break;
            case FixedValues.CHANGE_WEAPON:
                console.log("Change Weapon pressed");
                GameEngine.Board.changeWeapon();
                break;
            default:
                // console.log(e.which);
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    GameEngine.Knife = new Weapon("Knife", 50, 5, 1);
    GameEngine.Gun = new Weapon("Gun", 10, 10, 10);
    GameEngine.FlameThrower = new Weapon("FlameThrower", 33, 15, 4);
    GameEngine.BOMB = new Weapon("Bomb", 70, 25, 5);

    GameEngine.SuperSonicSound = new Weapon("Super Sonic Sound", 70, 25, 5);
    GameEngine.MagicSpell = new Weapon("Magic Spell", 70, 25, 5);
    GameEngine.CaraLoft = new Weapon("Power Seduce Beam", 70, 25, 5);
    GameEngine.AlternativeTruthBeam = new Weapon("Alternative Truth Beam", 70, 25, 5);

    GameEngine.Board = new Board();
    GameEngine.Board.resetBoard(); // Just to be sure...
    GameEngine.Board.drawEmptyChessField();

    // Representation on the board
    for (var obstacles=0; obstacles<GameEngine.numberOfObstacles; obstacles++){
        GameEngine.Board.positionElementsByRandom(FixedValues.BARRIER);
    }
    GameEngine.Board.positionElementsByRandom(FixedValues.PLAYER_1);
    GameEngine.Board.positionElementsByRandom(FixedValues.PLAYER_2);
    GameEngine.Board.positionElementsByRandom(FixedValues.WEAPON_KNIFE);
    GameEngine.Board.positionElementsByRandom(FixedValues.WEAPON_GUN);
    GameEngine.Board.positionElementsByRandom(FixedValues.WEAPON_FLAME_THROWER);
    GameEngine.Board.positionElementsByRandom(FixedValues.WEAPON_BOMB);

    GameEngine.Board.showPossibleMoves();

};

GameEngine.switchPlayers = function(playerNr) {
    if (playerNr === 1){
        console.log("Move to player 2");
        GameEngine.currentPlayer = GameEngine.player2;
        $("#Current1").css('color', 'black');
        $("#Current2").css('color', 'red');
    } else {
        console.log("Move to player 1");
        $("#Current1").css('color', 'red');
        $("#Current2").css('color', 'black');
        GameEngine.currentPlayer = GameEngine.player1;
    }
};

GameEngine.switchPlayer = function(player) {
    if (player.playerNr === 1){
        console.log("Move to player 2");
        GameEngine.currentPlayer = GameEngine.player2;
    } else {
        console.log("Move to player 1");
        GameEngine.currentPlayer = GameEngine.player1;
    }
};

function showResult(){
    GameEngine.currentPlayer.showDamage();
}

/**
 * Game matrix
 * @constructor
 */
function Board() {
    this.bounceOfThePlayer = document.getElementById('bouncePlayer').checked;
    this.bounceOfTheWeapon = document.getElementById('bounceWeapon').checked;
    var board = document.getElementById("board");
    this.context = board.getContext("2d");

    this.debugPlayer = function(player){
        console.log("player.pos_x: "+player.pos_x);
        console.log("player.pos_y: "+player.pos_y);
        console.log("player.playerNr: "+player.playerNr);
    };

    this.fields = new Array(GameEngine.numberOfColumns);
    for (var x =0; x<GameEngine.numberOfColumns; x++){
        this.fields[x] = new Array(GameEngine.numberOfRows);
        for (var y=0;  y<GameEngine.numberOfRows; y++){
            this.fields[x][y] = FixedValues.EMPTY_FIELD;
        }
    }

    this.drawEmptyChessField = function() {
        this.context.beginPath();
        for (var x = 0, y = 0; x < GameEngine.numberOfColumns; x++) {
            this.context.moveTo(x * GameEngine.fieldWidth, y);
            this.context.lineTo(x * GameEngine.fieldWidth, 10 * GameEngine.fieldHeight);
            this.context.lineWidth = 1;
            this.context.strokeStyle = "#000";
            this.context.stroke();
        }
        for (x = 0, y = 0; y < GameEngine.numberOfRows; y++) {
            this.context.moveTo(x * GameEngine.fieldWidth, y * GameEngine.fieldHeight);
            this.context.lineTo(10 * GameEngine.fieldWidth, y * GameEngine.fieldHeight);
            this.context.lineWidth = 1;
            this.context.strokeStyle = "#000";
            this.context.stroke();
        }
    };

    this.positionElementsByRandom = function(element) {
        var done = false;

        while (!done){
            var random_x = generateRandom(GameEngine.numberOfColumns);
            var random_y = generateRandom(GameEngine.numberOfRows);
            if (this.fields[random_x][random_y] === FixedValues.EMPTY_FIELD){
                done = true;
                this.fields[random_x][random_y] = element;
                switch(element){
                    case FixedValues.PLAYER_1:
                        this.drawPlayer(random_x, random_y, "#FFFFFF");
                        GameEngine.player1.pos_x = random_x;
                        GameEngine.player1.pos_y = random_y;
                        break;
                    case FixedValues.PLAYER_2:
                        this.drawPlayer(random_x, random_y, "#000000");
                        GameEngine.player2.pos_x = random_x;
                        GameEngine.player2.pos_y = random_y;
                        break;
                    case FixedValues.BARRIER:
                        this.drawBarrier(random_x, random_y, "#FFFFFF");
                        break;
                    case FixedValues.WEAPON_KNIFE:
                        this.drawKnife(random_x, random_y);
                        break;
                    case FixedValues.WEAPON_GUN:
                        this.drawGun(random_x, random_y);
                        break;
                    case FixedValues.WEAPON_FLAME_THROWER:
                        this.drawFlameThrower(random_x, random_y);
                        break;
                    case FixedValues.WEAPON_BOMB:
                        this.drawBomb(random_x, random_y);
                        break;
                }
            } else {
                console.log("Placed occupied ["+random_x+"]["+random_y+"]...")
            }
        }
    };

    this.debug = function() {
        var output = "   ";
        var sep ="";
        for (var i =0; i<GameEngine.numberOfColumns; i++){
            output += sep+i;
            sep = " ";
        }
        output += "\n";
        sep =" ";
        for (var y=0; y<GameEngine.numberOfRows; y++){
            output += y+"[";
            for (var x=0; x<GameEngine.numberOfColumns; x++){
                output += sep+this.fields[x][y];
            }
            output += "]\n";
        }
        console.log(output);
    };

    this.resetBoard = function(){
        for (var y=0; y < GameEngine.numberOfColumns; y++){
            for (var x=0; x < GameEngine.numberOfRows; x++){
                this.fields[x][y]=FixedValues.EMPTY_FIELD;
            }
        }
    };

    this.drawBarrier = function(x, y, fillStyle){
        this.context.beginPath();
        this.context.moveTo(x * GameEngine.fieldWidth+15, y * GameEngine.fieldHeight+5);
        this.context.lineTo(x * GameEngine.fieldWidth+45, y * GameEngine.fieldHeight+5);
        this.context.lineTo(x * GameEngine.fieldWidth+55, y * GameEngine.fieldHeight+15);
        this.context.lineTo(x * GameEngine.fieldWidth+55, y * GameEngine.fieldHeight+45);
        this.context.lineTo(x * GameEngine.fieldWidth+45, y * GameEngine.fieldHeight+55);
        this.context.lineTo(x * GameEngine.fieldWidth+15, y * GameEngine.fieldHeight+55);
        this.context.lineTo(x * GameEngine.fieldWidth+5, y * GameEngine.fieldHeight+45);
        this.context.lineTo(x * GameEngine.fieldWidth+5, y * GameEngine.fieldHeight+15);
        this.context.lineTo(x * GameEngine.fieldWidth+15, y * GameEngine.fieldHeight+5);
        this.context.fillStyle = fillStyle;
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    };

    this.drawPlayer = function(x, y, fillStyle){
        this.context.beginPath();
        this.context.arc(x * GameEngine.fieldWidth+10, y *  GameEngine.fieldHeight+10, 10, 0, 6.28, false);
        this.context.moveTo(x * GameEngine.fieldWidth+20, y *  GameEngine.fieldHeight+10);
        this.context.lineTo(x * GameEngine.fieldWidth+50,  y *  GameEngine.fieldHeight+20);
        this.context.lineTo(x * GameEngine.fieldWidth+20, y *  GameEngine.fieldHeight+60);
        this.context.fillStyle = fillStyle;
        this.context.stroke();
        this.context.fill();
    };

    this.drawKnife = function(x, y){
        this.context.beginPath();
        this.context.strokeStyle = '#000000';
        this.context.fillRect(x * GameEngine.fieldWidth+17, y * GameEngine.fieldHeight+29, 6, 13);
        this.context.beginPath();
        this.context.moveTo(x * GameEngine.fieldWidth+17, y * GameEngine.fieldHeight+29);
        this.context.lineTo(x * GameEngine.fieldWidth+17, y * GameEngine.fieldHeight+6);
        this.context.lineTo(x * GameEngine.fieldWidth+23, y * GameEngine.fieldHeight+12);
        this.context.lineTo(x * GameEngine.fieldWidth+23, y * GameEngine.fieldHeight+29);
        this.context.closePath();
        this.context.stroke();
        this.context.closePath();
    };

    this.drawGun = function(x, y){
        this.context.beginPath();
        this.context.strokeStyle = '#000000';
        this.context.fillRect(x*GameEngine.fieldWidth+10, y*GameEngine.fieldHeight+9, 10, 27);
        this.context.fillRect(x*GameEngine.fieldWidth+20, y*GameEngine.fieldHeight+9, 25, 9);
        this.context.closePath();
        this.context.stroke();
    };

    this.drawBomb = function(x, y){
        this.context.fillStyle = '#000000';
        this.context.strokeStyle = '#000000';
        this.context.beginPath();
        this.context.arc(x* GameEngine.fieldWidth+25, y*GameEngine.fieldHeight+25, 10, 0, 2 * Math.PI, false);
        this.context.moveTo(x * GameEngine.fieldWidth+25, y * GameEngine.fieldHeight+15);
        this.context.lineTo(x * GameEngine.fieldWidth+25, y * GameEngine.fieldHeight+5);
        this.context.closePath();
        this.context.fill();
        this.context.lineWidth = 5;
        this.context.stroke();
    };

    this.drawFlameThrower = function(x, y){
        this.context.strokeStyle = 'red';
        this.context.beginPath();
        this.context.arc(x* GameEngine.fieldWidth+25, y*GameEngine.fieldHeight+25, 12, 0, 6.28, false);
        this.context.closePath();
        this.context.stroke();
        this.context.beginPath();
        this.context.arc(x* GameEngine.fieldWidth+25, y*GameEngine.fieldHeight+25, 11, 0, 6.28, false);
        this.context.closePath();
        this.context.stroke();
        this.context.beginPath();
        this.context.arc(x* GameEngine.fieldWidth+25, y*GameEngine.fieldHeight+25, 9, 0, 6.28, false);
        this.context.closePath();
        this.context.stroke();
        this.context.beginPath();
        this.context.arc(x* GameEngine.fieldWidth+25, y*GameEngine.fieldHeight+25, 7, 0, 6.28, false);
        this.context.closePath();
        this.context.stroke();
    };

    this.drawMoveIfPossible = function(x, y){
        if (x<0 || y<0 || x>=GameEngine.numberOfColumns || y>=GameEngine.numberOfRows) {
            if (GameEngine.bounceOfThePlayer) {// "bounceOfTheBorder: reduce possible steps"
                console.log("bounceOfThePlayer "+this.bounceOfThePlayer);
                return true; // Move not possible
            } else{
                console.log("Implement me: bounceOfThePlayer");
                // TODO: Implement me: bounceOfThePlayer
                return true;
            }
        }
        console.log(x, y, this.fields[x][y]);
        switch (this.fields[x][y]) {
            case FixedValues.EMPTY_FIELD:
            case FixedValues.WEAPON_KNIFE:
            case FixedValues.WEAPON_GUN:
            case FixedValues.WEAPON_FLAME_THROWER:
            case FixedValues.WEAPON_BOMB:
                this.drawEmptyChessFieldPossible(x, y);
                return false;
            case FixedValues.PLAYER_1:
            case FixedValues.PLAYER_2:
            case FixedValues.BARRIER:
                return true;
        }
    };

    this.showPossibleMoves = function(){
        // x axis - left of figure
        for (count = 1; count <GameEngine.numberOfMoves+1 ; count++){
            var stop = this.drawMoveIfPossible(GameEngine.currentPlayer.pos_x-count, GameEngine.currentPlayer.pos_y);
            if (stop) {
                count = GameEngine.numberOfMoves+2;
            }
        }
        // x axis - right of figure
        for (count = 1; count <GameEngine.numberOfMoves+1 ; count++){
            var stop = this.drawMoveIfPossible(GameEngine.currentPlayer.pos_x+count, GameEngine.currentPlayer.pos_y);
            if (stop) {
                count = GameEngine.numberOfMoves+2;
            }
        }

        // y axis -  above of figure
        for (count = 1; count <GameEngine.numberOfMoves+1 ; count++){
            var stop = this.drawMoveIfPossible(GameEngine.currentPlayer.pos_x, GameEngine.currentPlayer.pos_y-count);
            if (stop) {
                count = GameEngine.numberOfMoves+2;
            }
        }

        // y axis - below of figure
        for (count = 1; count <GameEngine.numberOfMoves+1 ; count++){
            var stop = this.drawMoveIfPossible(GameEngine.currentPlayer.pos_x, GameEngine.currentPlayer.pos_y+count);
            if (stop) {
                count = GameEngine.numberOfMoves+2;
            }
        }
    };

    this.drawEmptyChessFieldPossible = function(x, y){
        this.context.strokeStyle = '#fff';
        this.context.strokeRect(x * GameEngine.fieldWidth, y * GameEngine.fieldHeight, GameEngine.fieldWidth, GameEngine.fieldHeight);
        this.context.moveTo(x * GameEngine.fieldWidth+15, y * GameEngine.fieldHeight);
        this.context.lineTo(x * GameEngine.fieldWidth, y * GameEngine.fieldHeight+15);
        this.context.moveTo(x * GameEngine.fieldWidth+30, y * GameEngine.fieldHeight);
        this.context.lineTo(x * GameEngine.fieldWidth, y * GameEngine.fieldHeight+30);
        this.context.moveTo(x * GameEngine.fieldWidth+45, y * GameEngine.fieldHeight);
        this.context.lineTo(x * GameEngine.fieldWidth, y * GameEngine.fieldHeight+45);
        this.context.moveTo(x * GameEngine.fieldWidth+60, y * GameEngine.fieldHeight);
        this.context.lineTo(x * GameEngine.fieldWidth, y * GameEngine.fieldHeight+60);
        this.context.moveTo(x * GameEngine.fieldWidth+60, y * GameEngine.fieldHeight+15);
        this.context.lineTo(x * GameEngine.fieldWidth+15, y * GameEngine.fieldHeight+60);
        this.context.moveTo(x * GameEngine.fieldWidth+60, y * GameEngine.fieldHeight+30);
        this.context.lineTo(x * GameEngine.fieldWidth+30, y * GameEngine.fieldHeight+60);
        this.context.moveTo(x * GameEngine.fieldWidth+60, y * GameEngine.fieldHeight+45);
        this.context.lineTo(x * GameEngine.fieldWidth+45, y * GameEngine.fieldHeight+60);
        this.context.stroke();
        this.context.strokeStyle = '#000';
    };

    this.movePlayerLeft = function(){
        var player = GameEngine.currentPlayer;
        if (player.pos_x == 0){ // leftmost column, continue on the right column ...
            console.log("leftmost column, continue on the right column ...");
            if (GameEngine.bounceOfThePlayer){
                console.log("bounceOfThePlayer: no move possible");
            } else {
                var newPos = GameEngine.numberOfColumns-1;
                if (this.canMove(newPos, player.pos_y)){
                    this.movePlayerMatrix(player, newPos, player.pos_y);
                } else {
                    console.log("Move not possible, field occupied");
                }
            }
        } else { // check if element left is accessible
            var x = player.pos_x - 1;
            if (this.canMove(x, player.pos_y)){
                this.movePlayerMatrix(player, x, player.pos_y);
            } else {
                console.log("Move not possible, field occupied");
            }
        }
    };

    this.movePlayerRight = function(){
        var player = GameEngine.currentPlayer;
        if (player.pos_x == GameEngine.numberOfColumns-1){ // rightmost column, continue on the left ...
            console.log("rightmost column, continue on the right column ...");
            if (GameEngine.bounceOfThePlayer){
                console.log("bounceOfThePlayer: no move possible");
            } else {
                var newPos = 0;
                if (this.canMove(newPos, player.pos_y)){
                    this.movePlayerMatrix(player, newPos, player.pos_y);
                } else {
                    console.log("Move not possible, field occupied");
                }
            }
        } else { // check if element right is not a barrier
            var x = player.pos_x + 1;
            if (this.canMove(x, player.pos_y)){
                this.movePlayerMatrix(player, x, player.pos_y);
            } else {
                console.log("Move not possible, field occupied");
            }
        }
    };

    this.movePlayerUp = function(){
        var player = GameEngine.currentPlayer;
        // this.debugPlayer(player);
        if (player.pos_y == 0){ // topmost row, continue on the lowest row ...
            console.log("topmost row, continue on the lowest row ...");
            if (GameEngine.bounceOfThePlayer){
                console.log("bounceOfThePlayer: no move possible");
            } else {
                var newPos = GameEngine.numberOfRows-1;
                if (this.canMove(player.pos_x, newPos)){
                    this.movePlayerMatrix(player, player.pos_x, player.pos_y-1);
                } else {
                    console.log("Move not possible, field occupied");
                }
            }
        } else { // check if element above is not a barrier
            var y = player.pos_y - 1;
            if (this.canMove(player.pos_x, y)){
                this.movePlayerMatrix(player, player.pos_x, y);
            } else {
                console.log("Move not possible, field occupied");
            }
        }
    };

    this.movePlayerDown = function(player){
        var player = GameEngine.currentPlayer;
        // this.debugPlayer(player);
        if (player.pos_y == GameEngine.numberOfRows-1){ // lowest row, continue on the topmost row ...
            console.log("lowest row, continue on the topmost row ...");
            if (this.bounceOfThePlayer){
                console.log("bounceOfThePlayer: no move possible");
            } else {
                var newPos = 0;
                if (this.canMove(player.pos_x, newPos)){
                    this.movePlayerMatrix(player, player.pos_x, player.pos_y+1);
                } else {
                    console.log("Move not possible, field occupied");
                }
            }
        } else { // check if element below is not a barrier
            var y = player.pos_y + 1;
            if (this.canMove(player.pos_x, y)){
                this.movePlayerMatrix(player, player.pos_x, y);
            } else {
                console.log("Move not possible, field occupied");
            }
        }
    };

    this.fire = function () {
        console.log("Fire");
    };

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

    this.redraw = function(x,y, playerNr, newX, newY){
        console.log("Redraw called ("+x+", "+y+")->("+newX+", "+newY+")");
        this.context.clearRect(x * GameEngine.fieldWidth, y * GameEngine.fieldHeight, GameEngine.fieldWidth, GameEngine.fieldHeight);
        this.context.beginPath();
        this.context.rect(x * GameEngine.fieldWidth, y * GameEngine.fieldHeight, GameEngine.fieldWidth, GameEngine.fieldHeight);
        // this.context.fillStyle = "#FFF";
        this.context.closePath();
        this.context.stroke();
        // this.context.fill();

        if (playerNr == 1){
            this.drawPlayer(newX, newY, "#FFFFFF");
        } else {
            this.drawPlayer(newX, newY, "#000000");
        }
    };

    this.canMove = function(x,y){
        switch(this.fields[x][y]){
            case FixedValues.EMPTY_FIELD:          return true;
            case FixedValues.PLAYER_1:             return false;
            case FixedValues.PLAYER_2:             return false;
            case FixedValues.BARRIER:              return false;
            case FixedValues.WEAPON_KNIFE:         return true;
            case FixedValues.WEAPON_GUN:           return true;
            case FixedValues.WEAPON_FLAME_THROWER: return true;
            case FixedValues.WEAPON_BOMB:          return true;
        }
        return false;
    }
}

/**
 * Superhero Class
 * @param name
 * @param defaultWeapon
 * @constructor
 */
function SuperHero(name, defaultWeapon){
    this.name = name;
    this.defaultWeapon = defaultWeapon;
}

function Shield(){
    this.state = false;

    this.liftUp = function () {
        this.state = true;
    };
    this.lower = function () {
        this.state = false;
    }
}

/**
 * Players
 * @param name the name of the player
 * @param playerState the state visualization
 * @param playerNr the id
 * @constructor
 */
function Player(name, playerState, playerNr) {
    this.name = name;
    this.playerNr = playerNr;
    this.playerState = playerState;
    this.health = 100;
    this.pos_x = -1;
    this.pos_y = -1;
    this.superHeroDefaultWeapon = null;
    this.knifeWeapon = false;
    this.gunWeapon = false;
    this.flameThrowerWeapon = false;
    this.bombWeapon = false;
    this.shield = new Shield();
    this.superHeroClass = null;
    this.selectedWeapon = this.superHeroDefaultWeapon;
    document.getElementById(this.playerState).style.backgroundColor = "green";

    this.showDamage = new function () {
        // this.health -= damage;
        var line = document.getElementById("tester").value; // TODO: exchange by real event
        switch(line){
            case '0':  this.health = 100; break;
            case '100': this.health = 0;break;
            default:
                this.health = 100-line;
        }

        if (this.health === 100) {
            $("#" + this.playerState).css('background', 'green');
        } else if (this.health === '0') {
            console.log("0");
            $("#"+this.playerState).css('background', 'red');
        } else {
            $("#"+this.playerState).css('background', 'linear-gradient(to bottom, red ' + this.health + '%, green 100%)');
        }
    };

    this.isAlive = function () {
        return this.health > 0;
    };

}

window.onload = function(){
    // Graphical Elements Placeholder
    FixedValues.EMPTY_FIELD = 0;
    FixedValues.PLAYER_1 = 1;
    FixedValues.PLAYER_2 = 2;
    FixedValues.BARRIER = 3;
    FixedValues.WEAPON_KNIFE = 4;
    FixedValues.WEAPON_GUN = 5;
    FixedValues.WEAPON_FLAME_THROWER = 6;
    FixedValues.WEAPON_BOMB = 7;

    // Player
    GameEngine.player1 = null;
    GameEngine.player2 = null;

    // Physical Board
    var board = document.getElementById("board");
    FixedValues.fieldWidth = -1;
    FixedValues.fieldHeight = -1;
    GameEngine.numberOfColumns = -1;
    GameEngine.numberOfRows = -1;
    GameEngine.numberOfObstacles = -1;
    GameEngine.gameRunning = false;

    // Super hero
    GameEngine.captainVolume = new SuperHero("Captain Volume", "Super Sonic Sound");
    GameEngine.parryHotter = new SuperHero("Parry Hotter", "Magic Spell");
    GameEngine.caraLoft = new SuperHero("Cara Loft", "Power Seduce Beam");
    GameEngine.lordTandump = new SuperHero("Lord Tandump", "Alternative Truth Beam");

    // Keyboard control
    FixedValues.LEFT = 37;
    FixedValues.UP = 38;
    FixedValues.RIGHT = 39;
    FixedValues.DOWN = 40;
    FixedValues.SHOOT = 32;
    FixedValues.SHIELD = 83;
    FixedValues.END_MOVE = 13;
    FixedValues.CHANGE_WEAPON = 67;
};

function Weapon(name, damage, damageWhenShieldIsUp, range) {
    this.name = name;
    this.damage = damage;
    this.damageWhenShieldIsUp = damageWhenShieldIsUp;
    this.range = range;
};

function gameOver(name){
    document.getElementById("message1").innerHTML = "Congratulations "+name+" , you have won the challenge...";
    document.getElementById("message2").innerHTML = "... but war does not have a winner.";
}