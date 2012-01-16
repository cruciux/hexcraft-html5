
var hexSide = 100;

$.Class('Hexagon',{
    side: hexSide,
    h: Math.sin(0.523598776) * hexSide,
    r: Math.cos(0.523598776) * hexSide,
    radius: hexSide * 0.93
},{
    init: function(pos, slot) {
        this.pos = pos;
        this.slot = slot;
        this.centrePos = new Vector(pos.x + (Hexagon.side / 2), pos.y + Hexagon.r);
                        
        this.hovered = false;
        this.highlighted = false;
        this.selected = false
                        
        this.points = {};
                        
        this.points[0] = new Vector(this.pos.x, this.pos.y).round();
        this.points[1] = new Vector(this.pos.x + Hexagon.side, this.pos.y).round();
        this.points[2] = new Vector(this.pos.x + Hexagon.side + Hexagon.h, this.pos.y + Hexagon.r).round();
        this.points[3] = new Vector(this.pos.x + Hexagon.side, this.pos.y + Hexagon.r + Hexagon.r).round();
        this.points[4] = new Vector(this.pos.x, this.pos.y + Hexagon.r + Hexagon.r).round();
        this.points[5] = new Vector(this.pos.x - Hexagon.h, this.pos.y + Hexagon.r ).round();
    },
    draw: function(context) {
                        
        if (this.selected) {
            context.fillStyle = "#000000";
        }
        else if (this.highlighted && this.hovered) {
            context.fillStyle = "#AD03AD";
        }
        else if (this.highlighted) {
            context.fillStyle = "#DD00DD";
        }
        else if (this.hovered) {
            context.fillStyle = "#DDDDDD";
        } else {
            context.fillStyle = "#EFEFEF";
        }
        context.strokeStyle = "#9CAFEA";
        context.beginPath();
        context.moveTo(this.points[5].x, this.points[5].y);
                        
        for (i in this.points) {
            context.lineTo(this.points[i].x, this.points[i].y);
                            
        }
                        
        context.closePath();
        context.stroke(); 
        context.fill(); 
    },
    
    squaredDistanceFromPosition: function(pos) {
        
    }
});