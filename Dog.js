class Dog extends Animal {
    constructor(){
        super();
        this.animation.change(0, 0, 3);
        this.animation.frame_delay = 10;
    }
    
    update(){
        super.update();
        
        //dance
        if (this.animation.animation_end){
            if (this.animation.y_frame == 0)
                this.animation.y_frame = 1;
            else this.animation.y_frame = 0;
        }
    }
}