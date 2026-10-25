import test from 'node:test';import assert from 'node:assert/strict';import {routes,estimateTrip} from '../js/planner.js';
test('same station has no route',()=>assert.deepEqual(routes('ucsd','ucsd'),[]));
test('blue line connects UCSD to Santa Fe',()=>assert.ok(routes('ucsd','santafe').length>0));
test('transfers possible between lines',()=>assert.ok(routes('santee','ucsd').length>0));
test('departure respects total time',()=>{const deadline=new Date('2026-11-01T20:00:00Z');const result=estimateTrip({from:'ucsd',to:'santafe',deadline,walking:10,buffer:5,wait:8});assert.equal(result.departure.getTime(),deadline.getTime()-result.total*60000)});
test('invalid deadline rejected',()=>assert.throws(()=>estimateTrip({from:'ucsd',to:'santafe',deadline:new Date('invalid')})));
test('invalid station rejected',()=>assert.throws(()=>estimateTrip({from:'bogus',to:'santafe',deadline:new Date()})));
