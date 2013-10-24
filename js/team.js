window.Team = (function team_js() {
    var Team = function Team(options) {    
        console.log('creating new team');
        
        this._loaded = new $.Deferred();
        this._unloaded = new $.Deferred();
        
        // IF this is called from the main window, launch a new team window
        if (window.name === '') {
            console.log('opening new team window');
            
            var winOpts = 'location=no,menubar=no,scrollbars=no,status=no,toolbar=no';
            
            this.proxy = window.open('team.html', options.name, winOpts);
            
            window._init[options.name] = $.proxy(function () {
                console.log('team _init');
                this.initialize(options);
            }, this);
        }
    };

    var proto = {
    	name: '',
    	
    	players: [],
    	
        initialize: function (options) {
            // initialize properties of a new team:
            //   * players
            //   * opener window
            
            console.log('initializing team properties');
            
            this.name = options.name;
            this.players = [];
            
            this._loaded.resolve();
        },
        
        ready: function () {
            return this._loaded.promise();
        },
        
        start: function status() {
            console.log('starting up team ' + this.name);
        
            // bring in team members
            var n = Math.round(5 + Math.random() * 10);
            this.players = new Array(n);
            
            for (var i = 0; i < n; i++) {
                this.players[i] = new Player();
            }
            
            var team = d3.select(this.proxy.document.body).select('#roster');
            team.append('h2')
                .text(this.name);
                
            team.selectAll('.player')
                .data(this.players)
                .enter()
                .append('div')
                .attr('class', 'player')
                .style('left', '200px')
                .text(function (d,i) { return i + ': ' + d.name})
                .transition()
                .duration(2000)
                .delay(function (d,i) { return i * 100; })
                .style('left', '0px');
        },
        
        stop: function stop() {
            console.log('stopping team ' + this.name);
            
            for (var i = this.players.length - 1; i--; i >= 0) {
                console.log('removing player ' + this.players[i].name);
                this.players[i] = null;
            }
            
            // do something cool, like: exit stage left  
            var team = d3.select(this.proxy.document.body).select('#roster');
            team.selectAll('.player')
            	.transition()        
            	.duration(2000)
            	.delay(function (d,i) { return i * 100; })
            	.style('left', '-200px');
            	
        	var closeTimeout = 2000 + 100 * team.selectAll('.player').size();
        	setTimeout($.proxy(function(){
        		console.log('team ' + this.name + ' stopped');
        		this._unloaded.resolve();
        	}, this), closeTimeout);
        		
        	return this._unloaded.promise();
        },
    
        moveTo: function moveTo(x, y) {
            // moving the team bench moves the proxy window
            this.proxy.moveTo(x, y);
        },
        
        resizeTo: function resizeTo(w, h) {
            // resizing the team bench resizes the proxy window
            this.proxy.resizeTo(w, h);
        },
        
        setPlayers: function setPlayers(players) {
            console.log('adding ' + players.length + ' players to team');
            
            this.players = players;
        },
        
        getRandomPlayer: function getRandomPlayer() {
        	return this.players[Math.floor(Math.random() * this.players.length)];
        }
    };
    
    $.extend(Team.prototype, proto);
    
    return Team;
})();