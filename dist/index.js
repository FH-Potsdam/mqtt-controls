'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mqttControls = mqttControls;
exports.init = init;
exports.connect = connect;
exports.disconnect = disconnect;
exports.reconnect = reconnect;
exports.subscribe = subscribe;
exports.unsubscribe = unsubscribe;
exports.unpublish = unpublish;
exports.publish = publish;

var _mqtt = require('mqtt');

var mqtt = _interopRequireWildcard(_mqtt);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var url = null;
var user = null;
var pw = null;
var settings = null;
var topics = null;
var client = null;
var isSubscribed = false;
var isPublishing = false;
var stopPub = false;
var broker = null;
var protocol = 'mqtt://';
var clientId = null;

function mqttControls() {}

// export var url = url;
// export var topics = topics;
// export var isSubscribed = isSubscribed;
// export var isPublishing = isPublishing;
// export var stopPub = stopPub;
// export var protocol = protocol;
// export var broker = broker;
// export var user = user;
// export var pw = pw;
// export var clientId =  clientId;

function init() {
  var _user = arguments.length <= 0 || arguments[0] === undefined ? 'try' : arguments[0];

  var _pw = arguments.length <= 1 || arguments[1] === undefined ? 'try' : arguments[1];

  var _clientId = arguments.length <= 2 || arguments[2] === undefined ? 'mqttControlsClient' : arguments[2];

  var _broker = arguments.length <= 3 || arguments[3] === undefined ? 'broker.shiftr.io' : arguments[3];

  var _topics = arguments.length <= 4 || arguments[4] === undefined ? {
    'subscribe': '/output/#',
    'publish': '/input/' } : arguments[4];

  user = _user;
  pw = _pw;
  clientId = _clientId;
  broker = _broker;
  topics = _topics;
  url = '' + protocol + user + ':' + pw + '@' + broker;
  console.log('mqtt controller is initialised');
};

function connect() {
  console.log('Connecting client: ' + clientId + ' to url:"' + url + '"');
  client = mqtt.connect(url, { 'clientId': clientId });
}
function disconnect() {
  var force = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
  var cb = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];

  console.log('Disconnecting client: ' + clientId);
  stopPub = true;
  client.end(force, cb);
}
function reconnect() {
  client.end(false, function () {
    console.log('Reconnecting client: ' + clientId);
    client.connect(url, settings);
  });
}
function subscribe() {
  console.log('Subscribing client ' + clientId + ' to topic: ' + topics.subscribe);
  client.subscribe(topics.subscribe);
  isSubscribed = true;
}

function unsubscribe() {
  console.log('Unsubscribing client ' + clientId + ' from topic: ' + topics.subscribe);
  if (isSubscribed === true) {
    client.unsubscribe(topics.subscribe, function () {
      console.log('sucessfully unsubscribed');
      isSubscribed = false;
    });
  }
}
function unpublish() {
  console.log('Client ' + clientId + ' should stop publishing to topic ' + topics.publish);
  stopPub = true;
}

function publish() {
  console.log('Client ' + clientId + ' is publishing to topic ' + topics.publish);
  // client.on('message',()=>{});
  // this is just for testing purpouse
  // maybe we dont need to stop and start publishing
  var timer = setInterval(function () {
    client.publish(topics.publish, 'ping');
    if (stopPub === true) {
      clearInterval(timer);
      stopPub = false;
    }
  }, 1000);
}

// export function listen(){
//   console.log(`Client ${clientId} is listening on topic ${topics.subscribe}`);
//   client.on('message',()=>{
//     // here we listen on
//   });
// }
// export var client = client;
/**
 * [patch description]
 * @return {[type]} [description]
 */
// export function patch() {
//   // init();
//   let client = mqtt.connect(url, settings);
//   client.on('connect', () => {
//     client.subscribe('/output/#');
//     client.on('message', (topic, message) => {
//       let json = JSON.parse(message);
//       if (json.clientId === config.patch[0].clientId) {
//         // now we know wo send the message.
//         // currently not set
//       }
//       client.publish('/input/simple-js-input',
//         `this message was patched from output to input via patcher ${message.toString()}`);
//       // console.log(`topic: ${topic} message: ${message.toString()}`);
//     });
//   });
// }