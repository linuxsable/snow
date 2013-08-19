(function() {
    'use strict';
    
    App.Entities.Person = function(game, settings) {
        for (var i in settings) {
            this[i] = settings[i];
        }

        this.size = { x: 15, y: 15 };

        this.draw = function(ctx) {
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, 8, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        };

        this.collision = function(other) {
            if (other instanceof App.Entities.Snow) {
                other.color = this.color;
            }
        };
    };
})();