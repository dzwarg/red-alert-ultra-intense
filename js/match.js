window.Match = (function match_js() {
    var Match = function Match(options) {
    	console.log('creating new match');
    	
    	this._unloaded = new $.Deferred();
    	
    	this.initialize(options);
    };

    var proto = {
    	round: null,
    	
    	clock: null,
    	
    	players: [],
    	
        initialize: function (options) {
        	this.round = 0;
        	this.players = options.players;
        	this.clock = null;
        },
        
        unready: function() {
        	return this._unloaded.promise();
        },
        
        start: function () {
        	console.log('starting match!');
        	
        	this.clock = setInterval($.proxy(this.doRound, this, this.clock), 100);
        },
        
        doRound: function () {
			console.log('battling round ' + (this.round + 1));
        	// calculate the 'battle' rounds creatively!
        	// TODO: add some randomization in here
        	
        	var loser = null, winner = null;
        	
        	// FIXME: this just takes one off the strength of a player per round
        	for (var i = 0; i < this.players.length; i++) {
        		this.players[i].strength -= 1;
        		
        		if (this.players[i].strength < 1) {
					loser = this.players[i];
        			winner = this.players[1 - i];
        		}
        	}
        	
        	if (loser === null && winner === null) {
        		this.round += 1;
        		return;
        	}
        	
        	clearInterval(this.clock);

        	console.log('the winner of this match is: ' + victorious.name + ' after ' + (this.round + 1) + ' rounds');
        	
        	this.stop();
	    },
	   
	    stop: function() {
	    	console.log('stopping match!');
	    	
	    	// TODO: dismiss players
	    	
	    	clearInterval(this.clock);
	    	
	    	this._unloaded.resolve();
        	
        	// TODO: trigger a 'game over' event
        	// $.trigger('gameover', [{winner:winner, loser:loser}]);
	    }
    };
    
    $.extend(Match.prototype, proto);
    
    return Match;
})();