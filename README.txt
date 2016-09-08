the quest of dog click to help all the residents of square land

props to:
    -https://gist.github.com/mseeley/9321422
    

---------------------------------
TODO:        
    
[ ] - make init and game loop part of the click engine too!!!

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