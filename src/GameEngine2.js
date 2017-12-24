/**
 * Created by aspetko on 06.12.17.
 */
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

function enableWeaponsAndItems(id){
    document.getElementById(id).style.pointerEvents="visible";
    document.getElementById(id).style.opacity = "1";
}

///////////////////////////
// Game Control
///////////////////////////

/**
 * Read the game, player and other settings
 */
GameEngine.newGame = function () {

    // Set up the players
    let pName1= $("#player1Name").val();
    let pName2= $("#player2Name").val();
    // Players
    GameEngine.player1 = new Player(pName1, FixedValues.PLAYER_1_ID, FixedValues.PLAYER_1);
    GameEngine.player2 = new Player(pName2, FixedValues.PLAYER_2_ID, FixedValues.PLAYER_2);
    GameEngine.currentPlayer = GameEngine.player1;
    document.getElementById(FixedValues.CURRENT_PLAYER_NAME_ID).innerHTML = "<p>"+pName1+"</p>";
    document.getElementById(FixedValues.CURRENT_PLAYER_NAME_2_ID).innerHTML = "<p>"+pName2+"</p>";

    // Calculate the board by user selection and set up additional parameters
    let dimension = $( "#dimension" ).val();
    switch(dimension){
        case '10*10':
            GameEngine.numberOfColumns = 10;
            GameEngine.numberOfRows = 10;
            GameEngine.corrector = 0;
            GameEngine.factor = 0;
            break;
        case '9*9':
            GameEngine.numberOfColumns = 9;
            GameEngine.numberOfRows = 9;
            GameEngine.corrector = 8;
            GameEngine.factor = 1;
            break;
        case '8*8':
            GameEngine.numberOfColumns = 8;
            GameEngine.numberOfRows = 8;
            GameEngine.corrector = 16;
            GameEngine.factor = 2;
            break;
        case '7*7':
            GameEngine.numberOfColumns = 7;
            GameEngine.numberOfRows = 7;
            GameEngine.factor = 3;
            GameEngine.corrector = 25;
            break;
        case '6*6':
            GameEngine.numberOfColumns = 6;
            GameEngine.numberOfRows = 6;
            GameEngine.corrector = 40;
            GameEngine.factor = 4;
            break;
        case '5*5':
            GameEngine.numberOfColumns = 5;
            GameEngine.numberOfRows = 5;
            GameEngine.corrector = 60;
            GameEngine.factor = 5;
            break
    }
    GameEngine.numberOfObstacles = $(FixedValues.OBSTACLES_ID).val();
    GameEngine.numberOfMoves = $(FixedValues.NUMBER_OF_MOVES).val();
    let board = document.getElementById(FixedValues.BOARD_ID);
    GameEngine.fieldWidth = board.width / GameEngine.numberOfColumns;
    GameEngine.fieldHeight = board.height / GameEngine.numberOfRows;

    // Setting up the default Weapon Player 1
    if (document.getElementById(FixedValues.CV1_ID).checked){
        document.getElementById(FixedValues.SUPER_HERO_DEFAULT_WEAPON_ID).innerHTML = "<p>"+GameEngine.captainVolume.defaultWeapon+"</p>";
        GameEngine.player1.superHeroClass = GameEngine.captainVolume;
    } else if (document.getElementById(FixedValues.PH1_ID).checked){
        document.getElementById(FixedValues.SUPER_HERO_DEFAULT_WEAPON_ID).innerHTML = "<p>"+GameEngine.parryHotter.defaultWeapon+"</p>";
        GameEngine.player1.superHeroClass = GameEngine.parryHotter;
    } else if (document.getElementById(FixedValues.CL1_ID).checked){
        document.getElementById(FixedValues.SUPER_HERO_DEFAULT_WEAPON_ID).innerHTML = "<p>"+GameEngine.caraLoft.defaultWeapon+"</p>";
        GameEngine.player1.superHeroClass = GameEngine.caraLoft;
    } else if (document.getElementById(FixedValues.LT1_ID).checked){
        document.getElementById(FixedValues.SUPER_HERO_DEFAULT_WEAPON_ID).innerHTML = "<p>"+GameEngine.lordDumpnat.defaultWeapon+"</p>";
        GameEngine.player1.superHeroClass = GameEngine.lordDumpnat;
    } else{
        document.getElementById(FixedValues.SUPER_HERO_DEFAULT_WEAPON_ID).innerHTML = "<p>Error: No more super heros defined</p>";
    }

    // Setting up the default Weapon Player 2
    if (document.getElementById(FixedValues.CV2_ID).checked){
        document.getElementById(FixedValues.SUPER_HERO_DEFAULT_WEAPON_2_ID).innerHTML = "<p>"+GameEngine.captainVolume.defaultWeapon+"</p>";
        GameEngine.player2.superHeroClass = GameEngine.captainVolume;
    } else if (document.getElementById(FixedValues.PH2_ID).checked){
        document.getElementById(FixedValues.SUPER_HERO_DEFAULT_WEAPON_2_ID).innerHTML = "<p>"+GameEngine.parryHotter.defaultWeapon+"</p>";
        GameEngine.player2.superHeroClass = GameEngine.parryHotter;
    } else if (document.getElementById(FixedValues.CL2_ID).checked){
        document.getElementById(FixedValues.SUPER_HERO_DEFAULT_WEAPON_2_ID).innerHTML = "<p>"+GameEngine.caraLoft.defaultWeapon+"</p>";
        GameEngine.player2.superHeroClass = GameEngine.caraLoft;
    } else if (document.getElementById(FixedValues.LT2_ID).checked){
        document.getElementById(FixedValues.SUPER_HERO_DEFAULT_WEAPON_2_ID).innerHTML = "<p>"+GameEngine.lordDumpnat.defaultWeapon+"</p>";
        GameEngine.player2.superHeroClass = GameEngine.lordDumpnat;
    } else{
        document.getElementById(FixedValues.SUPER_HERO_DEFAULT_WEAPON_2_ID).innerHTML = "<p>Error: No more super heros defined</p>";
    }

    // Disable the other weapons and items - Player 1
    disableWeaponsAndItems(FixedValues.WEAPON_KNIFE_ID);
    disableWeaponsAndItems(FixedValues.WEAPON_GUN_ID);
    disableWeaponsAndItems(FixedValues.WEAPON_FLAME_THROWER_ID);
    disableWeaponsAndItems(FixedValues.WEAPON_BOMB_ID);
    disableWeaponsAndItems(FixedValues.SHIELD_ID);

    // Disable the other weapons and items - Player 2
    disableWeaponsAndItems(FixedValues.WEAPON_KNIFE2_ID);
    disableWeaponsAndItems(FixedValues.WEAPON_GUN2_ID);
    disableWeaponsAndItems(FixedValues.WEAPON_FLAME_THROWER2_ID);
    disableWeaponsAndItems(FixedValues.WEAPON_BOMB2_ID);
    disableWeaponsAndItems(FixedValues.SHIELD2_ID);

    GameEngine.gameRunning = true;
    $(document).keydown(function(e) {
        switch(e.which) {
            case FixedValues.END_MOVE: // Enter
                if (GameEngine.currentPlayer.movesMadeThisTime === 0){
                    console.log("Sorry, one move is minimum!");
                } else {
                    GameEngine.switchPlayer();
                }
                break;
            case FixedValues.LEFT:
                GameEngine.Board.debug();
                GameEngine.Board.movePlayerLeft();
                break;
            case FixedValues.SHOOT:
                GameEngine.Board.fire();
                break;
            case FixedValues.SHOOT_SUPER_HERO_WEAPON:
                GameEngine.Board.fireSuperHeroWeapon();
                break;
            case FixedValues.SHIELD:
                if (GameEngine.currentPlayer.shield){
                    GameEngine.currentPlayer.shield = false;
                    disableWeaponsAndItems(GameEngine.currentPlayer.playerNr == 1 ? FixedValues.SHIELD_ID : FixedValues.SHIELD2_ID);
                } else {
                    GameEngine.currentPlayer.shield = true;
                    enableWeaponsAndItems(GameEngine.currentPlayer.playerNr == 1 ? FixedValues.SHIELD_ID : FixedValues.SHIELD2_ID);
                }
                break;
            case FixedValues.UP:
                GameEngine.Board.movePlayerUp();
                GameEngine.Board.debug();
                break;
            case FixedValues.RIGHT:
                GameEngine.Board.movePlayerRight();
                GameEngine.Board.debug();
                break;
            case FixedValues.DOWN:
                GameEngine.Board.movePlayerDown();
                GameEngine.Board.debug();
                break;
            case FixedValues.CHANGE_WEAPON:
                GameEngine.Board.changeWeapon();
                GameEngine.Board.debug();
                break;
            default:
                // console.log(e.which);
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });


    GameEngine.Board = new Board();
    GameEngine.Board.resetBoard(); // Just to be sure...
    GameEngine.Board.drawEmptyChessField();

    // Representation on the board
    for (let obstacles=0; obstacles<GameEngine.numberOfObstacles; obstacles++){
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

GameEngine.switchPlayer = function() {
    if (GameEngine.currentPlayer.playerNr === 1){
        console.log("Move to player 2");
        GameEngine.currentPlayer.resetMove();
        GameEngine.currentPlayer = GameEngine.player2;
        $(FixedValues.CURRENT_1_ID).css(FixedValues.COLOR, FixedValues.COLOR_BLACK_LABEL);
        $("#Current2").css(FixedValues.COLOR, FixedValues.COLOR_RED_LABEL);
    } else {
        console.log("Move to player 1");
        $(FixedValues.CURRENT_1_ID).css(FixedValues.COLOR, FixedValues.COLOR_RED_LABEL);
        $("#Current2").css(FixedValues.COLOR, FixedValues.COLOR_BLACK_LABEL);
        GameEngine.currentPlayer.resetMove();
        GameEngine.currentPlayer = GameEngine.player1;
    }
};

GameEngine.moveMade = function(){
    GameEngine.currentPlayer.movesMadeThisTime += 1;
    console.log(GameEngine.currentPlayer.movesMadeThisTime+" move(s) made");
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
    let board = document.getElementById(FixedValues.BOARD_ID);
    this.context = board.getContext("2d");
    this.dirty = false;

    this.debugPlayer0 = function(player){
        console.dir(player);
    };

    this.debugPlayer = function(player){
        console.groupCollapsed("Player:");
        console.log("player.playerNr: "+player.playerNr);
        console.log("player.pos(x, y): (%d, %d)",player.pos_x, player.pos_y);
        console.log("moves:"+ player.movesMadeThisTime);
        console.log("KNIFE:"+player.knifeWeapon);
        console.log("GUN:"+player.gunWeapon);
        console.log("flameThrower:"+player.flameThrowerWeapon);
        console.log("Bomb:"+player.bombWeapon);
        console.groupEnd();
    };

    this.debugPlayer = function(){
        console.group("Current Player:")
        console.log("player.playerNr: %d", GameEngine.currentPlayer.playerNr);
        console.log("player.pos(x, y): (%d, %d)",GameEngine.currentPlayer.pos_x, GameEngine.currentPlayer.pos_y);
        console.log("moves: %d", GameEngine.currentPlayer.movesMadeThisTime);
        console.groupCollapsed("Weapons:");
        console.log("KNIFE:        ", GameEngine.currentPlayer.knifeWeapon);
        console.log("GUN:          ", GameEngine.currentPlayer.gunWeapon);
        console.log("flameThrower: ", GameEngine.currentPlayer.flameThrowerWeapon);
        console.log("Bomb:         ", GameEngine.currentPlayer.bombWeapon);
        console.groupEnd();
        console.groupEnd();

    };

    this.debugPlayer0 = function(){
        console.dir(GameEngine.currentPlayer);
        // console.log("GameEngine.currentPlayer.pos_x: "+GameEngine.currentPlayer.pos_x);
        // console.log("GameEngine.currentPlayer.pos_y: "+GameEngine.currentPlayer.pos_y);
        // console.log("GameEngine.currentPlayer.GameEngine.currentPlayerNr: "+GameEngine.currentPlayer.playerNr);
        // console.log("moves:"+ GameEngine.currentPlayer.movesMadeThisTime);
        // console.log("KNIFE:"+GameEngine.currentPlayer.knifeWeapon);
        // console.log("GUN:"+GameEngine.currentPlayer.gunWeapon);
        // console.log("flameThrower:"+GameEngine.currentPlayer.flameThrowerWeapon);
        // console.log("Bomb:"+GameEngine.currentPlayer.bombWeapon);
    };

    this.fields = new Array(GameEngine.numberOfColumns);
    for (let x =0; x<GameEngine.numberOfColumns; x++){
        this.fields[x] = new Array(GameEngine.numberOfRows);
        for (let y=0;  y<GameEngine.numberOfRows; y++){
            this.fields[x][y] = FixedValues.EMPTY_FIELD;
        }
    }

    this.drawEmptyChessField = function() {
        this.context.beginPath();
        for (let x = 0, y = 0; x < GameEngine.numberOfColumns; x++) {
            this.context.moveTo(x * GameEngine.fieldWidth, y);
            this.context.lineTo(x * GameEngine.fieldWidth, 10 * GameEngine.fieldHeight);
            this.context.lineWidth = 1;
            this.context.strokeStyle = FixedValues.COLOR_BLACK;
            this.context.stroke();
        }
        for (x = 0, y = 0; y < GameEngine.numberOfRows; y++) {
            this.context.moveTo(x * GameEngine.fieldWidth, y * GameEngine.fieldHeight);
            this.context.lineTo(10 * GameEngine.fieldWidth, y * GameEngine.fieldHeight);
            this.context.lineWidth = 1;
            this.context.strokeStyle = FixedValues.COLOR_BLACK;
            this.context.stroke();
        }
    };

    this.positionElementsByRandom = function(element) {
        let done = false;

        while (!done){
            let random_x = generateRandom(GameEngine.numberOfColumns);
            let random_y = generateRandom(GameEngine.numberOfRows);
            if (this.fields[random_x][random_y] === FixedValues.EMPTY_FIELD){
                done = true;
                this.fields[random_x][random_y] = element;
                switch(element){
                    case FixedValues.PLAYER_1:
                        this.drawPlayer(random_x, random_y, FixedValues.COLOR_WHITE);
                        GameEngine.player1.pos_x = random_x;
                        GameEngine.player1.pos_y = random_y;
                        break;
                    case FixedValues.PLAYER_2:
                        this.drawPlayer(random_x, random_y, FixedValues.COLOR_BLACK);
                        GameEngine.player2.pos_x = random_x;
                        GameEngine.player2.pos_y = random_y;
                        break;
                    case FixedValues.BARRIER:
                        this.drawBarrier(random_x, random_y);
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
        console.group("Board:");
        let output = "   ";
        let sep ="";
        for (let i =0; i<GameEngine.numberOfColumns; i++){
            output += sep+i;
            sep = " ";
        }
        output += "\n";
        sep =" ";
        for (let y=0; y<GameEngine.numberOfRows; y++){
            output += y+"[";
            for (let x=0; x<GameEngine.numberOfColumns; x++){
                output += sep+this.fields[x][y];
            }
            output += "]\n";
        }
        console.log(output);
        console.groupEnd();
    };

    this.resetBoard = function(){
        for (let y=0; y < GameEngine.numberOfColumns; y++){
            for (let x=0; x < GameEngine.numberOfRows; x++){
                this.fields[x][y]=FixedValues.EMPTY_FIELD;
            }
        }
    };


    /**
     * Did we reach a field with a weapon on it, take it if a) we where unarmed or b) replace it
     * @param x the x - coordinate
     * @param y the y - coordinate
     */
    this.pickUpWeapon = function(x,y){
        let change = GameEngine.Board.fields[x][y];
        if (change === FixedValues.EMPTY_FIELD){
            return; // Nothing to do
        }

        let nr = GameEngine.currentPlayer.playerNr;
        // console.log("Weapon found(x,y)-> "+x+", "+y);
        // remember the old weapon, to disable it in the view
        let oldWeapon = "";
        if (GameEngine.currentPlayer.knifeWeapon) {
            oldWeapon = FixedValues.WEAPON_KNIFE;
            disableWeaponsAndItems(nr==1 ? FixedValues.WEAPON_KNIFE_ID : FixedValues.WEAPON_KNIFE2_ID);
        } else if (GameEngine.currentPlayer.gunWeapon){
            oldWeapon = FixedValues.WEAPON_GUN;
            disableWeaponsAndItems(nr==1 ? FixedValues.WEAPON_GUN_ID : FixedValues.WEAPON_GUN2_ID);
        } else if (GameEngine.currentPlayer.flameThrowerWeapon){
            oldWeapon = FixedValues.WEAPON_FLAME_THROWER;
            disableWeaponsAndItems(nr==1 ? FixedValues.WEAPON_FLAME_THROWER_ID : FixedValues.WEAPON_FLAME_THROWER2_ID);
        } else if (GameEngine.currentPlayer.bombWeapon){
            oldWeapon = FixedValues.WEAPON_BOMB;
            disableWeaponsAndItems(nr==1 ? FixedValues.WEAPON_BOMB_ID : FixedValues.WEAPON_BOMB2_ID);
        }
        // console.log("oldWeapon: "+oldWeapon);

        if (oldWeapon > 0){
            // console.log("Put old weapon back");
            GameEngine.Board.fields[x][y] = oldWeapon;
            GameEngine.Board.dirty = true;
        }
        switch(change){
            case FixedValues.WEAPON_KNIFE:
                GameEngine.currentPlayer.resetWeapons();
                GameEngine.currentPlayer.knifeWeapon = true;
                enableWeaponsAndItems( nr==1 ? FixedValues.WEAPON_KNIFE_ID : FixedValues.WEAPON_KNIFE2_ID);
                break;
            case FixedValues.WEAPON_GUN:
                GameEngine.currentPlayer.resetWeapons();
                GameEngine.currentPlayer.gunWeapon = true;
                enableWeaponsAndItems(nr==1 ? FixedValues.WEAPON_GUN_ID : FixedValues.WEAPON_GUN2_ID);
                break;
            case FixedValues.WEAPON_FLAME_THROWER:
                GameEngine.currentPlayer.resetWeapons();
                GameEngine.currentPlayer.flameThrowerWeapon = true;
                enableWeaponsAndItems(nr==1 ? FixedValues.WEAPON_FLAME_THROWER_ID : FixedValues.WEAPON_FLAME_THROWER2_ID);
                break;
            case FixedValues.WEAPON_BOMB:
                GameEngine.currentPlayer.resetWeapons();
                GameEngine.currentPlayer.bombWeapon = true;
                enableWeaponsAndItems( nr==1 ? FixedValues.WEAPON_BOMB_ID : FixedValues.WEAPON_BOMB2_ID);
                break;
            default:
                console.log("Error: there is no such weapon...: "+ newWeapon);
                return;
        }
        // this.debugPlayer();
    };

    this.drawBarrier0 = function(x, y){
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
        this.context.fillStyle = FixedValues.COLOR_WHITE;
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    };

    this.drawBarrier = function(x, y){
        this.context.beginPath();
        this.context.moveTo(x * GameEngine.fieldWidth+15, y * GameEngine.fieldHeight+5);
        this.context.lineTo(x * GameEngine.fieldWidth+45+GameEngine.corrector, y * GameEngine.fieldHeight+5);
        this.context.lineTo(x * GameEngine.fieldWidth+55+GameEngine.corrector, y * GameEngine.fieldHeight+15);
        this.context.lineTo(x * GameEngine.fieldWidth+55+GameEngine.corrector, y * GameEngine.fieldHeight+45+GameEngine.corrector);
        this.context.lineTo(x * GameEngine.fieldWidth+45+GameEngine.corrector, y * GameEngine.fieldHeight+55+GameEngine.corrector);
        this.context.lineTo(x * GameEngine.fieldWidth+15, y * GameEngine.fieldHeight+55+GameEngine.corrector);
        this.context.lineTo(x * GameEngine.fieldWidth+5, y * GameEngine.fieldHeight+45+GameEngine.corrector);
        this.context.lineTo(x * GameEngine.fieldWidth+5, y * GameEngine.fieldHeight+15);
        this.context.lineTo(x * GameEngine.fieldWidth+15, y * GameEngine.fieldHeight+5);
        this.context.fillStyle = FixedValues.COLOR_WHITE;
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    };

    this.drawPlayer = function(x, y, fillStyle){
        this.context.beginPath();
        this.context.arc(x * GameEngine.fieldWidth+10+(GameEngine.corrector/3), y *  GameEngine.fieldHeight+10+(GameEngine.corrector/3), 10+(GameEngine.corrector/3), 0, 6.28, false);
        this.context.moveTo(x * GameEngine.fieldWidth+20+(GameEngine.corrector/3), y *  GameEngine.fieldHeight+10+(GameEngine.corrector/3));
        this.context.lineTo(x * GameEngine.fieldWidth+50+GameEngine.corrector,  y *  GameEngine.fieldHeight+20+GameEngine.corrector);
        this.context.lineTo(x * GameEngine.fieldWidth+20, y *  GameEngine.fieldHeight+60+GameEngine.corrector);
        this.context.fillStyle = fillStyle;
        this.context.stroke();
        this.context.fill();
    };

    this.drawKnife = function(x, y){
        this.context.beginPath();
        this.context.strokeStyle = FixedValues.COLOR_BLACK;
        switch(GameEngine.factor){
            case 0:
                this.context.fillRect(x * GameEngine.fieldWidth+17, y * GameEngine.fieldHeight+29, 6+(GameEngine.corrector/2), 13+(GameEngine.corrector/2));
                this.context.beginPath();
                this.context.moveTo(x * GameEngine.fieldWidth+17, y * GameEngine.fieldHeight+29);
                this.context.lineTo(x * GameEngine.fieldWidth+17, y * GameEngine.fieldHeight+6);
                this.context.lineTo(x * GameEngine.fieldWidth+23, y * GameEngine.fieldHeight+12);
                this.context.lineTo(x * GameEngine.fieldWidth+23, y * GameEngine.fieldHeight+29);
                this.context.closePath();
                break;
            case 1:
                this.context.fillRect(x * GameEngine.fieldWidth+30, y * GameEngine.fieldHeight+48, 6+(GameEngine.corrector/3), 13+(GameEngine.corrector/2));
                this.context.beginPath();
                this.context.moveTo(x * GameEngine.fieldWidth+30, y * GameEngine.fieldHeight+48);
                this.context.lineTo(x * GameEngine.fieldWidth+30, y * GameEngine.fieldHeight+6);
                this.context.lineTo(x * GameEngine.fieldWidth+38, y * GameEngine.fieldHeight+17);
                this.context.lineTo(x * GameEngine.fieldWidth+38, y * GameEngine.fieldHeight+48);
                this.context.closePath();
                break;
            case 2:
                this.context.fillRect(x * GameEngine.fieldWidth+40, y * GameEngine.fieldHeight+55, 6+(GameEngine.corrector/3), 13+(GameEngine.corrector/2));
                this.context.beginPath();
                this.context.moveTo(x * GameEngine.fieldWidth+40, y * GameEngine.fieldHeight+55);
                this.context.lineTo(x * GameEngine.fieldWidth+40, y * GameEngine.fieldHeight+6);
                this.context.lineTo(x * GameEngine.fieldWidth+46, y * GameEngine.fieldHeight+17);
                this.context.lineTo(x * GameEngine.fieldWidth+46, y * GameEngine.fieldHeight+55);
                this.context.closePath();
                break;
            case 3:
                this.context.fillRect(x * GameEngine.fieldWidth+40, y * GameEngine.fieldHeight+55, 6+(GameEngine.corrector/3), 13+(GameEngine.corrector/2));
                this.context.beginPath();
                this.context.moveTo(x * GameEngine.fieldWidth+40, y * GameEngine.fieldHeight+55);
                this.context.lineTo(x * GameEngine.fieldWidth+40, y * GameEngine.fieldHeight+6);
                this.context.lineTo(x * GameEngine.fieldWidth+55, y * GameEngine.fieldHeight+17);
                this.context.lineTo(x * GameEngine.fieldWidth+55, y * GameEngine.fieldHeight+55);
                this.context.closePath();
                break;
            case 4:
                this.context.fillRect(x * GameEngine.fieldWidth+45, y * GameEngine.fieldHeight+55, 6+(GameEngine.corrector/3), 13+(GameEngine.corrector/2));
                this.context.beginPath();
                this.context.moveTo(x * GameEngine.fieldWidth+45, y * GameEngine.fieldHeight+55);
                this.context.lineTo(x * GameEngine.fieldWidth+45, y * GameEngine.fieldHeight+6);
                this.context.lineTo(x * GameEngine.fieldWidth+66, y * GameEngine.fieldHeight+17);
                this.context.lineTo(x * GameEngine.fieldWidth+66, y * GameEngine.fieldHeight+55);
                this.context.closePath();
                break;
            case 5:
                this.context.fillRect(x * GameEngine.fieldWidth+45, y * GameEngine.fieldHeight+55, 6+(GameEngine.corrector/3), 13+(GameEngine.corrector/2));
                this.context.beginPath();
                this.context.moveTo(x * GameEngine.fieldWidth+45, y * GameEngine.fieldHeight+55);
                this.context.lineTo(x * GameEngine.fieldWidth+45, y * GameEngine.fieldHeight+6);
                this.context.lineTo(x * GameEngine.fieldWidth+68, y * GameEngine.fieldHeight+17);
                this.context.lineTo(x * GameEngine.fieldWidth+68, y * GameEngine.fieldHeight+55);
                this.context.closePath();
                break;
        }
        this.context.stroke();
        this.context.closePath();
    };

    this.drawGun = function(x, y){
        this.context.beginPath();
        this.context.strokeStyle = FixedValues.COLOR_BLACK;
        switch(GameEngine.factor){
            case 0:
                this.context.fillRect(x*GameEngine.fieldWidth+10, y*GameEngine.fieldHeight+30, 10+(GameEngine.corrector/3), 21+(GameEngine.corrector/3));
                this.context.fillRect(x*GameEngine.fieldWidth+10, y*GameEngine.fieldHeight+17, 35+(GameEngine.corrector), 15+(GameEngine.corrector/3));
                this.context.moveTo(x*GameEngine.fieldWidth+15, y*GameEngine.fieldHeight+36);
                this.context.lineTo(x*GameEngine.fieldWidth+30, y*GameEngine.fieldHeight+36);
                this.context.lineTo(x*GameEngine.fieldWidth+30, y*GameEngine.fieldHeight+20);
                break;
            case 1:
                this.context.fillRect(x*GameEngine.fieldWidth+10, y*GameEngine.fieldHeight+32, 10+(GameEngine.corrector/3), 27+(GameEngine.corrector/3));
                this.context.fillRect(x*GameEngine.fieldWidth+10, y*GameEngine.fieldHeight+15, 35+(GameEngine.corrector), 15+(GameEngine.corrector/3));
                this.context.moveTo(x*GameEngine.fieldWidth+15, y*GameEngine.fieldHeight+43);
                this.context.lineTo(x*GameEngine.fieldWidth+36, y*GameEngine.fieldHeight+43);
                this.context.lineTo(x*GameEngine.fieldWidth+36, y*GameEngine.fieldHeight+20);
                break;
            case 2:
                this.context.fillRect(x*GameEngine.fieldWidth+10, y*GameEngine.fieldHeight+32, 10+(GameEngine.corrector/3), 27+(GameEngine.corrector/3));
                this.context.fillRect(x*GameEngine.fieldWidth+10, y*GameEngine.fieldHeight+15, 35+(GameEngine.corrector), 15+(GameEngine.corrector/3));
                this.context.moveTo(x*GameEngine.fieldWidth+15, y*GameEngine.fieldHeight+43);
                this.context.lineTo(x*GameEngine.fieldWidth+38, y*GameEngine.fieldHeight+43);
                this.context.lineTo(x*GameEngine.fieldWidth+38, y*GameEngine.fieldHeight+20);
                break;
            case 3:
                this.context.fillRect(x*GameEngine.fieldWidth+10, y*GameEngine.fieldHeight+42, 10+(GameEngine.corrector/3), 27+(GameEngine.corrector/3));
                this.context.fillRect(x*GameEngine.fieldWidth+10, y*GameEngine.fieldHeight+25, 35+(GameEngine.corrector), 15+(GameEngine.corrector/3));
                this.context.moveTo(x*GameEngine.fieldWidth+15, y*GameEngine.fieldHeight+63);
                this.context.lineTo(x*GameEngine.fieldWidth+42, y*GameEngine.fieldHeight+63);
                this.context.lineTo(x*GameEngine.fieldWidth+42, y*GameEngine.fieldHeight+25);
                break;
            case 4:
                this.context.fillRect(x*GameEngine.fieldWidth+10, y*GameEngine.fieldHeight+52, 10+(GameEngine.corrector/3), 27+(GameEngine.corrector/3));
                this.context.fillRect(x*GameEngine.fieldWidth+10, y*GameEngine.fieldHeight+35, 35+(GameEngine.corrector), 15+(GameEngine.corrector/3));
                this.context.moveTo(x*GameEngine.fieldWidth+15, y*GameEngine.fieldHeight+73);
                this.context.lineTo(x*GameEngine.fieldWidth+48, y*GameEngine.fieldHeight+73);
                this.context.lineTo(x*GameEngine.fieldWidth+48, y*GameEngine.fieldHeight+35);
                break;
            case 5:
                this.context.fillRect(x*GameEngine.fieldWidth+10, y*GameEngine.fieldHeight+52, 10+(GameEngine.corrector/3), 27+(GameEngine.corrector/3));
                this.context.fillRect(x*GameEngine.fieldWidth+10, y*GameEngine.fieldHeight+35, 35+(GameEngine.corrector), 15+(GameEngine.corrector/3));
                this.context.moveTo(x*GameEngine.fieldWidth+15, y*GameEngine.fieldHeight+83);
                this.context.lineTo(x*GameEngine.fieldWidth+56, y*GameEngine.fieldHeight+83);
                this.context.lineTo(x*GameEngine.fieldWidth+56, y*GameEngine.fieldHeight+35);
                break;
        }
        this.context.closePath();
        this.context.stroke();
    };

    this.drawBomb = function(x, y){
        this.context.fillStyle =  FixedValues.COLOR_BLACK;
        this.context.strokeStyle =  FixedValues.COLOR_BLACK;
        this.context.beginPath();
        switch(GameEngine.factor){
            case 0:
                this.context.arc(x* GameEngine.fieldWidth+30, y*GameEngine.fieldHeight+35, 20, 0, 2 * Math.PI, false);
                this.context.fillRect(x * GameEngine.fieldWidth+25, y * GameEngine.fieldHeight+3, 10, 12);
                break;
            case 1:
                // this.context.arc(x* GameEngine.fieldWidth+25+(GameEngine.factor/2)+(GameEngine.corrector/2), y*GameEngine.fieldHeight+25+(GameEngine.corrector/2), 10+(GameEngine.corrector/3), 0, 2 * Math.PI, false);
                this.context.arc(x* GameEngine.fieldWidth+30+(GameEngine.corrector/2), y*GameEngine.fieldHeight+29+GameEngine.corrector, 25, 0, 2 * Math.PI, false);
                this.context.fillRect(x * GameEngine.fieldWidth+32, y * GameEngine.fieldHeight+4, GameEngine.corrector-2, GameEngine.corrector);
                break;
            case 2:
                // this.context.arc(x* GameEngine.fieldWidth+25+(GameEngine.factor/2)+(GameEngine.corrector/2), y*GameEngine.fieldHeight+25+(GameEngine.corrector/2), 10+(GameEngine.corrector/3), 0, 2 * Math.PI, false);
                this.context.arc(x* GameEngine.fieldWidth+30+(GameEngine.corrector/2), y*GameEngine.fieldHeight+25+GameEngine.corrector, 30, 0, 2 * Math.PI, false);
                this.context.fillRect(x * GameEngine.fieldWidth+34, y * GameEngine.fieldHeight+4, (GameEngine.corrector/2), (GameEngine.corrector/2));
                break;
            case 3:
                // this.context.arc(x* GameEngine.fieldWidth+25+(GameEngine.factor/2)+(GameEngine.corrector/2), y*GameEngine.fieldHeight+25+(GameEngine.corrector/2), 10+(GameEngine.corrector/3), 0, 2 * Math.PI, false);
                this.context.arc(x* GameEngine.fieldWidth+30+(GameEngine.corrector/2), y*GameEngine.fieldHeight+25+GameEngine.corrector, 30, 0, 2 * Math.PI, false);
                this.context.fillRect(x * GameEngine.fieldWidth+37, y * GameEngine.fieldHeight+7, (GameEngine.corrector/2), (GameEngine.corrector/2));
                break;
            case 4:
                this.context.arc(x* GameEngine.fieldWidth+27+(GameEngine.corrector/2), y*GameEngine.fieldHeight+15+GameEngine.corrector, 40, 0, 2 * Math.PI, false);
                this.context.fillRect(x * GameEngine.fieldWidth+37, y * GameEngine.fieldHeight+3, (GameEngine.corrector/2), (GameEngine.corrector/2));
                break;
            case 5:
                this.context.arc(x* GameEngine.fieldWidth+GameEngine.corrector, y*GameEngine.fieldHeight+10+GameEngine.corrector, 40, 0, 2 * Math.PI, false);
                this.context.fillRect(x * GameEngine.fieldWidth+43, y * GameEngine.fieldHeight+9, (GameEngine.corrector/2), (GameEngine.corrector/2));
                break;
        }
        this.context.stroke();
        this.context.fill();
        this.context.closePath();
    };

    this.drawFlameThrower = function(x, y){
        this.context.strokeStyle = 'red';
        let correct_x = 0, correct_y = 0;
        switch(GameEngine.factor){
            case 0: break;
            case 1: break;
            case 2:
                correct_x = 8;
                correct_y = 10;
                break;
            case 3:
                correct_x = 10;
                correct_y = 10;
                break;
            case 4:
                correct_x = 18;
                correct_y = 18;
                break;
            case 5:
                correct_x = 28;
                correct_y = 28;
                break;
        }
        for (let i =0; i<7; i++){
            this.context.beginPath();
            this.context.arc(x* GameEngine.fieldWidth+21+(i*4)+correct_x, y*GameEngine.fieldHeight+29+correct_y, 12, 0, 6.28, false);
            this.context.closePath();
            this.context.stroke();
            this.context.beginPath();
            this.context.arc(x* GameEngine.fieldWidth+21+(i*4)+correct_x, y*GameEngine.fieldHeight+29+correct_y, 11, 0, 6.28, false);
            this.context.closePath();
            this.context.stroke();
            this.context.beginPath();
            this.context.arc(x* GameEngine.fieldWidth+21+(i*4)+correct_x, y*GameEngine.fieldHeight+29+correct_y, 9, 0, 6.28, false);
            this.context.closePath();
            this.context.stroke();
            this.context.beginPath();
            this.context.arc(x* GameEngine.fieldWidth+21+(i*4)+correct_x, y*GameEngine.fieldHeight+29+correct_y, 7, 0, 6.28, false);
            this.context.closePath();
        }
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
        console.log("inside this.drawMoveIfPossible(x, y)", x, y);
        switch (this.fields[x][y]) {
            case FixedValues.EMPTY_FIELD:
            case FixedValues.WEAPON_KNIFE:
            case FixedValues.WEAPON_GUN:
            case FixedValues.WEAPON_FLAME_THROWER:
            case FixedValues.WEAPON_BOMB:
                console.log("drawing field (x,y) ", x, y);
                this.drawEmptyChessFieldPossible(x, y);
                return false;
            case FixedValues.PLAYER_1:
            case FixedValues.PLAYER_2:
            case FixedValues.BARRIER:
                console.log("WTF (x,y) ", x, y, this.fields[x][y]);
                return true;
        }
    };

    this.clearField = function(x, y){
        this.context.clearRect(x * GameEngine.fieldWidth, y * GameEngine.fieldHeight, GameEngine.fieldWidth, GameEngine.fieldHeight);
        this.context.beginPath();
        this.context.rect(x * GameEngine.fieldWidth, y * GameEngine.fieldHeight, GameEngine.fieldWidth, GameEngine.fieldHeight);
        // this.context.fillStyle = "#FFF";
        this.context.closePath();
        this.context.lineWidth = 1;
        this.context.stroke();
        // this.context.fill();
        // this.drawEmptyChessFieldPossible(x, y);
    };



    this.unDrawMoveIfPossible = function(x, y){
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
        // Clear the field
        switch (this.fields[x][y]) {
                case FixedValues.EMPTY_FIELD:
                    this.clearField(x, y);
                    return false;
                case FixedValues.WEAPON_KNIFE:
                    this.clearField(x, y);
                    this.drawKnife(x, y);
                    return false;
                case FixedValues.WEAPON_GUN:
                    this.clearField(x, y);
                    this.drawGun(x, y);
                    return false;
                case FixedValues.WEAPON_FLAME_THROWER:
                    this.clearField(x, y);
                    this.drawFlameThrower(x, y);
                    return false;
                case FixedValues.WEAPON_BOMB:
                    this.clearField(x, y);
                    this.drawBomb();
                    return false;
                case FixedValues.PLAYER_1:
                case FixedValues.PLAYER_2:
                case FixedValues.BARRIER:
                    return true;
            }
    };

    this.showPossibleMoves = function(){
        // first calculate the steps left for this move
        let stepsToDo = Number(GameEngine.numberOfMoves) - GameEngine.currentPlayer.movesMadeThisTime;
        console.log("stepsToDo:", stepsToDo);
        // x axis - left of figure
        let count;
        for (count = 1; count <=stepsToDo; count++){
            let stop = this.drawMoveIfPossible(GameEngine.currentPlayer.pos_x - count, GameEngine.currentPlayer.pos_y);
            if (stop) {
                count = Number(GameEngine.numberOfMoves) + 5;
            }
        }
        // x axis - right of figure
        for (count = 1; count <= stepsToDo ; count++){
            let stop = this.drawMoveIfPossible(GameEngine.currentPlayer.pos_x + count, GameEngine.currentPlayer.pos_y);
            if (stop) {
                count = Number(GameEngine.numberOfMoves) + 5;
            }
        }

        // y axis -  above of figure
        for (count = 1; count <= stepsToDo ; count++){
            let stop = this.drawMoveIfPossible(GameEngine.currentPlayer.pos_x, GameEngine.currentPlayer.pos_y-count);
            if (stop) {
                count = Number(GameEngine.numberOfMoves) + 5;
            }
        }

        // y axis - below of figure
        for (count =1; count <= stepsToDo ; count++){
            let stop = this.drawMoveIfPossible(GameEngine.currentPlayer.pos_x, GameEngine.currentPlayer.pos_y+count);
            if (stop) {
                count = Number(GameEngine.numberOfMoves) + 5;
            }
        }
    };

    this.unShowPossibleMoves = function(player, newX, newY){
        // first calculate the steps left for this move
        let stepsToDo = Number(GameEngine.numberOfMoves) - GameEngine.currentPlayer.movesMadeThisTime;
        console.log("stepsToDo:", stepsToDo);
        // x axis - left of figure
        let count;
        for (count = 1; count <=stepsToDo; count++){
            let stop = this.unDrawMoveIfPossible(GameEngine.currentPlayer.pos_x - count, GameEngine.currentPlayer.pos_y);
            if (stop) {
                count = Number(GameEngine.numberOfMoves) + 5;
            }
        }
        // x axis - right of figure
        for (count = 1; count <=stepsToDo; count++){
            let stop = this.unDrawMoveIfPossible(GameEngine.currentPlayer.pos_x + count, GameEngine.currentPlayer.pos_y);
            if (stop) {
                count = Number(GameEngine.numberOfMoves) + 5;
            }
        }

        // y axis -  above of figure
        for (count = 1; count <=stepsToDo; count++){
            let stop = this.unDrawMoveIfPossible(GameEngine.currentPlayer.pos_x, GameEngine.currentPlayer.pos_y-count);
            if (stop) {
                count = Number(GameEngine.numberOfMoves) + 5;
            }
        }

        // y axis - below of figure
        for (count = 1; count <=stepsToDo; count++){
            let stop = this.unDrawMoveIfPossible(GameEngine.currentPlayer.pos_x, GameEngine.currentPlayer.pos_y+count);
            if (stop) {
                count = Number(GameEngine.numberOfMoves) + 5;
            }
        }
    };

    this.drawEmptyChessFieldPossible = function(x, y){
        console.log("(",x, ", ", y, ")");
        switch(GameEngine.factor){
            case 0:
                for (let posx = 0, posy = 0; posx <= 60; posy+=15, posx += 15) {
                    this.drawLine(x * GameEngine.fieldWidth + posx, y * GameEngine.fieldHeight,
                                 x * GameEngine.fieldWidth, y * GameEngine.fieldHeight + posy);
                }
                for (let posx = 0, posy = 0; posx <= 60; posy+=15, posx += 15) {
                    this.drawLine(x * GameEngine.fieldWidth+60, y * GameEngine.fieldHeight+posy,
                                  x * GameEngine.fieldWidth+posx, y * GameEngine.fieldHeight+60);
                }
                break;
            case 1:
                for (let posx = 0, posy = 0; posx <= 60; posy+=15, posx += 15) {

                    this.drawLine(x * GameEngine.fieldWidth + posx, y * GameEngine.fieldHeight,
                                  x * GameEngine.fieldWidth, y * GameEngine.fieldHeight + posy);
                }
                for (let posx = 0, posy = 0; posx <= 60; posy+=15, posx += 15) {
                    this.drawLine(x * GameEngine.fieldWidth+65, y * GameEngine.fieldHeight+posy+5,
                                  x * GameEngine.fieldWidth+posx+5, y * GameEngine.fieldHeight+65);
                }
                break;
            case 2:
                for (let posx = 0, posy = 0; posx <= 75; posy+=15, posx += 15) {
                    this.drawLine(x * GameEngine.fieldWidth + posx, y * GameEngine.fieldHeight,
                                  x * GameEngine.fieldWidth, y * GameEngine.fieldHeight + posy);
                }
                for (let posx = 0, posy = 0; posx <= 60; posy+=15, posx += 15) {
                    this.drawLine(x * GameEngine.fieldWidth+72, y * GameEngine.fieldHeight+posy+12,
                                  x * GameEngine.fieldWidth+posx+12, y * GameEngine.fieldHeight+72);
                }
                break;
            case 3:
                for (let posx = 0, posy = 0; posx <= 90; posy+=15, posx += 15) {
                    this.drawLine(x * GameEngine.fieldWidth + posx, y * GameEngine.fieldHeight,
                                  x * GameEngine.fieldWidth, y * GameEngine.fieldHeight + posy);
                }
                for (let posx = 0, posy = 0; posx <= 60; posy+=15, posx += 15) {
                    this.drawLine(x * GameEngine.fieldWidth+84, y * GameEngine.fieldHeight+posy+24,
                                  x * GameEngine.fieldWidth+posx+24, y * GameEngine.fieldHeight+84);
                }
                break;
            case 4:
                for (let posx = 0, posy = 0; posx <= 90; posy+=15, posx += 15) {
                    this.drawLine(x * GameEngine.fieldWidth + posx, y * GameEngine.fieldHeight,
                                  x * GameEngine.fieldWidth, y * GameEngine.fieldHeight + posy);
                }
                this.drawLine(x * GameEngine.fieldWidth + 100, y * GameEngine.fieldHeight,
                              x * GameEngine.fieldWidth, y * GameEngine.fieldHeight + 100);
                this.drawLine(x * GameEngine.fieldWidth + 100, y * GameEngine.fieldHeight+15,
                              x * GameEngine.fieldWidth+15, y * GameEngine.fieldHeight + 100);
                for (let posx = 0, posy = 0; posx <= 60; posy+=15, posx += 15) {
                    this.drawLine(x * GameEngine.fieldWidth+100, y * GameEngine.fieldHeight+posy+34,
                                  x * GameEngine.fieldWidth+posx+34, y * GameEngine.fieldHeight+100);
                }
                break;
            case 5:
                for (let posx = 0, posy = 0; posx <= 120; posy+=15, posx += 15) {
                    this.drawLine(x * GameEngine.fieldWidth + posx, y * GameEngine.fieldHeight,
                                  x * GameEngine.fieldWidth, y * GameEngine.fieldHeight + posy);
                }
                this.drawLine(x * GameEngine.fieldWidth + 122, y * GameEngine.fieldHeight+15,
                              x * GameEngine.fieldWidth+15, y * GameEngine.fieldHeight + 122);
                for (let posx = 0, posy = 0; posx <= 60; posy+=15, posx += 15) {
                    this.drawLine(x * GameEngine.fieldWidth+120, y * GameEngine.fieldHeight+posy+40,
                                  x * GameEngine.fieldWidth+posx+40, y * GameEngine.fieldHeight+120);
                }
                break;
        }
        this.context.stroke();
    };

    this.drawLine = function(x, y, x2, y2){
        this.context.moveTo(x, y);
        this.context.lineTo(x2, y2);
    };

    this.movePlayerLeft = function(){
        let player = GameEngine.currentPlayer;
        if (player.pos_x == 0){ // leftmost column, continue on the right column ...
            console.log("leftmost column, continue on the right column ...");
            if (GameEngine.bounceOfThePlayer){
                console.log("bounceOfThePlayer: no move possible");
            } else {
                let newPos = GameEngine.numberOfColumns-1;
                if (this.canMove(newPos, player.pos_y)){
                    this.movePlayerMatrix(player, newPos, player.pos_y);
                } else {
                    console.log("Move not possible, field occupied");
                }
            }
        } else { // check if element left is accessible
            let x = player.pos_x - 1;
            if (this.canMove(x, player.pos_y)){
                this.movePlayerMatrix(player, x, player.pos_y);
            } else {
                console.log("Move not possible, field occupied");
            }
        }

    };

    this.movePlayerRight = function(){
        let player = GameEngine.currentPlayer;
        if (player.pos_x == GameEngine.numberOfColumns-1){ // rightmost column, continue on the left ...
            console.log("rightmost column, continue on the right column ...");
            if (GameEngine.bounceOfThePlayer){
                console.log("bounceOfThePlayer: no move possible");
            } else {
                let newPos = 0;
                if (this.canMove(newPos, player.pos_y)){
                    this.movePlayerMatrix(player, newPos, player.pos_y);
                } else {
                    console.log("Move not possible, field occupied");
                }
            }
        } else { // check if element right is not a barrier
            let x = player.pos_x + 1;
            if (this.canMove(x, player.pos_y)){
                this.movePlayerMatrix(player, x, player.pos_y);
            } else {
                console.log("Move not possible, field occupied");
            }
        }
    };

    this.movePlayerUp = function(){
        let player = GameEngine.currentPlayer;
        // this.debugPlayer(player);
        if (player.pos_y == 0){ // topmost row, continue on the lowest row ...
            console.log("topmost row, continue on the lowest row ...");
            if (GameEngine.bounceOfThePlayer){
                console.log("bounceOfThePlayer: no move possible");
            } else {
                let newPos = GameEngine.numberOfRows-1;
                if (this.canMove(player.pos_x, newPos)){
                    this.movePlayerMatrix(player, player.pos_x, player.pos_y-1);
                } else {
                    console.log("Move not possible, field occupied");
                }
            }
        } else { // check if element above is not a barrier
            let y = player.pos_y - 1;
            if (this.canMove(player.pos_x, y)){
                this.movePlayerMatrix(player, player.pos_x, y);
            } else {
                console.log("Move not possible, field occupied");
            }
        }
    };

    this.movePlayerDown = function(){
        let player = GameEngine.currentPlayer;
        // this.debugPlayer(player);
        if (player.pos_y == GameEngine.numberOfRows-1){ // lowest row, continue on the topmost row ...
            console.log("lowest row, continue on the topmost row ...");
            if (this.bounceOfThePlayer){
                console.log("bounceOfThePlayer: no move possible");
            } else {
                let newPos = 0;
                if (this.canMove(player.pos_x, newPos)){
                    this.movePlayerMatrix(player, player.pos_x, player.pos_y+1);
                } else {
                    console.log("Move not possible, field occupied");
                }
            }
        } else { // check if element below is not a barrier
            let y = player.pos_y + 1;
            if (this.canMove(player.pos_x, y)){
                this.movePlayerMatrix(player, player.pos_x, y);
            } else {
                console.log("Move not possible, field occupied");
            }
        }
    };

    this.fire = function () {
        GameEngine.moveMade();
        console.log("Fire called");
    };

    this.fireSuperHeroWeapon = function(){
        GameEngine.moveMade();
        console.log("FireSuperHeroWeapon called");
    };

    this.movePlayerMatrix = function(player, newX, newY){
        this.unShowPossibleMoves(player, newX, newY);
        this.redraw(player.pos_x, player.pos_y, player.playerNr, newX, newY);
        // console.log("Before: ("+player.pos_x+", "+player.pos_y+")->("+newX+", "+newY+")");
        //GameEngine.Board.debug();
        // this.fields[player.pos_x][player.pos_y] = 0;
        this.pickUpWeapon(newX, newY);
        if (this.dirty){
            console.log("dirty called");
            this.clearField(player.pos_x, player.pos_y);
            switch(this.fields[player.pos_x][player.pos_y]){
                case FixedValues.WEAPON_KNIFE:
                    console.log("Draw Knife "+player.pos_x+", "+player.pos_y);
                    this.drawKnife(player.pos_x, player.pos_y);
                    this.dirty = false;
                    break;
                case FixedValues.WEAPON_GUN:
                    console.log("Draw GUN: "+player.pos_x+", "+player.pos_y);
                    this.drawGun(player.pos_x, player.pos_y);
                    this.dirty = false;
                    break;
                case FixedValues.WEAPON_FLAME_THROWER:
                    console.log("Draw FT "+player.pos_x+", "+player.pos_y);
                    this.drawFlameThrower(player.pos_x, player.pos_y);
                    this.dirty = false;
                    break;
                case FixedValues.WEAPON_BOMB:
                    console.log("Draw Bomb "+player.pos_x+", "+player.pos_y);
                    this.drawBomb(player.pos_x, player.pos_y);
                    this.dirty = false;
                    break;
            }
        }
        this.fields[newX][newY] = player.playerNr;
        player.pos_x = newX;
        player.pos_y = newY;
        // console.log("After: "+player.pos_x+" "+player.pos_y);
        // GameEngine.Board.debug();
        // console.log(GameEngine.currentPlayer);

        player.movesMadeThisTime ++ ;
        this.debugPlayer();

        if (GameEngine.currentPlayer.movesMadeThisTime >= Number(GameEngine.numberOfMoves)){
            GameEngine.switchPlayer();
            this.showPossibleMoves();
        } else {
            this.showPossibleMoves();
        }
    };

    this.redraw = function(x,y, playerNr, newX, newY){
//        console.log("Redraw called ("+x+", "+y+")->("+newX+", "+newY+")");
        this.context.clearRect(x * GameEngine.fieldWidth, y * GameEngine.fieldHeight, GameEngine.fieldWidth, GameEngine.fieldHeight);
        this.context.beginPath();
        this.context.rect(x * GameEngine.fieldWidth, y * GameEngine.fieldHeight, GameEngine.fieldWidth, GameEngine.fieldHeight);
        // this.context.fillStyle = "#FFF";
        this.context.closePath();
        this.context.lineWidth = 1;
        this.context.stroke();
        // this.context.fill();
        // this.debug();
        switch(GameEngine.Board.fields[x][y]){
            case FixedValues.WEAPON_KNIFE:
                this.drawKnife(x, y);
                break;
            case FixedValues.WEAPON_GUN:
                this.drawGun(x, y);
                break;
            case FixedValues.WEAPON_FLAME_THROWER:
                this.drawFlameThrower(x, y);
                break;
            case FixedValues.WEAPON_BOMB:
                this.drawBomb(x, y);
                break;
        }
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

/**
 * Players
 * @param name the name of the player
 * @param playerState the state visualization
 * @param playerNr the id
 * @constructor
 */
function Player(name, playerState, playerNr, superHeroClass) {
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
    this.movesMadeThisTime = 0;
    this.shield = false;
    this.superHeroClass = superHeroClass;
    this.selectedWeapon = this.superHeroDefaultWeapon;
    document.getElementById(this.playerState).style.backgroundColor = "green";

    this.resetMove = function(){
        this.movesMadeThisTime = 0;
    };

    this.resetWeapons = function(){
        this.knifeWeapon = false;
        this.gunWeapon = false;
        this.flameThrowerWeapon = false;
        this.bombWeapon = false;
    };


    this.showDamage = new function () {
        // this.health -= damage;
        // let line = document.getElementById("tester").value; // TODO: exchange by real event
        let line = 100;
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
    // Colors
    FixedValues.COLOR_WHITE = "#FFFFFF";
    FixedValues.COLOR_BLACK = "#000";
    FixedValues.COLOR_BLACK_LABEL = 'black';
    FixedValues.COLOR_RED_LABEL = 'red';
    FixedValues.COLOR_GREEN_LABEL = 'green';

    // IDs
    FixedValues.PLAYER_1_ID = "player1";
    FixedValues.PLAYER_2_ID = "player2";
    FixedValues.CURRENT_PLAYER_NAME_ID = "currentPlayerName";
    FixedValues.CURRENT_PLAYER_NAME_2_ID = "currentPlayerName2";
    FixedValues.COLS_ID = "#cols";
    FixedValues.ROWS_ID = "#rows";
    FixedValues.OBSTACLES_ID = "#obstacles";
    FixedValues.NUMBER_OF_MOVES = "#numberOfMoves";
    FixedValues.BOARD_ID = "board";
    FixedValues.CV1_ID = 'CV1';
    FixedValues.PH1_ID = 'PH1';
    FixedValues.CL1_ID = 'CL1';
    FixedValues.LT1_ID = 'LT1';
    FixedValues.CV2_ID = 'CV2';
    FixedValues.PH2_ID = 'PH2';
    FixedValues.CL2_ID = 'CL2';
    FixedValues.LT2_ID = 'LT2';
    FixedValues.SUPER_HERO_DEFAULT_WEAPON_ID = "superHeroDefaultWeapon";
    FixedValues.SUPER_HERO_DEFAULT_WEAPON_2_ID = "superHeroDefaultWeapon2";
    FixedValues.WEAPON_KNIFE_ID = "knifeWeapon";
    FixedValues.WEAPON_GUN_ID = "gunWeapon";
    FixedValues.WEAPON_FLAME_THROWER_ID = "flameThrowerWeapon";
    FixedValues.WEAPON_BOMB_ID = "bombWeapon";
    FixedValues.SHIELD_ID = "shield";
    FixedValues.WEAPON_KNIFE2_ID = "knifeWeapon2";
    FixedValues.WEAPON_GUN2_ID = "gunWeapon2";
    FixedValues.WEAPON_FLAME_THROWER2_ID = "flameThrowerWeapon2";
    FixedValues.WEAPON_BOMB2_ID = "bombWeapon2";
    FixedValues.SHIELD2_ID = "shield2";
    FixedValues.CURRENT_1_ID = "#Current1";
    FixedValues.COLOR = 'color';
    FixedValues.BOUNCEPLAYER = 'bouncePlayer';
    FixedValues.BOUNCEWEAPON = 'bounceWeapon';
    FixedValues.D2 = "2d";
    FixedValues.MESSAGE1 = "message1";
    FixedValues.MESSAGE2 = "message2";


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
    let board = document.getElementById(FixedValues.BOARD_ID);
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
    GameEngine.lordDumpnat = new SuperHero("Lord Dumpnat", "Alternative Truth Beam");

    // Keyboard control
    FixedValues.LEFT = 37;
    FixedValues.UP = 38;
    FixedValues.RIGHT = 39;
    FixedValues.DOWN = 40;
    FixedValues.SHOOT_SUPER_HERO_WEAPON = 68;
    FixedValues.SHOOT = 70;
    FixedValues.SHIELD = 83;
    FixedValues.END_MOVE = 13;
    FixedValues.CHANGE_WEAPON = 67;

    GameEngine.Knife = new Weapon("Knife", 50, 5, 1);
    GameEngine.Gun = new Weapon("Gun", 25, 10, 10);
    GameEngine.FlameThrower = new Weapon("FlameThrower", 33, 15, 4);
    GameEngine.BOMB = new Weapon("Bomb", 70, 25, 5);

    GameEngine.SuperSonicSound = new Weapon("Super Sonic Sound", 70, 25, 5);
    GameEngine.MagicSpell = new Weapon("Magic Spell", 70, 25, 5);
    GameEngine.CaraLoft = new Weapon("Power Seduce Beam", 70, 25, 5);
    GameEngine.AlternativeTruthBeam = new Weapon("Alternative Truth Beam", 70, 25, 5);

};

function Weapon(name, damage, damageWhenShieldIsUp, range) {
    this.name = name;
    this.damage = damage;
    this.damageWhenShieldIsUp = damageWhenShieldIsUp;
    this.range = range;
}
function gameOver(name){
    document.getElementById("message1").innerHTML = "Congratulations "+name+" , you have won the challenge...";
    document.getElementById("message2").innerHTML = "... but war does not have a winner.";
}