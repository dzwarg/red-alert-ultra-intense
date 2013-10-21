window.Arena = (function arena_js() {
    var Arena = function Arena() {    
        console.log('creating new arena');
        
        // IF this is called from the app, launch a new arena window
        if (window.name === '') {
            console.log('opening new arena window');
            this.proxy = window.open('arena.html', 'Arena', 'top=100,left=100,width=500,height=500,location=no,menubar=no,scrollbars=no,status=no,toolbar=no');
            return;
        }
        
        // ELSE this is called from the arena window
        
        // initialize properties of a new arena:
        //   * players
        //   * arena window
        
        console.log('initializing arena properties');
        
        this.players = [];
        this.base = window.opener;
    };

    var proto = {
        start: function status() {
            console.log('starting up arena');
        
            // do something cool, like: bring up the house lights
        },
        
        stop: function stop() {
            console.log('stopping arena');
        
            // do something cool, like: bring down the house lights
        },
    
        moveTo: function moveTo(x, y) {
            // moving the arena moves the proxy window
            this.proxy.moveTo(x, y);
        },
        
        resizeTo: function resizeTo(w, h) {
            // resizing the arena resizes the proxy window
            this.proxy.resizeTo(w, h);
        }
    };
    
    $.extend(Arena.prototype, proto);
    
    return Arena;
})();