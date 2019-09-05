parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Lqfu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.cache=void 0;var e={};exports.cache=e;
},{}],"ph/H":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.hooks=void 0;var e={};exports.hooks=e;
},{}],"JDu1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Model=void 0;var e=require(".");function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function o(e,t,o){return t&&r(e.prototype,t),o&&r(e,o),e}var n=function(){function r(o){if(t(this,r),!o.id)throw new Error("Model.js: cannot create instance without an id!");Object.assign(this,o);var n=this.constructor.prototype.modelName||this.constructor.name,a=this.id;return e.cache[n]||(e.cache[n]={}),e.hooks[n]||(e.hooks[n]={}),e.hooks[n][a]={onbeforedelete:[],onbeforeupdate:[]},new Proxy(this,{get:function(e,t,r){return Reflect.get(e,t,r)},set:function(t,r,o){var i=!0,c=!1,l=void 0;try{for(var s,u=e.hooks[n][a].onbeforeupdate[Symbol.iterator]();!(i=(s=u.next()).done);i=!0){(0,s.value)(r,t[r],o)}}catch(h){c=!0,l=h}finally{try{i||null==u.return||u.return()}finally{if(c)throw l}}return Reflect.set(t,r,o),!0}})}return o(r,[{key:"_cache",value:function(){var t=(new Date).toISOString(),r=this._cached();return r?(r.instance=this,r.updated=t):(r={created:t,instance:this},e.cache[this._modelName()][this.id]=r),r}},{key:"_cached",value:function(){return e.cache[this._modelName()][this.id]}},{key:"_hook",value:function(t,r){e.hooks[this._modelName()][this.id][t].push(r)}},{key:"_id",value:function(){return this._modelName()+"-"+this.id}},{key:"_modelName",value:function(){return this.constructor.prototype.modelName||this.constructor.name}},{key:"delete",value:function(){var t=this.id,r=this._modelName(),o=e.hooks[r][t].onbeforedelete;if(o.length){var n=!0,a=!1,i=void 0;try{for(var c,l=o[Symbol.iterator]();!(n=(c=l.next()).done);n=!0){(0,c.value)()}}catch(s){a=!0,i=s}finally{try{n||null==l.return||l.return()}finally{if(a)throw i}}}delete e.cache[r][t],delete e.hooks[r][t],e.persist&&localStorage.removeItem(this._id())}},{key:"onbeforedelete",value:function(e){this._hook("onbeforedelete",e)}},{key:"onbeforeupdate",value:function(e){this._hook("onbeforeupdate",e)}},{key:"save",value:function(){this._cache(),e.persist&&localStorage.setItem(this._id(),JSON.stringify(this))}}],[{key:"cache",value:function(){return e.cache[this._modelName()]}},{key:"deleteCache",value:function(){e.cache[this._modelName()]={}}},{key:"first",value:function(e){return this.get(e)[0]}},{key:"get",value:function(e){return e?"string"==typeof e?this._getById(e):e instanceof Array?this._getByIds(e):e instanceof Object?this._getByProperties(e):void 0:this._getInstances()}},{key:"preload",value:function(e){var t=this._modelName(),r=t.length;if(!e||e.localStorage)for(var o=localStorage.length,n=0;n<o;n++){var a=localStorage.key(n);a.slice(0,r)===t&&new this(JSON.parse(localStorage.getItem(a)))._cache()}}},{key:"_getById",value:function(t){var r=this._modelName(),o=e.cache[r][t];if(o)return o.instance;if(e.persist){var n=JSON.parse(localStorage.getItem(r+"-"+t));if(n&&n.id)return new this(n)}return null}},{key:"_getByIds",value:function(t){var r=[],o=this._modelName();for(var n in e.cache[o]){var a=e.cache[o][n].instance,i=!0,c=!1,l=void 0;try{for(var s,u=t[Symbol.iterator]();!(i=(s=u.next()).done);i=!0){var h=s.value;if(a.id===h){r.push(a);break}}}catch(f){c=!0,l=f}finally{try{i||null==u.return||u.return()}finally{if(c)throw l}}}return r}},{key:"_getByProperties",value:function(t){var r=[],o=e.cache[this._modelName()];for(var n in o){var a=o[n].instance,i=!0;for(var c in t)if(a[c]!==t[c]){i=!1;break}i&&r.push(a)}return r}},{key:"_getInstances",value:function(){var t=[],r=e.cache[this._modelName()];for(var o in r)t.push(r[o].instance);return t}},{key:"_modelName",value:function(){return this.prototype.modelName||this.prototype.constructor.name}}]),r}();exports.Model=n;
},{".":"Focm"}],"4dD7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=!0;try{localStorage.setItem("tdmnco-model-js",{}),localStorage.removeItem("tdmnco-model-js")}catch(t){console.warn("Model.js: localStorage not supported!",t),e=!1}var o=e;exports.default=o;
},{}],"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"cache",{enumerable:!0,get:function(){return e.cache}}),Object.defineProperty(exports,"hooks",{enumerable:!0,get:function(){return r.hooks}}),Object.defineProperty(exports,"Model",{enumerable:!0,get:function(){return t.Model}}),Object.defineProperty(exports,"persist",{enumerable:!0,get:function(){return o.persist}});var e=require("./cache"),r=require("./hooks"),t=require("./model"),o=require("./persist");
},{"./cache":"Lqfu","./hooks":"ph/H","./model":"JDu1","./persist":"4dD7"}]},{},["Focm"], null)
//# sourceMappingURL=/model.js.map