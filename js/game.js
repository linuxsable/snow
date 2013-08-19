(function() {
    'use strict';

    App.Game = function(canvasId, width, height) {
        this.player = null;
        this.score = null;
        this.snowCount = 0;

        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.canvasColor = '#fff';

        this.coq = new Coquette(
            this,
            canvasId,
            this.canvasWidth,
            this.canvasHeight,
            this.canvasColor
        );

        this.init();
    };

    App.Game.prototype = {
        init: function() {
            var app = this;

            this.coq.entities.create(App.Entities.Person, {
                pos: {
                    x: this.canvasWidth / 2,
                    y: this.canvasHeight / 2
                },

                color: '#f07',

                update: function() {
                    if (app.coq.inputter.state(app.coq.inputter.W)) {
                        this.pos.y -= 3;
                    }
                    else if (app.coq.inputter.state(app.coq.inputter.A)) {
                        this.pos.x -= 3;
                    }
                    else if (app.coq.inputter.state(app.coq.inputter.D)) {
                        this.pos.x += 3;
                    }
                    else if (app.coq.inputter.state(app.coq.inputter.S)) {
                        this.pos.y += 3;
                    }
                }
            });
        },

        update: function(tick) {
            var app = this;

            if (this.snowCount <= 200) {
                this.coq.entities.create(App.Entities.Snow, {
                    pos: {
                        x: App.helpers.randomNum(this.canvasWidth),
                        y: App.helpers.randomNum(500) * -1
                    },

                    size: {
                        x: App.helpers.randomNum(20),
                        y: App.helpers.randomNum(10),
                    },

                    color: (function() {
                        if (app.snowCount % 2 == 0) {
                            return '#ddd';
                        } else {
                            return '#ccc';
                        }
                    })(),

                    update: function() {
                        if (App.helpers.randomNum(10) % 2 == 1) {
                            this.pos.x = this.pos.x + 0.5;
                        } else {
                            this.pos.x = this.pos.x - 0.5;
                        }

                        this.pos.y = this.pos.y + 0.7
                    }
                });

                this.snowCount += 1;
            }

            _.each(this.coq.entities.all(), function(entity) {
                if (!(entity instanceof App.Entities.Snow)) return;
                if (entity.pos.x > this.canvasWidth || entity.pos.y > this.canvasHeight) {
                    this.coq.entities.destroy(entity, function() {
                        app.snowCount -= 1;
                    });
                }
            }.bind(this));
        },

        draw: function() {

        }
    };
})();