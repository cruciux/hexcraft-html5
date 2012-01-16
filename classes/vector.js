$.Class('Vector',{},{
    init: function(x, y) {
        this.x = x;
        this.y = y;
    },
    round: function() {
        this.x = (0.5 + this.x) << 0;
        this.y = (0.5 + this.y) << 0;
        return this;
    }
});
                