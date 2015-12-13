var mq = require('mqtt-controls');
var open = require('open');

mq.init();
mq.connect();
console.log('opening https://shiftr.io/try so you see whats going on');
open('https://shiftr.io/try#terminal');
var count = 0;
var timer = setInterval(function(){
  mq.send('ping','hello-world');
  console.log('ping');
  count++;
  if(count == 10){
    clearInterval(timer);
    mq.disconnect();
  }
}, 1000);

