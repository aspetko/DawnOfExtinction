/**
 * Created by aspetko on 25.12.17.
 */

////////////////////////////
// Create the Namespace
////////////////////////////

/**
 * Statemachine for sounds
 */
var StatemachineSound = {};

StatemachineSound.playWrong = function(shield){
    if (shield){
        let first = new Audio("../assets/sounds/WRONG.wav");
        first.play();
        first.onended = function() {
            new Audio("../assets/sounds/ShieldBlocks.mp3").play();
        };
    } else {
        new Audio("../assets/sounds/WRONG.wav").play();
    }
};

StatemachineSound.playWrongMiss = function(){
        let first = new Audio("../assets/sounds/WRONG.wav");
        first.play();
        first.onended = function() {
            new Audio("../assets/sounds/crowd-reactions-crowd-reactions-4.wav").play();
        };
};

StatemachineSound.playGun = function(shield){
    if (shield){
        let first = new Audio("../assets/sounds/9_mm_gunshot-mike-koenig-123.mp3");
        first.play();
        first.onended = function() {
            new Audio("../assets/sounds/ShieldBlocks.mp3").play();
        };
    } else {
        new Audio("../assets/sounds/9_mm_gunshot-mike-koenig-123.mp3").play();
    }
};

StatemachineSound.playGunMiss = function(){
    let first = new Audio("../assets/sounds/9_mm_gunshot-mike-koenig-123.mp3");
    first.play();
    first.onended = function() {
        new Audio("../assets/sounds/crowd-reactions-crowd-reactions-4.wav").play();
    };
};

StatemachineSound.playBoing = function(){
    if (GameEngine.currentPlayer.superHeroClass === GameEngine.captainVolume){
        new Audio("../assets/sounds/Boing.mp3").play();
    } else if (GameEngine.currentPlayer.superHeroClass === GameEngine.parryHotter){
        new Audio("../assets/sounds/Boing.mp3").play();
    } else if (GameEngine.currentPlayer.superHeroClass === GameEngine.caraLoft){
        new Audio("../assets/sounds/Pflop.mp3").play();
    } else if (GameEngine.currentPlayer.superHeroClass === GameEngine.lordDumpnat) {
        new Audio("../assets/sounds/Boing.mp3").play();
    } else {
        console.error("None");
    }
};

StatemachineSound.playStep  = function(){
    new Audio("../assets/sounds/Step.mp3").play();
};

StatemachineSound.playBomb  = function(shield){
    if (shield){
        let first = new Audio("../assets/sounds/Bomb.wav");
        first.play();
        first.onended = function() {
            new Audio("../assets/sounds/ShieldBlocks.mp3").play();
        };
    } else {
        new Audio("../assets/sounds/Bomb.wav").play();
    }
};

StatemachineSound.playBombMiss = function(){
    let first = new Audio("../assets/sounds/Bomb.wav");
    first.play();
    first.onended = function() {
        new Audio("../assets/sounds/crowd-reactions-crowd-reactions-4.wav").play();
    };
};

StatemachineSound.playCaptainVolume  = function(shield){
    if (shield){
        let first = new Audio("../assets/sounds/CaptainVolume.wav");
        first.play();
        first.onended = function() {
            new Audio("../assets/sounds/ShieldBlocks.mp3").play();
        };
    } else {
        new Audio("../assets/sounds/CaptainVolume.wav").play();
    }
};

StatemachineSound.playCaptainMiss = function(){
    let first = new Audio("../assets/sounds/CaptainVolume.wav");
    first.play();
    first.onended = function() {
        new Audio("../assets/sounds/crowd-reactions-crowd-reactions-4.wav").play();
    };
};

StatemachineSound.playFlameThrower  = function(shield){
    if (shield){
        let first = new Audio("../assets/sounds/FlameThrower.wav");
        first.play();
        first.onended = function() {
            new Audio("../assets/sounds/ShieldBlocks.mp3").play();
        };
    } else {
        new Audio("../assets/sounds/FlameThrower.wav").play();
    }
};
StatemachineSound.playFlameThrowerMiss = function(){
    let first = new Audio("../assets/sounds/FlameThrower.wav");
    first.play();
    first.onended = function() {
        new Audio("../assets/sounds/crowd-reactions-crowd-reactions-4.wav").play();
    };
};

