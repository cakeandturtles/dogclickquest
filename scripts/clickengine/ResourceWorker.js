self.onmessage = function(e) {
    var urls = e.data;
    var count = urls.length;
    var onload = function() {
        if (--count == 0) {
            self.postMessage('Done!');
            self.close();
        }
    };
    
    urls.forEach(function(url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = xhr.onerror = onload;
        xhr.open('GET', url, true);
        xhr.send();
    });
}