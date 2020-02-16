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
})({"controller.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var node_fetch_1 = __importDefault(require("node-fetch"));

var UPDATE_CACHE = 30;

var Controller =
/** @class */
function () {
  function Controller(ip, id, modules) {
    this.ip = ip;
    this.id = id;
    this.modules = modules;
    this.zones = [];
    this.baseUrl = "http://" + ip;
    this.ready = this.setup();
  }

  Controller.prototype.setup = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.getSystemSettings()];

          case 1:
            _a.sent();

            return [4
            /*yield*/
            , this.getZoneSettings()];

          case 2:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Controller.prototype.getSystemSettings = function () {
    return __awaiter(this, void 0, void 0, function () {
      var sysRequest, sysSettings;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , node_fetch_1.default(this.baseUrl + "/SystemSettings")];

          case 1:
            sysRequest = _a.sent();
            return [4
            /*yield*/
            , sysRequest.json() // console.log("System settings", sysSettings);
            ];

          case 2:
            sysSettings = _a.sent(); // console.log("System settings", sysSettings);

            this.settings = sysSettings;
            this.systemUpdated = new Date();
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Controller.prototype.currentSystem = function () {
    return __awaiter(this, void 0, void 0, function () {
      var currentTime;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            currentTime = new Date();
            if (!(!this.systemUpdated || (currentTime.valueOf() - this.systemUpdated.valueOf()) / 1000 > UPDATE_CACHE)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , this.getSystemSettings()];

          case 1:
            _a.sent();

            _a.label = 2;

          case 2:
            return [2
            /*return*/
            , this.settings];
        }
      });
    });
  };

  Controller.prototype.getZoneSettings = function () {
    return __awaiter(this, void 0, void 0, function () {
      var noOfZones, zoneRequest, zoneSettings, zoneRequest_1, _a, _b, zoneRequest_2, _c, _d;

      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            noOfZones = this.settings.NoOfZones;
            return [4
            /*yield*/
            , this.get('Zones1_4')];

          case 1:
            zoneRequest = _e.sent();
            return [4
            /*yield*/
            , zoneRequest.json()];

          case 2:
            zoneSettings = _e.sent();
            if (!(noOfZones > 4)) return [3
            /*break*/
            , 5];
            return [4
            /*yield*/
            , this.get('Zones5_8')];

          case 3:
            zoneRequest_1 = _e.sent();
            _b = (_a = zoneSettings).concat;
            return [4
            /*yield*/
            , zoneRequest_1.json()];

          case 4:
            zoneSettings = _b.apply(_a, [_e.sent()]);
            _e.label = 5;

          case 5:
            if (!(noOfZones > 8)) return [3
            /*break*/
            , 8];
            return [4
            /*yield*/
            , this.get('Zones9_12')];

          case 6:
            zoneRequest_2 = _e.sent();
            _d = (_c = zoneSettings).concat;
            return [4
            /*yield*/
            , zoneRequest_2.json()];

          case 7:
            zoneSettings = _d.apply(_c, [_e.sent()]);
            _e.label = 8;

          case 8:
            this.zones = zoneSettings.filter(function (zone) {
              return zone.Index < noOfZones;
            }); // console.log("Zome Settings", this.zones);

            this.zonesUpdated = new Date();
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Controller.prototype.currentZones = function () {
    return __awaiter(this, void 0, void 0, function () {
      var currentTime;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            currentTime = new Date();
            if (!(!this.zonesUpdated || (currentTime.valueOf() - this.zonesUpdated.valueOf()) / 1000 > UPDATE_CACHE)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , this.getZoneSettings()];

          case 1:
            _a.sent();

            _a.label = 2;

          case 2:
            return [2
            /*return*/
            , this.zones];
        }
      });
    });
  };

  Controller.prototype.getSchedualSettings = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        this.get('Schedules1_5');
        return [2
        /*return*/
        ];
      });
    });
  };
  /*
   * COMMANDS
   */


  Controller.prototype.toggleSystem = function (setTo) {
    return __awaiter(this, void 0, void 0, function () {
      var toState;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            toState = setTo || this.settings.SysOn == "on" ? "off" : "on";
            return [4
            /*yield*/
            , this.post('SystemON', {
              SystemOn: toState
            })];

          case 1:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Controller.prototype.setSystemMode = function (mode) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.post('SystemMODE', {
          "SystemMODE": mode
        })];
      });
    });
  };

  Controller.prototype.setZoneTarget = function (zone, state) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.post('ZoneCommand', {
          "ZoneCommand": {
            "ZoneNo": zone,
            "Command": state
          }
        })];
      });
    });
  };
  /*
   * NETWORK
   */


  Controller.prototype.get = function (path) {
    return node_fetch_1.default(this.baseUrl + "/" + path);
  };

  Controller.prototype.post = function (path, body) {
    return node_fetch_1.default(this.baseUrl + "/" + path, {
      method: 'POST',
      body: body
    });
  };

  return Controller;
}();

