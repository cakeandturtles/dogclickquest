let _resources_images = {};

let _resources_worker = null;
let _resources_worker_dir = "scripts/clickengine/";
//NOTE: has to be relative to the worker_dir...
let _resources_resource_dir = "../../resources";

let _resources_num_loaded = 0;
let _resources_num_loading = 1;

class Resources {
    static images() { return _imageLoader_images; }
    
    static getImage(img_name) {
        return _resources_images[img_name];
    }
    
    static getProgress() { 
        return _resources_num_loaded / _resources_num_loading;
    }
    
    static _startWorker() {
        _resources_worker = new Worker(_resources_worker_dir + "ResourceWorker.js");
    }
    
    static _stopWorker() {
        _resources_worker.terminate();
        _resources_worker = undefined;
    }
    
    /**
    * @param args {
    *           images //an array of image sources, relative to a resource dir
    *           dir    //a string representing the resource directory. defaults to "../../resources/"
    *                  //NOTE: this must be relative to the ResourceWorker.js directory.. which is dumb
    *           onload //a callback to be called when all the images have been loaded
    *        }
    *
    * loads an array of images (from the given array of img sources) 
    * into the _resources_images dictionary
    *   key = name of image in image src (excluding directories and file extension)
    * using a web worker and calls the callback once all images have loaded
    **/
    static loadImages(args) {
        //mostly https://gist.github.com/mseeley/9321422
        var img_srcs = args.images || [];
        var resource_dir = args.dir || _resources_resource_dir;
        var callback = args.onload || function(){};
        
        // Mix in a cache-bust on every run.
        // (also add dir name)
        var true_img_srcs = img_srcs.map(function (img_src) {
            return resource_dir + '/' + img_src + '?ts=' + Date.now();
        });
        
        //set up the worker
        this._startWorker();
        _resources_worker.onmessage = function(e) {
            _resources_num_loaded = 0;
            _resources_num_loading = img_srcs.length;
            
            //These will come immediately from cache.
            //Ensure cache is not disabled by dev tools.
            for (var i = 0; i < true_img_srcs.length; i++){
                var img = new Image();
                img.name = img_srcs[i];
                img.onload = function() {
                    delete this.onload;
                    _resources_images[this.name] = this;
                    if (++_resources_num_loaded == _resources_num_loading) {
                        console.log('done');
                        Resources._stopWorker();
                        callback();
                    }
                };
                img.src = true_img_srcs[i];
            }
        }
        
        _resources_worker.postMessage(true_img_srcs);
    }
}