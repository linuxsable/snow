(function() {
    'use strict';

    App.Entities.Snow = function(game, settings) {
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
})();
