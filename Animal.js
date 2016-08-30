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
        var clip = this.animation.getClippingRect();
        var width = clip[2];
        var height = clip[3]
        ctx.drawImage(this.image, 
            clip[0], clip[1], width, height,
            this.x, this.y, width, height
        );
    }
}