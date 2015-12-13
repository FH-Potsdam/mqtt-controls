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
exports.send = send;

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

/**
 * mqttControls The main object. Everything else is a child
 */
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

/**
 * init  Initialize the library
 * @param  {String} _user     The user name at your broker. Default: try
 * @param  {String} _pw       The password at your broker. Default: try
 * @param  {String} _clientId The name you want to be displayed with: Default: mqttControlsClient
 * @param  {String} _broker   The borker to connect to. Default: brker.shiftr.io
 * @param  {Object} _topics   Topics to subscribe and th publish to. Currently one one per publish and subscribe. Default `{'subscribe':'/output/#','publih':'/input/'}`
 */
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

/**
 * connect Connect your client to the broker
 */
function connect() {
  console.log('Connecting client: ' + clientId + ' to url:"' + url + '"');
  client = mqtt.connect(url, { 'clientId': clientId });
}
/**
 * disconnect disconnect from the broker
 * @param  {Boolean}  force force disconnect. Default: false
 * @param  {Function} cb    Callback function the be called after disconnect. Default: undefined
 */
function disconnect() {
  var force = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
  var cb = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];

  console.log('Disconnecting client: ' + clientId);
  stopPub = true;
  client.end(force, cb);
}

/**
 * reconnect Reconnect to your broker
 */
function reconnect() {
  client.end(false, function () {
    console.log('Reconnecting client: ' + clientId);
    client.connect(url, { 'clientId': clientId });
  });
}

/**
 * subscribe Subscribes to your topics
 */
function subscribe() {
  console.log('Subscribing client ' + clientId + ' to topic: ' + topics.subscribe);
  client.subscribe(topics.subscribe);
  isSubscribed = true;
}

/**
 * unsubscribe Unsubscribes from your topics
 *     mqttControls.unsubscribe()
 */
function unsubscribe() {
  console.log('Unsubscribing client ' + clientId + ' from topic: ' + topics.subscribe);
  if (isSubscribed === true) {
    client.unsubscribe(topics.subscribe, function () {
      console.log('sucessfully unsubscribed');
      isSubscribed = false;
    });
  }
}

/**
 * unpublish Stop publishing to the broker
 */
function unpublish() {
  console.log('Client ' + clientId + ' should stop publishing to topic ' + topics.publish);
  stopPub = true;
}

/**
 * publish Start publishing in an interval to your broker this is more for testing then for real usage.
 */
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

/**
 * Send one signal to the borker
 * @param  {String} message - The message to send. Default: `{'hello mqtt-controls'}`
 * @param  {String} topic - The topic to send to. Default: is `topics = {'subscribe':'/output/#','publih':'/input/'}`
 */
function send() {
  var message = arguments.length <= 0 || arguments[0] === undefined ? 'hello mqtt-controls' : arguments[0];
  var topic = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  var t = undefined;
  if (topic === null) {
    t = topics.publish;
  } else {
    t = topic;
  }
  client.publish(t, message);
}

// export function listen(){
//   console.log(`Client ${clientId} is listening on topic ${topics.subscribe}`);
//   client.on('message',()=>{
//     // here we listen on
//   });
// }
// export var client = client;

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