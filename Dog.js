class Dog {
    constructor(){
        this.x = 0;
        this.y = 0;
        
        this.animation = new Animation();
        this.animation.change(0, 0, 3);
    }
    
    update(){
        this.animation.update();
        
        //dance
        if (this.animation.animation_end){
            if (this.animation.y_frame == 0)
                this.animation.y_frame = 1;
            else this.animation.y_frame = 0;
        }
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