exports.default = Controller;
},{}],"discovery.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var dgram_1 = __importDefault(require("dgram"));

var controller_1 = __importDefault(require("./controller"));

var discoveryMsg = 'IASD';
var discoveryPort = 12107;
var discoveryListenPort = 10086;
var heartBeatPort = 7005;

var Discovery =
/** @class */
function () {
  function Discovery() {
    var _this = this;

    this.controllerClass = controller_1.default;
    this.controllers = []; // Create udp server socket object.

    var discovery = this.discovery = dgram_1.default.createSocket("udp4");
    discovery.bind(discoveryListenPort);
    discovery.on('message', this.onMessage.bind(this));
    discovery.on('error', this.onError.bind(this)); // When udp server started and listening.

    discovery.on('listening', this.onListen.bind(this));
    var heartBeat = this.heartBeat = dgram_1.default.createSocket("udp4");
    heartBeat.bind(heartBeatPort);
    heartBeat.on('message', this.onHeartBeat.bind(this));
    this.foundFirst = new Promise(function (resolve, _reject) {
      return _this.foundResolve = resolve;
    });
  }

  Discovery.prototype.onMessage = function (msgBuffer, rinfo) {
    var address = this.discovery.address();
    var msg = msgBuffer.toString();

    if (msg.startsWith("ASPort_")) {
      this.controllerFound(msg, rinfo.address);
    } else {
      console.log("Dis: \"" + msg + "\" - from " + rinfo.address + ":" + rinfo.port);
    }
  };

  Discovery.prototype.onError = function (err) {
    console.log("discovery error:\n" + err.stack);
    this.discovery.close();
  };

  Discovery.prototype.onListen = function () {
    // Get and print udp server listening ip address and port number in log console. 
    var address = this.discovery.address();
    console.log('UDP Server started and listening on ' + address.address + ":" + address.port);
    this.discovery.setBroadcast(true);
    var message = Buffer.from(discoveryMsg);
    this.discovery.send(message, discoveryPort, '255.255.255.255', function (err) {
      console.log("Message Sent");
    });
  };

  Discovery.prototype.onHeartBeat = function (msg, rinfo) {
    console.log("Heartbeat got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
  };

  Discovery.prototype.controllerFound = function (data, address) {
    var _a = data.split(","),
        portCode = _a[0],
        macCode = _a[1],
        ipCode = _a[2],
        modules = _a.slice(3);

    console.log("Found Controller", portCode, macCode, ipCode);
    console.log.apply(console, __spreadArrays(["With modules"], modules));

    var _b = ipCode.split('_'),
        ip = _b[1];

    var _c = macCode.split('_'),
        mac = _c[1];

    var controller = new controller_1.default(ip, mac, modules);
    this.controllers.push(controller);

    if (typeof this.foundResolve === "function") {
      this.foundResolve(controller);
      this.foundResolve = undefined;
    }
  };

  return Discovery;
}();

exports.default = Discovery;
},{"./controller":"controller.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var discovery_1 = __importDefault(require("./discovery"));

var IZoneAPI =
/** @class */
function () {
  function IZoneAPI() {
    var _this = this;

    this.discovery = new discovery_1.default();
    this.ready = this.discovery.foundFirst.then(function (controller) {
      _this.controller = controller;
      return controller.ready;
    }).then(function () {
      return _this.controller;
    });
  }

  IZoneAPI.prototype.getIP = function () {
    return __awaiter(this, void 0, void 0, function () {
      var controller;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.ready];

          case 1:
            controller = _a.sent();
            return [2
            /*return*/
            , controller.ip];
        }
      });
    });
  };

  IZoneAPI.prototype.getActiveZones = function () {
    return __awaiter(this, void 0, void 0, function () {
      var controller;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.ready];

          case 1:
            controller = _a.sent();
            return [4
            /*yield*/
            , controller.currentZones()];

          case 2:
            return [2
            /*return*/
            , _a.sent()];
        }
      });
    });
  };

  IZoneAPI.prototype.currentSystem = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.ready];

          case 1:
            return [2
            /*return*/
            , _a.sent().currentSystem()];
        }
      });
    });
  };

  IZoneAPI.prototype.system = function (property) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.currentSystem()];

          case 1:
            return [2
            /*return*/
            , _a.sent()[property]];
        }
      });
    });
  };

  IZoneAPI.prototype.getState = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.system('SysOn')];
      });
    });
  };

  IZoneAPI.prototype.setOn = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        this.controller.toggleSystem("on");
        return [2
        /*return*/
        ];
      });
    });
  };

  IZoneAPI.prototype.setOff = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        this.controller.toggleSystem("off");
        return [2
        /*return*/
        ];
      });
    });
  };

  IZoneAPI.prototype.getHeaterCoolerState = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.system('SysMode')];
      });
    });
  };

  IZoneAPI.prototype.setSystemMode = function (mode) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.ready];

          case 1:
            return [2
            /*return*/
            , _a.sent().setSystemMode(mode)];
        }
      });
    });
  };

  IZoneAPI.prototype.getZoneTemp = function (zoneIdx) {
    return __awaiter(this, void 0, void 0, function () {
      var zones;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.ready];

          case 1:
            return [4
            /*yield*/
            , _a.sent().currentZones()];

          case 2:
            zones = _a.sent();
            return [2
            /*return*/
            , zones.find(function (zone) {
              return zone.Index === zoneIdx;
            }).Temp];
        }
      });
    });
  };

  IZoneAPI.prototype.getZoneTarget = function (zoneIdx) {
    return __awaiter(this, void 0, void 0, function () {
      var zones, zone, temperature, state;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.ready];

          case 1:
            return [4
            /*yield*/
            , _a.sent().currentZones()];

          case 2:
            zones = _a.sent();
            zone = zones.find(function (zone) {
              return zone.Index === zoneIdx;
            });
            temperature = zone.SetPoint;
            state = zone.Mode;

            if (state == 'auto') {
              return [2
              /*return*/
              , temperature];
            } else {
              return [2
              /*return*/
              , state];
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  IZoneAPI.prototype.setZoneTarget = function (zoneIdx, target) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.ready];

          case 1:
            return [2
            /*return*/
            , _a.sent().setZoneTarget(zoneIdx.toString(), target.toString())];
        }
      });
    });
  };

  IZoneAPI.prototype.getZoneTargetTemperature = function (zoneIdx) {
    return __awaiter(this, void 0, void 0, function () {
      var zones;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.ready];

          case 1:
            return [4
            /*yield*/
            , _a.sent().currentZones()];

          case 2:
            zones = _a.sent();
            return [2
            /*return*/
            , zones.find(function (zone) {
              return zone.Index === zoneIdx;
            }).SetPoint];
        }
      });
    });
  };

  IZoneAPI.prototype.getDuctTemp = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.system('Temp')];
      });
    });
  };

  IZoneAPI.prototype.getACTarget = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        ];
      });
    });
  };

  IZoneAPI.prototype.setACTarget = function (target) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        ];
      });
    });
  };

  return IZoneAPI;
}();

exports.default = IZoneAPI;
},{"./discovery":"discovery.ts"}]},{},["index.ts"], null)
//# sourceMappingURL=/index.js.map