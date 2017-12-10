/**
 * Created by aspetko on 06.12.17.
 */
window.onload = function(){
    var fieldWidth = 60;
    var fieldHeight = 60;
    var board = document.getElementById("board");
    var ctx = board.getContext("2d");

    positionElementsByRandom(ctx,BARRIER);
    positionElementsByRandom(ctx,BARRIER);
    positionElementsByRandom(ctx,BARRIER);
    positionElementsByRandom(ctx,BARRIER);
    positionElementsByRandom(ctx,BARRIER);
    positionElementsByRandom(ctx,BARRIER);
    positionElementsByRandom(ctx,BARRIER);
    positionElementsByRandom(ctx,BARRIER);
    positionElementsByRandom(ctx,BARRIER);
    positionElementsByRandom(ctx,BARRIER);
    positionElementsByRandom(ctx,BARRIER);
    positionElementsByRandom(ctx,BARRIER);
    positionElementsByRandom(ctx,PLAYER_1);
    positionElementsByRandom(ctx,PLAYER_2);


    drawEmptyChessField(ctx, fieldWidth, fieldHeight);
    // drawEmptyChessField(ctx, fieldWidth, fieldHeight);
    // drawChessField(ctx, fieldWidth, fieldHeight, "#1f1f21", "#d1eefc");
            // drawBarrier(ctx, 5, 5, fieldWidth, fieldWidth, "#FF0000");
    var player1State = document.getElementById("player1");
    player1State.style.backgroundColor = "green";
    var player2State = document.getElementById("player2");
    player2State.style.backgroundColor = "green";
};

// Elements of the game...
var PLAYER_1 = 1;
var PLAYER_2 = 2;
var BARRIER = 3;
var WEAPON_KNIFE = 4;
var WEAPON_GUN = 5;
var WEAPON_FLAME_THROWER = 6;
var WEAPON_BOMB = 7;


/**
 * Draw a chess like field
 */
function drawChessField(context, fieldWidth, fieldHeight, fillStyle, fillStyle2){
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

/**
 * Draw an empty single chess field
 */
function drawEmptyChessField(context, fieldWidth, fieldHeight){
    var x = 100;
    var y = 100;
    context.beginPath();
    context.fillRect(x * fieldWidth, y * fieldHeight, fieldWidth, fieldHeight);
    context.fillStyle = "#FF0000";
    context.closePath();
    context.fill();
    context.stroke();
}

var numberOfRows = 10;
var numberOfColumns = 10;

function resetBoard(){
    for (var y=0; y < numberOfColumns; y++){
        for (var x=0; x < numberOfRows; x++){
            board[x][y]=0;
        }
    }
}

function positionElementsByRandom(context, element) {
    var x=0; var y = 0;
    var done = false;

    while (!done){
        var random_x = Math.floor(Math.random() * numberOfColumns);
        var random_y = Math.floor(Math.random() * numberOfRows);
        if (board[random_x][random_y] == 0){
            done = true;
            board[random_x][random_y] = element;
            switch(element){
                case PLAYER_1:
                    drawPlayer(context, random_x, random_y, 60, 60, "#FFFFFF");
                    break;
                case PLAYER_2:
                    drawPlayer(context, random_x, random_y, 60, 60, "#000000");
                    break;
                case BARRIER:
                    drawBarrier(context, random_x, random_y, 60, 60, "#FFFFFF");
                    // drawBarrier(ctx, random_x, random_y, fieldWidth, fieldWidth, "#FF0000" );
                    break;
                case WEAPON_KNIFE:
                    break;
                case WEAPON_GUN:
                    break;
                case WEAPON_FLAME_THROWER:
                    break;
                case WEAPON_BOMB:
                    break;
            }
        } else {
            console.log("Placed occupied ["+random_x+"]["+random_y+"]...")
        }
    }
}

var board = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
];



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

/**
 * Draw an empty field
 *
function drawEmptyChessField(context, x, y, fieldWidth, fieldHeight){
    context.beginPath();
    context.moveTo(x * fieldWidth, y * fieldHeight);
    context.lineTo(fieldWidth, fieldHeight);
    context.closePath();
    context.stroke();
}



/**
 * Draw an empty chess field
 */
function drawStarExplosion(context, fieldWidth, fieldHeight){
    for (var y = 0; y < 10; y++) {
        for (var x = 0; x < 10; x++) {
            context.beginPath();
            context.moveTo(x * fieldWidth, y * fieldHeight);
            context.lineTo(fieldWidth, fieldHeight);
            context.closePath();
            context.stroke();
        }
    }
}

/**
 * Draw a barrier
 */
function drawBarrier(context, x, y, fieldWidth, fieldHeight, fillStyle){
    context.beginPath();
    context.moveTo(x * fieldWidth+10, y * fieldHeight);
    context.lineTo(x * fieldWidth+40, y * fieldHeight);
    context.lineTo(x * fieldWidth+50, y * fieldHeight+10);
    context.lineTo(x * fieldWidth+50, y * fieldHeight+40);
    context.lineTo(x * fieldWidth+40, y * fieldHeight+50);
    context.lineTo(x * fieldWidth+10, y * fieldHeight+50);
    context.lineTo(x * fieldWidth, y * fieldHeight+40);
    context.lineTo(x * fieldWidth, y * fieldHeight+10);
    context.lineTo(x * fieldWidth+10, y * fieldHeight);
    context.fillStyle = fillStyle;
    context.closePath();
    context.stroke();
    context.fill();
}

/**
 * Draw a Player
 */
function drawPlayer(context, x, y, fieldWidth, fieldHeight, fillStyle){
    context.beginPath();
    context.moveTo(x * fieldWidth+10, y * fieldHeight);
    context.lineTo(x * fieldWidth+40,  y * fieldHeight+10);
    context.lineTo(x * fieldWidth+10, y * fieldHeight+50);
    context.fillStyle = fillStyle;
    context.closePath();
    context.stroke();
    context.fill();
}

/**
 * Draw a Weapon
 */
function drawWeapon(context, x, y, fieldWidth, fieldHeight, fillStyle){
    context.beginPath();
    context.moveTo(x * fieldWidth+10, y * fieldHeight);
    context.lineTo(x * fieldWidth+10, y * fieldHeight+50);
    context.lineTo(x * fieldWidth+40,  y * fieldHeight+10);
    context.fillStyle = fillStyle;
    context.closePath();
    context.stroke();
    context.fill();
}


/**
 * Test of dynamic assigned player
 */
function showResult(){
    if (document.getElementById('player1Radio').checked) {
        showDamage($('#player1'));
    } else {
        showDamage($('#player2'));
    }
}

/**
 * Display harm to the player
 * @param player the player...
 */
function showDamage(player) {
    var line = document.getElementById("tester").value; // exchange by real event
    if (line === '100'){
        player.css('background', 'red');
    } else if (line === '0'){
        player.css('background', 'green');
    } else {
        player.css('background', 'linear-gradient(to bottom, red '+line+'%, green 100%)');
    }
}
