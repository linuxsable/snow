var Game = function(canvasId, width, height) {
    var coq = new Coquette(this, canvasId, width, height, '#fff');

    this.backgroundSquaresCount = 0;

    $tip = $('.tip');

    this.update = function() {
        if (this.backgroundSquaresCount <= 200) {
            coq.entities.create(Snow, {
                pos: {
                    x: helpers.randomNum(width),
                    y: helpers.randomNum(500) * -1
                },

                size: {
                    x: helpers.randomNum(20),
                    y: helpers.randomNum(10),
                },

                color: '#ddd',

                update: function() {
                    if (helpers.randomNum(10) % 2 == 1) {
                        this.pos.x = this.pos.x + 0.5;
                    } else {
                        this.pos.x = this.pos.x - 0.5;
                    }

                    this.pos.y = this.pos.y + 0.7
                }
            });

            this.backgroundSquaresCount += 1;
        }

        _.each(coq.entities.all(), function(entity) {
            if (entity.pos.x > width || entity.pos.y > height) {
                coq.entities.destroy(entity, function() {
                    this.backgroundSquaresCount -= 1;
                }.bind(this));
            }
        }.bind(this));
    };

    coq.entities.create(Person, {
        pos: { x: 249, y: 110 },
        color: '#f07',

        update: function() {
            if (coq.inputter.state(coq.inputter.W)) {
                this.pos.y -= 3;
            }
            else if (coq.inputter.state(coq.inputter.A)) {
                this.pos.x -= 3;
            }
            else if (coq.inputter.state(coq.inputter.D)) {
                this.pos.x += 3;
            }
            else if (coq.inputter.state(coq.inputter.S)) {
                this.pos.y += 3;
            }
        },

        collision: function(other) {
            other.color = this.color;
        }
    });
};

var Snow = function(game, settings) {
    for (var i in settings) {
        this[i] = settings[i];
    }

    this.size = { x: 9, y: 9 };

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 3, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
};

var Person = function(game, settings) {
    for (var i in settings) {
        this[i] = settings[i];
    }

    this.size = { x: 15, y: 15 };

    this.draw = function(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    };
};

window.addEventListener('load', function() {
    new Game('canvas', window.innerWidth, window.innerHeight);
});

var helpers = (function() {
    return {
        randomNum: function(maxLength) {
            return Math.floor(Math.random() * ++maxLength);
        }
    };
})();
