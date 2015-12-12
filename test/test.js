import {expect} from 'chai';

var mqttControls = require('../dist/index.js');

describe('mqttControls',()=>{
  describe('#init()',()=>{
    it('should setup all the variables we need or use the defaults',(done)=>{
        mqttControls.init();
        done();
    });
  });

  describe('#connect',()=>{
    it('should connect to the shiftr.io broker',(done)=>{
      mqttControls.connect();
      done();
    });
  });
});