StatemachineSound.playHeartBeat  = function(){
    new Audio("../assets/sounds/HeartBeat.mp3").play();
};

StatemachineSound.playKnifeStab  = function(shield){
    if (shield){
        let first = new Audio("../assets/sounds/KnifeStab.wav");
        first.play();
        first.onended = function() {
            new Audio("../assets/sounds/ShieldBlocks.mp3").play();
        };
    } else {
        new Audio("../assets/sounds/KnifeStab.wav").play();
    }
};

StatemachineSound.playKnifeStabMiss = function(){
    let first = new Audio("../assets/sounds/KnifeStab.wav");
    first.play();
    first.onended = function() {
        new Audio("../assets/sounds/crowd-reactions-crowd-reactions-4.wav").play();
    };
};

StatemachineSound.playLaser = function(shield){
    if (shield){
        let first = new Audio("../assets/sounds/Laser.mp3");
        first.play();
        first.onended = function() {
            new Audio("../assets/sounds/ShieldBlocks.mp3").play();
        };
    } else {
        new Audio("../assets/sounds/Laser.mp3").play();
    }
};

StatemachineSound.playLaserMiss = function(){
    let first = new Audio("../assets/sounds/Laser.mp3");
    first.play();
    first.onended = function() {
        new Audio("../assets/sounds/crowd-reactions-crowd-reactions-4.wav").play();
    };
};

StatemachineSound.playLoveSpell = function(shield){
    if (shield){
        let first = new Audio("../assets/sounds/LoveMe.mp3");
        first.play();
        first.onended = function() {
            new Audio("../assets/sounds/LoveSpell.mp3").play();
        };
    } else {
        new Audio("../assets/sounds/LoveMe.mp3").play();
    }
};

StatemachineSound.playLoveSpellMiss = function(){
    let first = new Audio("../assets/sounds/LoveMe.mp3");
    first.play();
    first.onended = function() {
        new Audio("../assets/sounds/crowd-reactions-crowd-reactions-4.wav").play();
    };
};

StatemachineSound.playMagicBeam = function(shield){
    if (shield){
        let first = new Audio("../assets/sounds/MagicBeam.mp3");
        first.play();
        first.onended = function() {
            new Audio("../assets/sounds/ShieldBlocks.mp3").play();
        };
    } else {
        new Audio("../assets/sounds/MagicBeam.mp3").play();
    }
};

StatemachineSound.playMagicBeamMiss = function(){
    let first = new Audio("../assets/sounds/MagicBeam.mp3");
    first.play();
    first.onended = function() {
        new Audio("../assets/sounds/crowd-reactions-crowd-reactions-4.wav").play();
    };
};

StatemachineSound.playPassAway  = function(){
    if (GameEngine.currentPlayer.superHeroClass === GameEngine.captainVolume){
        this.playMenPassAway();
    } else if (GameEngine.currentPlayer.superHeroClass === GameEngine.parryHotter){
        this.playMenPassAway();
    } else if (GameEngine.currentPlayer.superHeroClass === GameEngine.caraLoft){
        this.WomanPassAway();
    } else if (GameEngine.currentPlayer.superHeroClass === GameEngine.lordDumpnat) {
        this.playMenPassAway();
    }
};

StatemachineSound.playWomanPassAway  = function(){
    let first = new Audio("../assets/sounds/WomanDiing.mp3")
    first.play();
    first.onended = function() {
        let second = new Audio("../assets/sounds/NowYouAreDead.mp3")
        second.play();
        second.onended = function () {
            new Audio("../assets/sounds/GameOver.mp3").play();
        };
    };
};

StatemachineSound.playMenPassAway  = function(){
    let first = new Audio("../assets/sounds/ManDieing.mp3");
    first.play();
    first.onended = function() {
        let second = new Audio("../assets/sounds/NowYouAreDead.mp3")
        second.play();
        second.onended = function () {
            new Audio("../assets/sounds/GameOver.mp3").play();
        };
    };
};
