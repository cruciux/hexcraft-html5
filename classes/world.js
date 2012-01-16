
$.Class('World',{},{
    init: function(game, width, height) {
        this.game = game;
        this.pos = new Vector(0,0);
        this.width = width;
        this.height = height;
                        
        this.mouseDown = false;
        this.redraw = true;
        this.hexagonsToRedraw = [];
        this.lastTranslation = {
            x:0, 
            y:0
        };
                        
        this.hexagons = [];
        this.hexagonsMap = {};
        for (y = 0; y < 20; y++) {
            this.hexagonsMap[y] = {};
            for (x = 0; x < 20; x++) {
                var xoffset = Hexagon.h + Hexagon.side;
                var yoffset = Hexagon.r * 2;
                var ychange = 0;
                if (x % 2 == 1) {
                    ychange = -Hexagon.r;
                //xoffset -= 3;
                }
                                
                var pos = new Vector(x * xoffset, y * yoffset + ychange);
                pos.round();
                                
                var hex = new Hexagon(pos, new Vector(x,y));
                                
                this.hexagons.push(hex);
                this.hexagonsMap[y][x] = hex;
            }
        }
                        
        this.units = [];
        this.units.push(new Unit(new Vector(50,50), this.hexagons[1] ));
    },
    update: function(delta) {
                        
        var mouse = this.game.mouse.world;
        var hexChanged = false;
                        
        var mouseTileEstimate = new Vector(mouse.x/(Hexagon.side + Hexagon.h), mouse.y/(Hexagon.r*2));
        mouseTileEstimate.round();
                        
        var range = 2;
                        
        for (x = mouseTileEstimate.x - range; x < mouseTileEstimate.x + range; x++) {
            for (y = mouseTileEstimate.y - range; y < mouseTileEstimate.y + range; y++) {
    
                                
                if (this.hexagonsMap[y] == undefined || this.hexagonsMap[y][x] == undefined) {
                    continue;
                }
                                
                var hex = this.hexagonsMap[y][x];
                                
                hexChanged = false;

                // See if mouse is hovering over this hex
                if (Math.pow(hex.centrePos.x - mouse.x, 2) + Math.pow(hex.centrePos.y - mouse.y, 2) <= Math.pow(Hexagon.radius,2)) {
                    hex.hovered = true;
                    hexChanged = true; 
                } else if (hex.hovered) {
                    hex.hovered = false;
                    hexChanged = true;
                }

                // See if hex has been clicked
                if (this.mouseDown && hex.hovered) {
                    hex.highlighted = true;
                    hexChanged = true;

                } else if (!this.mouseDown && hex.highlighted) {
                    hex.highlighted = false;
                    hexChanged = true;
                }

                // If hex has changed at all, redraw it
                if (hexChanged) {
                    this.hexagonsToRedraw.push(hex);
                }
            }
        }
                        
                        
                        
    },
    draw: function(context) {
                 
        var mapBuffer = this.game.mapBuffer;
        var mapContext = mapBuffer.getContext('2d');
                        
        if (this.redraw) {
            //this.redraw = false;
                            
            // Clear the map
            mapContext.clearRect(0, 0, Game.viewWidth, Game.viewHeight);
                            
            // Draw the hexagons
            for (i in this.hexagons) {
                this.hexagons[i].draw(mapContext);
            }
        }
        if (this.hexagonsToRedraw.length > 0) {
                            
            // Redraw just the selected hexagons
            for (i in this.hexagonsToRedraw) {
                this.hexagonsToRedraw[i].draw(mapContext);
            }
                            
            this.hexagonsToRedraw = [];
        }
        
        context.save();
        context.clearRect(0, 0, Game.viewWidth * 2, Game.viewHeight * 2);
        context.translate(this.game.translation.x, this.game.translation.y);
        context.drawImage(mapBuffer, 0, 0);
        context.restore();
    },
    handleMouseDown: function() {
        this.mouseDown = true;
    },
    handleMouseUp: function() {
        this.mouseDown = false;
                        
        for (i in this.hexagons) {
            var hex = this.hexagons[i];
            if (hex.highlighted) {
                hex.selected = true;
                                
                this.hexagonsToRedraw.push(hex);
            }
        }
    }
});
                
                