window.Player = (function player_js() {
    var Player = function Player(options) {    
        console.log('creating new player');
        
        this.initialize(options);
    };

    var proto = {
        initialize: function (options) {
            this.name = this.randomizeName();
        },
        
        randomizeName: function() {
            var chars = new Array(26*2),
                i,
                n,
                name = '';
            for (i = 0; i < 26; i++) {
                chars[i] = String.fromCharCode(i);
                chars[i+26] = String.fromCharCode(32+i);
            }
            
            n = Math.round(Math.random() * 20);
            for (i = 0; i < n; i++) {
                name += chars[Math.round(Math.random() * 26 * 2)];
            }
            
            return name;
        }
    };
    
    $.extend(Player.prototype, proto);
    
    return Player;
})();