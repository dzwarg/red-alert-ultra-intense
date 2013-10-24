window.Player = (function player_js() {
	randomizeName = function() {
		var chars = new Array(26*2),
			i,
			n,
			name = '';
		for (i = 0; i < 26; i++) {
			// upper case letters
			chars[i] = String.fromCharCode(65+i);
			// lower case letters
			chars[i+26] = String.fromCharCode(97+i);
		}
		
		n = Math.round(5 + Math.random() * 10);
		for (i = 0; i < n; i++) {
			name += chars[Math.floor(Math.random() * 26 * 2)];
		}
		
		return name;
	};
	
	randomizeStrength = function() {
		return Math.round(5 + Math.random() * 10);
	};

    var Player = function Player(options) {
        this.initialize(options);
    };

    var proto = {
        initialize: function (options) {
            this.name = randomizeName();
            this.strength = randomizeStrength();
            
        	console.log('creating player ' + this.name);
        },
        
    };
    
    $.extend(Player.prototype, proto);
    
    return Player;
})();