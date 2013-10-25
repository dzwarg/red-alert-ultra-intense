window.Arena = (function arena_js() {
    var Arena = function Arena(options) {
        console.log('creating new arena');
        
        this._loaded = new $.Deferred();
        this._unloaded = new $.Deferred();
    
        // IF this is called from the app, launch a new arena window
        if (window.name === '') {
            console.log('opening new arena window');
            this.proxy = window.open('arena.html', 'Arena', 'location=no,menubar=no,scrollbars=no,status=no,toolbar=no');

            window._init.Arena = $.proxy(function() {
                console.log('arena _init');
                this.initialize(options);
            }, this);
        }
    };

    var proto = {
    	teams: [],
    	
    	match: null,
    	
    	height: 0, 
    	
    	width: 0,
    	
        initialize: function (options) {
            // initialize properties of a new arena:
            //   * matches
            //   * arena window
            
            console.log('initializing arena properties');
            
            this.teams = [];
            this.match = null;
            
            this.height = options.height;
            this.width = options.width;
                    
            // bring up the house lights
            d3.select(this.proxy.document.body).select('#lights')
                .transition()
                .duration(5000)
                .style('opacity', 0.0);

            this._loaded.resolve();
        },
        
        ready: function () {
            return this._loaded.promise();
        },
        
        start: function status() {
            console.log('starting up arena');
                
            // get players from teams if teams are ready
            if (this.teams.length !== 2) {
            	return;
            }
            
            this.runMatchChain();
        },
        
        runMatchChain: function () {
        	console.log('running match chain');
        	
        	if (!this.teams[0].inTheGame()) {
        		console.log('team 1 is the winner!');
        		// teams[1] is the winner!
        		return;
        	}
        	if (!this.teams[1].inTheGame()) {
        		console.log('team 0 is the winner!');
        		// teams[0] is the winner!
        		return;
        	}
        	
            this.match = this.startMatch();
            
            // recursive through a deferred!
            // this will keep running through all permutations of matches,
            // until no valid player is found on a team
            this.match.complete().then($.proxy(this.runMatchChain, this));
        },
        
        startMatch: function startMatch() {
        	console.log('starting match');
        	
            var players = [
            		this.teams[0].getRandomPlayer(),
            		this.teams[1].getRandomPlayer()
            	],
            	match = new Match({players:players});
            	
            $(match).on('player-update', $.proxy(this.matchUpdate, this));
            $(match).on('players-entered', $.proxy(this.playersEntered, this));
            
            match.start();
            
            return match;
        },
        
        matchUpdate: function matchUpdate() {
        	console.log('updating teams in match');
        	
        	this.teams[0].update();
        	this.teams[1].update();
        },
        
        playersEntered: function playersEntered(event, players, callback) {
        	var arena = this;
        	d3.select(this.proxy.document.body).selectAll('#arena .avatar')
        		.data(players)
        		.enter()
        		.append('img')
        		.attr('class', 'avatar')
        		.attr('src', function (d,i) { return d.avatar.src; })
        		.classed('avatar-left', function (d,i) { return (i===0); })
        		.classed('avatar-right', function (d,i) { return (i===1); });
        },
        
        stop: function stop() {
            console.log('stopping arena');
            
            // bring down the house lights
            d3.select(this.proxy.document.body).select('#lights')
                .transition()
                .duration(5000)
                .style('opacity', 1.0);

            
            if (this.match !== null) {
            	return this.match.stop()
            		.then($.proxy(this.stopTeams, this));
            }
            else {
				return this.stopTeams();
			}
        },
        
        stopTeams: function() {
        	var stoppers = [], stopper;
            for (var i = this.teams.length - 1; i >= 0; i--) {
                console.log('removing team ' + this.teams[i].name);
                
                stopper = this.teams[i].stop();
                stopper = stopper.then($.proxy(function () {
					this.proxy.close();
				}, this.teams[i]));
				
                stoppers.push(stopper);
            }
            
            return $.when.apply(this, stoppers);
        },
    
        moveTo: function moveTo(x, y) {
            // moving the arena moves the proxy window
            this.proxy.moveTo(x, y);
        },
        
        resizeTo: function resizeTo(w, h) {
            // resizing the arena resizes the proxy window
            this.proxy.resizeTo(w, h);
        },
        
        addTeam: function addTeam(team) {
        	// add the team to the arena when the team is ready
        	team.ready().then(function () {
                console.log('adding team ' + team.name + ' to arena');
            });
                        
			this.teams.push(team);
        }
    };
    
    $.extend(Arena.prototype, proto);
    
    return Arena;
})();