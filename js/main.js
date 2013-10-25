$(function () {    
    var arena,
    	team1,
    	team2,
    	width = window.screen.availWidth,
    	height = window.screen.availHeight;
	
    var startArena = function startArena() {
        arena = new Arena({height:700, width:468});
        
        arena.resizeTo(700, 468);
        arena.moveTo((width-700)/2, 100);
        
        window.arena = arena;
        
        arena.ready().then(function() {
            // arena is ready after window created and Arena.initialize
            console.log('arena ready');
            
            team1 = new Team({name:'Team 1', width:(width-700)/2}),
            team2 = new Team({name:'Team 2', width:(width-700)/2});
                
            team1.resizeTo((width-700)/2,height-100);
            team1.moveTo(0,100);
            
            team2.resizeTo((width-700)/2,height-100);
            team2.moveTo(width-(width-700)/2,100);
            
            arena.addTeam(team1);
            arena.addTeam(team2);
        })
        .then(function() {
            team1.ready().then(function () {
                console.log('team 1 ready!');
                
                team1.start();
            });
            
            team2.ready().then(function () {
                console.log('team 2 ready!');
                
                team2.start();
            });
        })
        .then(function() {
            return $.when(team1.started(), team2.started());
        })
        .then(function() {
        	// teams are ready
            arena.start();
        });
    };
    
    var stopArena = function stopArena() {
        if (arena) {
            arena.stop().then(function() {
            	arena.proxy.close();
            });
        }
    };
    
    // store all of the cross-window initialization events here
    window._init = {};
    
    // wire up click on start button
    $('#start').on('click', startArena);
    $('#stop').on('click', stopArena);
});