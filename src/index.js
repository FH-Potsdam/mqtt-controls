
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

import * as mqtt from 'mqtt';

/**
 * mqttControls The main object. Everything else is a child
 */
export function mqttControls() {
}

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
export function init (
  _user = 'try',
  _pw = 'try',
  _clientId = 'mqttControlsClient',
  _broker = 'broker.shiftr.io',
  _topics = {
      'subscribe':'/output/#',
      'publish':'/input/'}
      ){
  user = _user;
  pw = _pw;
  clientId = _clientId;
  broker = _broker;
  topics = _topics;
  url = `${protocol}${user}:${pw}@${broker}`;
  console.log('mqtt controller is initialised');
};


/**
 * connect Connect your client to the broker
 */
export function connect() {
  console.log(`Connecting client: ${clientId} to url:"${url}"`);
  client = mqtt.connect(url, {'clientId': clientId});
}
/**
 * disconnect disconnect from the broker
 * @param  {Boolean}  force force disconnect. Default: false
 * @param  {Function} cb    Callback function the be called after disconnect. Default: undefined
 */
export function disconnect(force = false, cb = undefined) {
  console.log(`Disconnecting client: ${clientId}`);
  stopPub = true;
  client.end(force, cb);
}

/**
 * reconnect Reconnect to your broker
 */
export function reconnect() {
  client.end(false, () => {
    console.log(`Reconnecting client: ${clientId}`);
    client.connect(url, {'clientId': clientId});
  });
}

/**
 * subscribe Subscribes to your topics
 */
export function subscribe(){
  console.log(`Subscribing client ${clientId} to topic: ${topics.subscribe}`);
  client.subscribe(topics.subscribe);
  isSubscribed = true;
}

/**
 * unsubscribe Unsubscribes from your topics
 */
export function unsubscribe(){
  console.log(`Unsubscribing client ${clientId} from topic: ${topics.subscribe}`);
  if(isSubscribed === true){
    client.unsubscribe(topics.subscribe,()=>{
      console.log('sucessfully unsubscribed');
      isSubscribed = false;
    });
  }
}

/**
 * unpublish Stop publishing to the broker
 */
export function unpublish (){
  console.log(`Client ${clientId} should stop publishing to topic ${topics.publish}`);
  stopPub = true;
}

/**
 * publish Start publishing in an interval to your broker this is more for testing then for real usage.
 */
export function publish(){
  console.log(`Client ${clientId} is publishing to topic ${topics.publish}`);
    // client.on('message',()=>{});
    // this is just for testing purpouse
    // maybe we dont need to stop and start publishing
    var timer = setInterval(()=>{
      client.publish(topics.publish,'ping');
      if(stopPub === true){
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
export function send(message = 'hello mqtt-controls', topic = null){
  let t;
  if(topic === null){
    t = topics.publish;
  }else{
    t = topic;
  }
  client.publish(t,message);
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
