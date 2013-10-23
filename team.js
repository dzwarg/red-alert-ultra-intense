window.Team = (function team_js() {
    var Team = function Team(options) {    
        console.log('creating new team');
        
        this._loaded = new $.Deferred();
        
        // IF this is called from the main window, launch a new team window
        if (window.name === '') {
            console.log('opening new team window');
            
            var winOpts = 'top=100,width=100,height=500,location=no,menubar=no,scrollbars=no,status=no,toolbar=no';
            if (options.position === 'left') {
                winOpts += ',left=0';
            }
            if (options.position === 'right') {
                winOpts += ',left=600';
            }
            
            this.proxy = window.open('team.html', options.name, winOpts);
            
            window._init[options.name] = $.proxy(function () {
                console.log('team _init');
                this.initialize(options);
            }, this);
        }
    };

    var proto = {
        initialize: function (options) {
            // initialize properties of a new team:
            //   * players
            //   * opener window
            
            console.log('initializing team properties');
            
            this.name = options.name;
            this.players = [];
            this.base = window.opener;
            
            this._loaded.resolve();
        },
        
        ready: function () {
            return this._loaded.promise();
        },
        
        start: function status() {
            console.log('starting up team');
        
            // do something cool, like: bring in team members
        },
        
        stop: function stop() {
            console.log('stopping team');
            
            if (this.proxy && this.proxy.team) {
                this.proxy.team.stop();
                return;
            }
        
            for (var i = this.players.length - 1; i--; i >= 0) {
                console.log('removing player ' + this.players[i].name);
                this.players[i] = null;
            }
            
            // do something cool, like: exit stage left            
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
        }
    };
    
    $.extend(Team.prototype, proto);
    
    return Team;
})();