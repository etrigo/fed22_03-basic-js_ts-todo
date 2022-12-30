// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ts/todos.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todos = void 0;
// array for active todos
var todos = [];
exports.todos = todos;
},{}],"ts/handlers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleForm = exports.handleState = void 0;
// import type { Todo } from "./types"
var lists_1 = require("./lists");
var todos_1 = require("./todos");
var handleState = function handleState(event) {
  event.preventDefault();
  todos_1.todos.forEach(function (todo) {
    if (todo.id == Number(event.target.id)) {
      console.log("triggers");
      todo.state = todo.state ? false : true;
    }
  });
  // update local storage
  localStorage.setItem("todos", JSON.stringify(todos_1.todos));
  (0, lists_1.list)(todos_1.todos);
};
exports.handleState = handleState;
// add new todo handler
var handleForm = function handleForm(event) {
  event.preventDefault();
  var new_todo = event.target.elements["add-todo"].value;
  if (new_todo == "") {
    alert("A todo must be filled in");
  } else {
    var new_id = Math.max.apply(Math, todos_1.todos.map(function (todo) {
      return todo.id;
    })) + 1;
    todos_1.todos.push({
      id: new_id,
      todo: new_todo,
      state: true
    });
    // update local storage
    localStorage.setItem("todos", JSON.stringify(todos_1.todos));
    // add todo to active list
    (0, lists_1.list)(todos_1.todos);
    // reset form
    var form = document.getElementById("form");
    form.reset();
  }
};
exports.handleForm = handleForm;
},{"./lists":"ts/lists.ts","./todos":"ts/todos.ts"}],"ts/listeners.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listen_submit = exports.listen_checkbox = void 0;
var handlers_1 = require("./handlers");
// add listeners to checkboxes
function listen_checkbox() {
  // get a node list of all checkboxes
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  // remove potential old listners
  checkboxes.forEach(function (checkbox) {
    checkbox.removeEventListener("click", handlers_1.handleState);
  });
  // add listners to checkboxes
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("click", handlers_1.handleState);
  });
}
exports.listen_checkbox = listen_checkbox;
// listner for add new form
var listen_submit = function listen_submit() {
  // get form element
  var form = document.getElementById("form");
  // remove potential old listeners
  form.removeEventListener("submit", handlers_1.handleForm);
  // add listner to form
  form.addEventListener("submit", handlers_1.handleForm);
};
exports.listen_submit = listen_submit;
},{"./handlers":"ts/handlers.ts"}],"ts/lists.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = void 0;
var listeners_1 = require("./listeners");
// function to create HTML
var list = function list(array) {
  // get ul for active and inactive todos
  var active_list = document.getElementById("todo-list");
  var inactive_list = document.getElementById("todo-list-done");
  // create HTML for both lists
  var active_HTML = "";
  var inactive_HTML = "";
  array.forEach(function (todo) {
    if (todo.state) {
      active_HTML += "<li><input type=\"checkbox\" id=\"".concat(todo.id, "\"><p>").concat(todo.todo, "</p></li>");
    } else {
      inactive_HTML += "<li><input type=\"checkbox\" checked id=\"".concat(todo.id, "\"><p>").concat(todo.todo, "</p></li>");
    }
  });
  // set HTML to active and inactive list elements
  active_list.innerHTML = active_HTML;
  inactive_list.innerHTML = inactive_HTML;
  // add listner to checkboxes
  (0, listeners_1.listen_checkbox)();
};
exports.list = list;
},{"./listeners":"ts/listeners.ts"}],"ts/initialize.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = void 0;
var todos_1 = require("./todos");
var lists_1 = require("./lists");
var listeners_1 = require("./listeners");
var initialize = function initialize() {
  // check local storage for todos
  var stored_todos = localStorage.getItem("todos");
  // if todos in local storage populate to site else create initial dummy todos
  if (stored_todos != null) {
    console.log("Getting");
    var data = JSON.parse(stored_todos);
    data.forEach(function (todo) {
      todos_1.todos.push(todo);
    });
  } else if (stored_todos === null) {
    // initial todos array
    var initial = ["One random todo", "Another todo", "a great todo", "The most important one", "Never forget this todo"];
    // create three initial active and two inactive todos as demo
    for (var i = 0; i < 5; i++) {
      if (i < 3) {
        todos_1.todos.push({
          id: i + 1,
          todo: initial[i],
          state: true
        });
      } else {
        todos_1.todos.push({
          id: i + 1,
          todo: initial[i],
          state: false
        });
      }
    }
    // store to local storage
    localStorage.setItem("todos", JSON.stringify(todos_1.todos));
  }
  // poputale todos to site
  (0, lists_1.list)(todos_1.todos);
  // listen to add-new-form
  (0, listeners_1.listen_submit)();
};
exports.initialize = initialize;
},{"./todos":"ts/todos.ts","./lists":"ts/lists.ts","./listeners":"ts/listeners.ts"}],"ts/main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initialize_1 = require("./initialize");
// initialize app
(0, initialize_1.initialize)();
},{"./initialize":"ts/initialize.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62815" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ts/main.ts"], null)
//# sourceMappingURL=/main.0e24b174.js.map