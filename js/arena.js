window.Arena = (function arena_js() {
    var Arena = function Arena(options) {
        console.log('creating new arena');
        
        this._loaded = new $.Deferred();
    
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
        initialize: function (options) {
            // initialize properties of a new arena:
            //   * matches
            //   * arena window
            
            console.log('initializing arena properties');
            
            this.teams = [];
            this.matches = [];
            this.base = window.opener;
            
            this._loaded.resolve();
        },
        
        ready: function () {
            return this._loaded.promise();
        },
        
        start: function status() {
            console.log('starting up arena');
        
            // do something cool, like: bring up the house lights
            d3.select(this.proxy.document.body).select('#lights')
                .transition()
                .duration(5000)
                .style('opacity', 0.0);
        },
        
        stop: function stop() {
            console.log('stopping arena');
            
            d3.select(this.proxy.document.body).select('#lights')
                .transition()
                .duration(5000)
                .style('opacity', 1.0);
            
            for (var i = this.teams.length - 1; i--; i >= 0) {
                console.log('removing team ' + this.teams[i].name);
                this.teams[i].stop();
                this.teams[i] = null;
            }
            
            // do something cool, like: bring down the house lights
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
            $.when(team.ready()).then(function () {
                console.log('adding team ' + team.name + ' to arena');
            });
            
            this.teams.push(team);
        }
    };
    
    $.extend(Arena.prototype, proto);
    
    return Arena;
})();