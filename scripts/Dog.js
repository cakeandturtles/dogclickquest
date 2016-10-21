class Dog extends Animal {
    constructor() {
        super();
        this.animation.change(0, 0, 3);
        this.animation.frame_delay = 10;
        this.inventory = {};
    }
    
    update() {
        super.update();
        
        //dance
        if (this.animation.animation_end){
            if (this.animation.y_frame == 0)
                this.animation.y_frame = 1;
            else this.animation.y_frame = 0;
        }
        
        var speed = 2;
        var moved = false;
        
        if (Input.isKeyDown(Input.LEFT_KEY)){
            this.x -= speed;
            moved = true;
            this.animation.y_frame = 1;
        }
        if (Input.isKeyDown(Input.RIGHT_KEY)){
            this.x += speed;
            moved = true;
            this.animation.y_frame = 0;
        }
        if (Input.isKeyDown(Input.UP_KEY)){
            this.y -= speed;
            moved = true;
        }
        if (Input.isKeyDown(Input.DOWN_KEY)){
            this.y += speed;
            moved = true;
        }
        
        if (moved){
            this.animation.frame_delay = 8;
        }else{
            this.animation.frame_delay = 999;
        }
    }
}