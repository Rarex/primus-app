// Generated by CoffeeScript 1.6.3
/*
# Elegant pattern to simulate namespace in CoffeeScript
#
# @author Maks
*/


(function() {
  (function(root) {
    var fn;
    fn = function() {
      var Class, args, name, obj, subpackage, target;
      args = arguments[0];
      target = root;
      while (true) {
        for (subpackage in args) {
          obj = args[subpackage];
          target = target[subpackage] || (target[subpackage] = {});
          args = obj;
        }
        if (typeof args !== 'object') {
          break;
        }
      }
      Class = args;
      if (arguments[0].hasOwnProperty('global')) {
        target = root;
      }
      name = Class.toString().match(/^function\s(\w+)\(/)[1];
      return target[name] = Class;
    };
    root.namespace = fn;
    root.module = fn;
    root.log = function(text) {
      return console.log(text);
    };
    return root.extend = function(object, properties) {
      var key, val;
      for (key in properties) {
        val = properties[key];
        object[key] = val;
      }
      return object;
    };
  })(typeof global !== "undefined" && global !== null ? global : window);

}).call(this);

/*
//@ sourceMappingURL=namespace.map
*/
