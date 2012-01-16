$.Class('Unit',{},{
    init: function(pos, hexagon) {
        this.pos = pos;
        this.hexagon = hexagon;
    },
    update: function(delta) {
                        
    },
    draw: function(context) {
        context.fillStyle = "#000000";
        context.beginPath();
        context.arc(this.hexagon.centrePos.x, this.hexagon.centrePos.y, 10, 0, Math.PI*2, true);
        context.closePath()
        context.fill();
    }
});