// Author: Tyler
(function() {
    'use strict';
    
    window.App = {
        Game: {},

        Entities: {},

        helpers: {
            randomNum: function(maxLength) {
                return Math.floor(Math.random() * ++maxLength);
            }
        }
    };    
})();
