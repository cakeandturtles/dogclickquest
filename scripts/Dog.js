class Dog extends Animal {
    constructor() {
        super();
        this.animation.change(0, 0, 3);
        this.animation.frame_delay = 10;
        
        this.IDLE_TIME = 360;
        this.idle = this.IDLE_TIME - 100;
        this.inventory = {};
    }
    
    update() {
        super.update();
        
        //dance
        if (this.animation.animation_end){
            if (this.animation.y_frame == 0)
                this.animation.y_frame = 1;
            else if (this.animation.y_frame == 1)
                this.animation.y_frame = 0;
            else if (this.animation.y_frame == 2)
                this.animation.y_frame = 3;
            else if (this.animation.y_frame == 3)
                this.animation.y_frame = 2;
        }
        
        var speed = 2;
        var moved = false;
        
        if (Input.isKeyDown(Input.LEFT_KEY)){
            this.x -= speed;
            moved = true;
            // stick facing left
            this.animation.y_frame = 1;
        }
        if (Input.isKeyDown(Input.RIGHT_KEY)){
            this.x += speed;
            moved = true;
            // stick facing right
            this.animation.y_frame = 0;
        }
        if (Input.isKeyDown(Input.UP_KEY)){
            this.y -= speed;
            moved = true;
            // Change to up facing animation
            if (this.animation.y_frame < 2)
                this.animation.y_frame += 2;
        }
        if (Input.isKeyDown(Input.DOWN_KEY)){
            this.y += speed;
            moved = true;
            // Change to down facing animation
            if (this.animation.y_frame >= 2)
                this.animation.y_frame -= 2;
        }
        
        if (moved){
            this.animation.frame_delay = 8;
            // stop idle animation
            this.idle = 0;
        }else{
            // make an idle dance animation that slowly speeds up as the player remains idle
            this.idle+=0.5;
            var delay = this.IDLE_TIME - this.idle;
            if (delay > 64) delay = 64;
            if (delay < 16) delay = 16;
            this.animation.frame_delay = delay;
        }
    }
}