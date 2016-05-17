//Frogger, by Andrew E
//Attributions can be found in the README file.

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor((Math.random() * 300) + 200); //enemy speed floating point generator
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 500) {
        this.x += this.speed * dt;
    } else {
        this.x = -1;
    }
    //This resets the player if he gets too close to an enemy, within 50px.
    if (player.x >= this.x - 50 && player.x <= this.x + 50) {
        if (player.y >= this.y - 50 && player.y <= this.y + 50) {
            player.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Image sprite and starting position
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

//This updates player position, accounting for input and the edges of the canvas
Player.prototype.update = function(dt) {
    if (this.pressedKey === 'left' && this.x > 0) {
        this.x = this.x - 101;
    } else if (this.pressedKey === 'right' && this.x <= 400) {
        this.x = this.x + 101;
    } else if (this.pressedKey === 'up') {
        this.y = this.y - 83;
    } else if (this.pressedKey === 'down' && this.y != 400) {
        this.y = this.y + 83;
    }
    this.pressedKey = null;

    if (this.y < 25) {
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This handles input from pressed keys
Player.prototype.handleInput = function(n) {
    this.pressedKey = n;
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
(function placeEnemies() {
    allEnemies.push(new Enemy(0,60));
    allEnemies.push(new Enemy(0,145));
    allEnemies.push(new Enemy(0,225));
}());

//checkCollisions deals with enemy detection, and resets the player if they get too close

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Added 5/17/16

$(function () {
    $(document).on('click.once', function () {
        alert("Please use the arrow keys to move");
        $(document).off('click.once');
    })
});