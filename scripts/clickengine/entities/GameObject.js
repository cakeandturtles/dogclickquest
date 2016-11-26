clickengine.GameObject = (class GameObject {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.interaction_rect = {
            left: 0,
            top: 0,
            width: 64,
            height: 64
        }
        this.solid_rect = {
            left: 16,
            top: 16,
            width: 48,
            height: 48
        }
        this.vel = {
            x: 0,
            y: 0
        }

        this.animation = new Animation();
        this.animation.change(0, 0, 1);
        this.animation.frame_delay = 64;
    }

    setRect_(rect_name, left, top, width, height) {
        if (left.left) {
            top = left.top;
            width = left.width;
            height = left.height;
            left = left.left;
        }
        this[rect_name] = {
            left: left,
            top: top,
            width: width,
            height: height
        }
    }
    setSolidRect(left, top, width, height) {
        this.setRect_('solid_rect', left, top, width, height);
    }
    setInteractionRect(left, top, width, height) {
        this.setRect_('interaction_rect', left, top, width, height);
    }

    update(entities) {
        if (!entities) { entities = []; }
        this.handleCollisionsAndMove_(entities);
        this.animation.update();
    }

    render() {
        ctx.strokeStyle = "#440044";
        var R = this.solid_rect;
        ctx.strokeRect(this.x + R.left, this.y + R.top, R.width, R.height);

        ctx.strokeStyle = "#ff00ff";
        R = this.interaction_rect;
        ctx.strokeRect(this.x + R.left, this.y + R.top, R.width, R.height);

        this.animation.render(this.image, this.x, this.y);
    }

    copySolidRect() {
        return {
            left: this.solid_rect.left,
            top: this.solid_rect.top,
            width: this.solid_rect.width,
            height: this.solid_rect.height
        };
    }
    pasteSolidRect(rect) {
        this.solid_rect = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height
        }
    }

    solidCollision(object) {
        return this.collision_(object, 'solid_rect');
    }
    interactionCollision(object) {
        return this.collision_(object, 'interaction_rect',
            function(object) {
                object.animation.frame_delay = 12;
                this.animation.frame_delay = 12
            }.bind(this, object),
            function(object) {
                this.animation.frame_delay = 64;
            }.bind(this, object)
        );
    }
    collision_(object, rect_name, success_callback, failure_callback) {
        var thisR = this[rect_name];
        var thisX = this.x + thisR.left;
        var thisY = this.y + thisR.top;
        var objectR = object[rect_name];
        var objectX = object.x + objectR.left;
        var objectY = object.y + objectR.top;
        if (thisX <= objectX + objectR.width &&
                thisX + thisR.width >= objectX &&
                thisY <= objectY + objectR.height &&
                thisY + thisR.height >= objectY) {
            if (typeof(success_callback) == 'function') {
                success_callback();
            }
            return true;
        }
        if (typeof(failure_callback) == 'function') {
            failure_callback();
        }
        return false;
    }

    handleCollisionsAndMove_(entities) {
        this.handleCollisionsGeneric_(entities, 'x', 'left', 'width');
        this.x += this.vel.x;
        this.handleCollisionsGeneric_(entities, 'y', 'top', 'height');
        this.y += this.vel.y;
    }

    handleCollisionsGeneric_(entities, x_or_y, left_or_top, width_or_height) {
        var true_solid_rect = this.copySolidRect();
        for (var i = 0, entity; entity = entities[i]; i++) {
            this.solid_rect[left_or_top] += (this.vel[x_or_y] - 1);
            // Handle left/top collisions
            if (this.vel[x_or_y] < 0) {
                if (this.solidCollision(entity)) {
                    this.vel[x_or_y] = 0;
                    this[x_or_y] = entity[x_or_y] + entity.solid_rect[left_or_top]
                            + entity.solid_rect[width_or_height]
                            - true_solid_rect[left_or_top] + 1;
                }
            }

            this.pasteSolidRect(true_solid_rect);
            this.solid_rect[width_or_height] += (this.vel[x_or_y] + 1);
            // Handle right/bottom collisions
            if (this.vel[x_or_y] > 0) {
                if (this.solidCollision(entity)) {
                    this.vel[x_or_y] = 0;
                    this[x_or_y] = entity[x_or_y] + entity.solid_rect[left_or_top]
                            - true_solid_rect[left_or_top]
                            - true_solid_rect[width_or_height] - 1;
                }
            }
            this.pasteSolidRect(true_solid_rect);
        }
    }
});
