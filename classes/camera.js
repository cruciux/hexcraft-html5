$.Class('Camera',{},{
    init: function(x, y) {
        this.x = x;
        this.y = y;
        this.zoom = 1;
        this.speed = 0.4;
    },
    moveUp: function(delta) {
        this.y -= delta * this.speed;
    },
    moveDown: function(delta) {
        this.y += delta * this.speed;
    },
    moveLeft: function(delta) {
        this.x -= delta * this.speed;
    },
    moveRight: function(delta) {
        this.x += delta * this.speed;
    },
    zoomIn: function() {
        this.zoom += 0.03;
        if (this.zoom > 1) {
            this.zoom = 1;
        }
    },
    zoomOut: function() {
        this.zoom -= 0.03;
        if (this.zoom < 0.5) {
            this.zoom = 0.5;
        }
    },
    track: function(object) {
        
    }
});
                