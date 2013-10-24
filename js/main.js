$(function () {    
    var arena;

    var startArena = function startArena() {
        arena = new Arena();
        
        arena.resizeTo(700, 468);
        arena.moveTo(100, 100);
        
        window.arena = arena;
        
        $.when(arena.ready()).then(function() {
            // arena is ready after window created and Arena.initialize
            console.log('arena ready');
            
            var team1 = new Team({name:'Player1'}),
                team2 = new Team({name:'Player2'});
                
            team1.resizeTo(100,468);
            team1.moveTo(0,100);
            
            team2.resizeTo(100,468);
            team2.moveTo(800,100);
            arena.addTeam(team1);
            arena.addTeam(team2);
            
            $.when(team1.ready()).then(function () {
                console.log('team 1 ready!');
                
                team1.start();
            });
            
            $.when(team2.ready()).then(function () {
                console.log('team 2 ready!');
                
                team2.start();
            });
            
            $.when(team1.ready(), team2.ready()).then(function() {
                arena.start();
            });
        });
    };
    
    var arenaStatus = function arenaStatus() {
        arena.status();
    };
    
    var stopArena = function stopArena() {
        if (arena) {
            arena.stop();
        }
    };
    
    // store all of the cross-window initialization events here
    window._init = {};
    
    // wire up click on start button
    $('#start').on('click', startArena);
    $('#status').on('click', arenaStatus);
    $('#stop').on('click', stopArena);
});