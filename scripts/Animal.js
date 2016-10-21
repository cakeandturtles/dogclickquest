class Animal {
    constructor(){
        this.x = 0;
        this.y = 0;
        
        this.animation = new Animation();
        this.animation.change(0, 0, 1);
        this.animation.frame_delay = 64;
    }
    
    update(){
        this.animation.update();
    }
    
    render(){
        this.animation.render(this.image, this.x, this.y);
    }
    
    collision(animal) {
        if (this.x <= animal.x + animal.animation.frame_width &&
                this.x + this.animation.frame_width >= animal.x &&
                this.y <= animal.y + animal.animation.frame_height &&
                this.y + this.animation.frame_height >= animal.y) {
            this.animation.frame_delay = 12;
            return true;
        }
        this.animation.frame_delay = 64;
        return false;
    }
}