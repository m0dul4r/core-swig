/**
 * Modulable core module of Swig (provides the view component) 
 * @author Ioan CHIRIAC
 * @license MIT
 * @link https://github.com/m0dul4r/core-swig
 */

var swig = require('swig');

module.exports = function(imports) {
  return {
    core: {
      // declares the view component
      view: {
        on: {
          ready: function() {
            var self = this;
            // configure app
            imports.core.app.renderer(
              // rendering engine
              swig.renderFile,
              // default rendering path
              this.config.path + '/' + this.config.template,
              // file names resolution
              this.locate
            );
            // handle swig resolution file
            var swigFs = swig.loaders.fs();
            var swigFsResolve = swigFs.resolve;
            swigFs.resolve = function (to, from) {
              result = swigFsResolve.call(this, to, from);
              if (!fs.existsSync(result)) {
                return self.locate(to);
              }
              return result;
            };
            // configure
            swig.setDefaults({ 
              cache: this.config.cache,
              loader: swigFs
            });
          }
        }
        , locate: function(view) {
        }
      }
    }
  }
};