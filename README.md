# mqtt-controls

a wrapper for using the mqtt lib in a upcoming project.
Might be useful just for me.

## Install

npm install mqtt-controls

## Usage  

    var mq = require('mqtt-controls');
    var open = require('open'); // just to see whats going on
    
    mq.init(); // setup with defaults
    mq.connect(); // connect
    console.log('opening https://shiftr.io/try so you see whats going on');
    open('https://shiftr.io/try#terminal'); // see it online
    var count = 0; 
    // send ten pings and disconnect
    var timer = setInterval(function(){
      mq.send('ping','hello-world');
      console.log('ping');
      count++;
      if(count == 10){
        clearInterval(timer);
        mq.disconnect();
      }
    }, 1000);



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

Send one signal to the broker

**Parameters**

**message**: `String`, The message to send. Default: `{'hello mqtt-controls'}`

**topic**: `String`, The topic to send to. Default: is `topics = {'subscribe':'/output/#','publih':'/input/'}`



## License ISC

Copyright (c) 2015, FH-Potsdam Interface Design & Fabian Morón Zirfas

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

