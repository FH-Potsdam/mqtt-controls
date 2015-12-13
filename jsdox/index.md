# Global





* * *

### mqttControls() 

mqttControls The main object. Everything else is a child



### init(_user, _pw, _clientId, _broker, _topics) 

init  Initialize the library

**Parameters**

**_user**: `String`, The user name at your broker. Default: try

**_pw**: `String`, The password at your broker. Default: try

**_clientId**: `String`, The name you want to be displayed with: Default: mqttControlsClient

**_broker**: `String`, The borker to connect to. Default: brker.shiftr.io

**_topics**: `Object`, Topics to subscribe and th publish to. Currently one one per publish and subscribe. Default `{'subscribe':'/output/#','publih':'/input/'}`



### connect() 

connect Connect your client to the broker



### disconnect(force, cb) 

disconnect disconnect from the broker

**Parameters**

**force**: `Boolean`, force disconnect. Default: false

**cb**: `function`, Callback function the be called after disconnect. Default: undefined



### reconnect() 

reconnect Reconnect to your broker



### subscribe() 

subscribe Subscribes to your topics



### unsubscribe() 

unsubscribe Unsubscribes from your topics
    mqttControls.unsubscribe()



### unpublish() 

unpublish Stop publishing to the broker



### publish() 

publish Start publishing in an interval to your broker this is more for testing then for real usage.



### send(message, topic) 

Send one signal to the borker

**Parameters**

**message**: `String`, The message to send. Default: `{'hello mqtt-controls'}`

**topic**: `String`, The topic to send to. Default: is `topics = {'subscribe':'/output/#','publih':'/input/'}`




* * *










