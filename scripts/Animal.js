class Animal {
    constructor(){
        this.x = 0;
        this.y = 0;
        
        this.animation = new Animation();
        this.animation.change(0, 0, 1);
        this.animation.frame_delay = 6;
    }
    
    update(){
        this.animation.update();
    }
    
    render(){
        this.animation.render(this.image, this.x, this.y);
    }
}