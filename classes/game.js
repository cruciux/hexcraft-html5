$.Class('Game',{
    fps: 60,
    viewWidth: 500,
    viewHeight: 500,
    worldWidth: 500,
    worldHeight: 500,
    numLayers: 1
},{
    init: function() {
                        
        // Create jQuery object 
        this.$object = $("#game").width(Game.viewWidth); //.height(Game.viewHeight);
                        
        // Create layers (each is a canvas)
        this.layers = {};
        for (i = 0; i < Game.numLayers; i++) {
            var layer = $('<canvas class=" layer'+ i +'"></canvas>').appendTo(this.$object)
            .attr('width',Game.viewWidth)
            .attr('height',Game.viewHeight)
            .css('z-index', i);
                            
            this.layers[i] = layer.get(0);
        }
                        
        // A buffer layer
        this.mapBuffer = $('<canvas class="buffer layer mapbuffer"></canvas>').appendTo(this.$object)
        .attr('width',Game.worldWidth)
        .attr('height',Game.worldHeight).get(0);
        
        // A game buffer layer
        this.gameBuffer = $('<canvas class="buffer layer gamebuffer"></canvas>').appendTo(this.$object)
        .attr('width',Game.worldWidth * 10)
        .attr('height',Game.worldHeight * 10).get(0);
                        
        // World
        this.world = new World(this, Game.worldWidth, Game.worldHeight);
                        
        // Camera (view)
        this.camera = new Camera(0,0);
                        
        // Game loop
        var self = this;
        setInterval(function() {
            self.gameLoop()
        }, 1000 / Game.fps);
                        
        // Keyboard states
        this.keysDown = {};
                        
        // Mouse state
        this.mouse = {
            canvas: {
                x:0,
                y:0
            },
            world: {
                x:0,
                y:0
            }
        }
                        
        this.translation = {};
        this.lastTimestamp = new Date().getTime();
                        
                        
        // Keyboard handlers
        this.$object.keydown(function(event) { 
            self.keysDown[event.keyCode] = true;
        });
                        
        this.$object.keyup(function(event) {
            delete self.keysDown[event.keyCode];
        });
                        
        this.$object.mousemove(function(event) { 
            self.mouse.canvas.x = event.pageX - this.offsetLeft;
            self.mouse.canvas.y = event.pageY - this.offsetTop;
        });
                        
        this.$object.mousedown(function() { 
            self.world.handleMouseDown();
        });
                        
        this.$object.mouseup(function() { 
            self.world.handleMouseUp();
        });
    },
    gameLoop: function() {
                        
        // Calculate delta
        var currentTimestamp = new Date().getTime();
        var delta = currentTimestamp - this.lastTimestamp;
        this.lastTimestamp = currentTimestamp;
                        
                        
        this.handleInput(delta);
                        
        this.update(delta);
                        
        this.draw();
    },
    handleInput: function(delta) {
                        
                        
        // Key presses
        if (38 in this.keysDown) {  /* Up arrow was pressed */
            this.camera.moveUp(delta);
        }
                        
        if (40 in this.keysDown) {  /* Down arrow was pressed */
            this.camera.moveDown(delta);
        }
                        
        if (37 in this.keysDown) {  /* Left arrow was pressed */
            this.camera.moveLeft(delta);
        }
                        
        if (39 in this.keysDown) {  /* Right arrow was pressed */
            this.camera.moveRight(delta);
        }
        
        if (90 in this.keysDown) {
            this.camera.zoomIn();
        }
        if (88 in this.keysDown) {
            this.camera.zoomOut();
        }
                        
                        
        // Update world coords depending on the position of the view/camera
        this.translation = new Vector(
            (Game.viewWidth / 2) - this.camera.x,
            (Game.viewHeight / 2) - this.camera.y
            );
                        
        // Round numbes..
        this.translation.round();
                        
        // Convert mouse input to world
        this.mouse.world.x = (this.mouse.canvas.x / this.camera.zoom - this.translation.x); // * this.camera.zoom;
        this.mouse.world.y = (this.mouse.canvas.y / this.camera.zoom - this.translation.y); // * this.camera.zoom;
    },
    update: function(delta) {
        this.world.update(delta);
    },
    draw: function () {
        
        var context = this.gameBuffer.getContext("2d");
                        
        //// Layer 0, the background of tiles
                    
        // Draw the world
        this.world.draw(context);
        
        
        //context.clearRect(0, 0, Game.viewWidth, Game.viewHeight);
        context.save();
        context.translate(this.translation.x, this.translation.y);
        for (i in this.world.units) {         
            this.world.units[i].draw(context);
        }
        
        
        // Draw the mouse
        context.fillStyle = "#000000";
        context.beginPath();
        context.arc(this.mouse.world.x, this.mouse.world.y, 10, 0, Math.PI*2, true);
        context.closePath()
        context.fill();
        
        context.restore();
        
        var screenContext = this.layers[i].getContext("2d");
        
        screenContext.save();
        screenContext.clearRect(0, 0, Game.viewWidth, Game.viewHeight);
        screenContext.scale(this.camera.zoom, this.camera.zoom);
        screenContext.drawImage(this.gameBuffer, 0, 0);
        screenContext.restore();                
        
        console.log(this.camera.zoom);
    }
});
                