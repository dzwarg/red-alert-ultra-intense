$(function () {    
    var arena;
    
    var startArena = function startArena() {
        arena = new Arena();
        
        arena.resizeTo(500, 500);
        arena.moveTo(100, 100);
        
        window.arena = arena;
    };
    
    var arenaStatus = function arenaStatus() {
        arena.status(); 
    };
    
    // wire up click on start button
    $('#start').on('click', startArena);
    $('#status').on('click', arenaStatus);
});