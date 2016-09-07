the quest of dog click to help all the residents of square land

---------------------------------
TODO:
[ ] - make resource manager preload with web workers
    window.onload = ResourceManager.loadResources({ 
        dir: "resources", /*defaults to resources folder on same level as your html page*/
        images: 
        {
            "dogsheet.png", "frogsheet.png"
        },
        sounds: {},
        onload: init
    });
        
    
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