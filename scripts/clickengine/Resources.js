let _resources_images = {};
let _resources_dir = "resources";

class Resources {
    static images(){ return _imageLoader_images; }
    
    static getImage(img_name){
        return _resources_images[img_name];
    }
    
    /**
    * loads an image (from the given source) 
    * into the _resources_images dictionary
    *   key = name of image in image src (excluding directories and file extension)
    * and calls the callback, passing the image as the parameter
    **/
    static loadImage(img_src, callback) {
        var split = img_src.split("/");
        var img_ext_name = split[split.length-1];
        var split = img_ext_name.split(".");
        var img_name = split.slice(0, split.length-1).join(".");
        
        var image = new Image();
        image.onload = function(){
            callback(_resources_images[img_name]);
        }
        image.src = _resources_dir + "/" + img_src;
        _resources_images[img_name] = image;
    }
}