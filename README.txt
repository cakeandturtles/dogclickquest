the quest of dog click to help all the residents of square land:
----------------------------------------
-pick your avatar: are you a boy or a girl (x) tag yourself i'm dog click
----------------------------------------

dream animal crossing

you wake up and leave your house and the land is all different

walking around and you can’t ever get back to the same place you were at and the scenery changes

catch weird fish and bugs and your inventory randomly changes

different animal friends talk about things and conversations that you don’t remember about

props to:
    -https://gist.github.com/mseeley/9321422
    

---------------------------------
TODO:        

[ ] - make room manager (kind of like an event manager)
    class FrogRoom extends Room {
        constructor() {
            this.dog = Global.dog;
            this.frog = new Frog();
        }
        
        update(){
            dog.update();
            frog.update();
        
            super.update();
        }
    }