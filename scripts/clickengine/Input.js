let _input_keys_pressed = {};
let _input_keys_down = {};
let _input_keys_up = {};

class Input {
    constructor(){}
    
    static isKeyDown(key_code){
        return _input_keys_down[key_code];
    }
    
    static isKeyUp(key_code){
        return _input_keys_down[key_code];
    }
    
    static isKeyPressed(key_code){
        return _input_keys_pressed[key_code];
    }
    
    static update(){
        _input_keys_up = {};
        _input_keys_pressed = {};
    }
    
    static onkeydown(e) {
        _input_keys_pressed[e.keyCode] = true;
        _input_keys_down[e.keyCode] = true;
    }
    
    static onkeyup(e) {
        _input_keys_up[e.keyCode] = true;
        delete _input_keys_down[e.keyCode];
    }
}

Input.UP_KEY = 38;
Input.DOWN_KEY = 40;
Input.LEFT_KEY = 37;
Input.RIGHT_KEY = 39;