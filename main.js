$(function () {    
    var arena;

    var startArena = function startArena() {
        arena = new Arena();
        
        arena.resizeTo(500, 500);
        arena.moveTo(100, 100);
        
        window.arena = arena;
        
        $.when(arena.ready()).then(function() {
            // arena is ready after window created and Arena.initialize
            console.log('arena ready');
            
            var team1 = new Team({name:'Player1', position:'left'}),
                team2 = new Team({name:'Player2', position:'right'});
                
            arena.addTeam(team1);
            arena.addTeam(team2);
            
            $.when(team1.ready()).then(function () {
                console.log('team 1 ready!');
            });
            
            $.when(team2.ready()).then(function () {
                console.log('team 2 ready!');
            });
        });
    };
    
    var arenaStatus = function arenaStatus() {
        arena.status();
    };
    
    var stopArena = function stopArena() {
        arena.stop();
    };
    
    // store all of the cross-window initialization events here
    window._init = {};
    
    // wire up click on start button
    $('#start').on('click', startArena);
    $('#status').on('click', arenaStatus);
    $('#stop').on('click', stopArena);
});