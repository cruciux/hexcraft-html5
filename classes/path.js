$.Class('Path',{},{
    init: function() {
        this.tiles = [];
    },
    clear: function() {
        this.tiles = [];
    },
    add: function(tile) {
        this.tiles.push(tile);
    }
});