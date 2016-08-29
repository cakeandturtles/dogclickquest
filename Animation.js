/**
 * class used as a helper function for rendering sprite sheets
 */
class Animation {
    constructor(){
        this.frame_width = 64;
        this.frame_height = 64;
        
        this.timer = 0;
        this.frame_delay = 8;
        this.curr_frame = 0;
        this.max_frame = 1;
        
        this.x_start_frame = 0;
        this.y_frame = 0;
        this.x_offset = 0;
        this.y_offset = 0;
        
        this.animation_end = false;
        this.frame_change = false;
        this.repeat = true;
    }
    
    change(x, y, max_frame){
        this.x_start_frame = x;
        this.y_frame = y;
        this.max_frame = max_frame;
    }
    
    restart(){
        this.timer = 0;
        this.curr_frame = 0;
        this.animation_end = false;
        this.frame_change = false;
    }
    
    update(){
        this.frame_change = false;
        this.animation_end = false;
        this.timer++;
        if (this.timer >= this.frame_delay) {
            if (this.curr_frame < this.max_frame)
                this.curr_frame++;
            if (this.curr_frame >= this.max_frame) {
                if (this.repeat)
                    this.curr_frame = 0;
                else
                    this.curr_frame = this.max_frame - 1;
                this.animation_end = true;
            }
            this.timer = 0;
            this.frame_change = true;
        }
    }
    
    /**
    * returns an array used for ctx.drawImages parameters
    * [sx, sy, swidth, sheight]
    */
    getClippingRect(){
        var row = this.y_frame;
        var column = this.x_start_frame + this.curr_frame;
        return [
            this.frame_width * column,
            this.frame_height * row,
            this.frame_width,
            this.frame_height
        ];
    }
}