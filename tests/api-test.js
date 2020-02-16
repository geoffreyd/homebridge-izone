const iZoneAPI = require("..").default;

const izone = new iZoneAPI();


test( "Can get IP Address", async function( assert ) {
  const ip = await izone.getIP();
  assert.equal(ip, '192.168.0.232');
});

test("Get a Zones Temp", async function ( assert ) {
  const z1temp = await izone.getZoneTemp(1);
  console.log("Zone 1 temp = ", z1temp);
  assert.ok(typeof z1temp === 'number');

});

test("Get System On State", async function(assert) {
  assert.equal(await izone.getState(), 'off');
});

test("Get Cooling mode state", async function(assert) {

  assert.equal(await izone.getHeaterCoolerState(), "dry");
})