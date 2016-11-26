class Dog extends clickengine.GameObject {
    constructor() {
        super();
        this.animation.change(0, 0, 3);
        this.animation.frame_delay = 10;

        this.IDLE_TIME = 360;
        this.idle = this.IDLE_TIME - 100;
        this.inventory = {};

        this.destination = {
            x: 0,
            y: 0
        }
        this.clicked = false;
        this.friend = null;
        this.maybe_friend = null;
    }

    maybeHangOutWith(entity) {
        if (entity.interactionCollision(dog)) {
            this.maybe_friend = entity;
            if (Input.isKeyPressed(Input.X)) {
                if (dog.friend != entity) {
                    dog.friend = entity;
                } else {
                    dog.friend = null;
                }
            }
        }
    }

    update(entities) {
        var speed = 2;
        var moved = false;

        this.vel = { x: 0, y: 0 };
        this.maybe_friend = null;
        if (!this.clicked) this.destination = { x: this.x, y: this.y };
        if (Input.isKeyDown(Input.LEFT_KEY) || this.destination.x < this.x){
            this.vel.x = -speed;
            moved = true;
            // stick facing left
            this.animation.y_frame = 1;
        }
        if (Input.isKeyDown(Input.RIGHT_KEY) || this.destination.x > this.x){
            this.vel.x = speed;
            moved = true;
            // stick facing right
            this.animation.y_frame = 0;
        }
        if (Input.isKeyDown(Input.UP_KEY) || this.destination.y < this.y){
            this.vel.y = -speed;
            moved = true;
            // Change to up facing animation
            if (this.animation.y_frame < 2)
                this.animation.y_frame += 2;
            if (this.vel.x == 0) this.dance();
        }
        if (Input.isKeyDown(Input.DOWN_KEY) || this.destination.y > this.y){
            this.vel.y = speed;
            moved = true;
            // Change to down facing animation
            if (this.animation.y_frame >= 2)
                this.animation.y_frame -= 2;
            if (this.vel.x == 0) this.dance();
        }

        if (this.friend != null) {
            this.vel = { x: 0, y: 0 };
        }

        if (moved){
            this.animation.frame_delay = 8;
            // stop idle animation
            this.idle = 0;
        } else {
            // make an idle dance animation that slowly speeds up as the player remains idle
            this.idle++;
            var delay = this.IDLE_TIME - this.idle;
            if (delay > 64) delay = 64;
            if (delay < 16) delay = 16;
            this.animation.frame_delay = delay;
        }

        super.update(entities);
    }

    dance() {
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
    }

    render() {
        super.render();
        if (this.maybe_friend != null) {
            ctx.fillStyle = "#000000";
            var x = this.x + this.animation.frame_width/2 - 4;
            var y = this.y - 4;
            ctx.fillRect(x, y, 16, 16);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(x + 7, y + 3, 2, 6);
            ctx.fillRect(x + 7, y + 11, 2, 2);
        }
    }
}
