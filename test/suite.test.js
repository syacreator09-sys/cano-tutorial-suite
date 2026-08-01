import test from'node:test';import assert from'node:assert/strict';import{buildTutorialPlan}from'../src/plan.js';
const req={version:'1.0',projectId:'pilot-demo',topic:'Create an image tutorial',format:'tutorial_short',screen:{url:'https://example.com'},presenter:{enabled:true},vox:{enabled:true}};
test('routes short tutorial to vertical recipe',()=>{const p=buildTutorialPlan(req);assert.equal(p.route.canvas,'9:16');assert.equal(p.stages.at(-1).id,'review');assert.equal(p.approvals.providerSpend,false);});
