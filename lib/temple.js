var temple = new Object();

//defines the temple namespace to avoid cross scripting problems
temple.namespace = '';

//when debug is set to true, messages will be logged to console on errors
temple.debug = false;

//by default temple works with json
//if you want you can change this but you will have to implement your own callbacks
temple.dataType = 'json';

//temple rendering configuration
temple.rc = '';


//default error handling for ajax
//you can define a new one to implement specific hehaviors
temple.ajaxError = function (req, txt, msg) {

}

//this has the scope of the element passed to temple.request
temple.ajaxSuccess = function(data, req, e) {
    if (this.attributes[temple.top] !== undefined && this.attributes[temple.top]) {
        temple.renderBlock(this, data);
    } else {
        temple.renderNode(this, data);
    }
}


//utility to check if an object is a array
temple.isArray = function(obj) {
   if (obj.constructor.toString().indexOf("Array") === -1) {
      return false;
   } else {
      return true;
   }
}

temple.request = function(el, conf) {
    var callback;
    
    if (conf.url === undefined || conf.url === null) {
        if (temple.debug) {
            console.log('You have to define a url.');
        }
        
        return false;
    }
    
    if (conf.callback !== undefined) {
        callback = conf.callback;
    } else {
        callback = temple.ajaxSuccess;
    }
    
    var method = conf.method !== undefined &&
        conf.method !== null && conf.method.length > 0 ? 'get' : conf.method;
        
    $.ajax({
        url: conf.url,
        type: method,
        dataType: temple.dataType,
        data: conf.params,
        context: el,
        success: temple.ajaxSuccess,
        error: temple.ajaxError
    });
    
    return true;
}

//renders a single node (not a top element)
temple.renderNode = function (el, data) {
    if (temple.isArray(data)) {
        var l = data.length;
        var i;
        for (i = 0; i < l; i++) {
            _el = el.cloneNode();
            _el.innerHTML = data[i][_el.attributes[temple.id].value];
            el.parentNode.insertBefore(_el, el);
        }
        
        el.parentNode.removeChild(el);
    } else {
        el.innerHTML = data[el.attributes[temple.id].value];
    }
}

//renders a top node (a node with child)
temple.renderBlock = function(el, data) {
    if (temple.isArray(data)) {
        var l = data.length;
        var lc = el.childNodes.length;
        var i; 
        for (i = 0; i< l; i++) {
            _el = el.cloneNode(true);
            for (j = 0; j < lc; j++) {
               if(_el.childNodes[j].id !== undefined) {
                    _el.childNodes[j].innerHTML = data[i][_el.childNodes[j].id];
                    $(_el.childNodes[j]).removeAttr('id')
               }
            }
            
            el.parentNode.insertBefore(_el, el);
        }
        
        el.parentNode.removeChild(el);
    } else {
        for (child in _el.childNodes) {
            child.innerHTML = data[i][_l.attributes[temple.id].value];
        }
    }
}

temple.init = function(conf) {
    
    temple.rc = conf;
    temple.top = 'data-' + temple.namespace + 'top';
    temple.id = 'data-' + temple.namespace + 'id';
    var i;
    var els = $('[' + temple.id + ']');
    var l = els.length;
    
    for (i = 0; i < l; i++) {
        temple.request(els[i], temple.rc[els[i].attributes[temple.id].value]);
    }
}


