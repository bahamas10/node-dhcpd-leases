var assert = require('assert');

var dhcpdleases = require('./');

// example output from dhcpd.leases - this file may contain duplicates, in
// which case the last one founds "wins"
var s = [
  '# The format of this file is documented in the dhcpd.leases(5) manual page.',
  '# This lease file was written by isc-dhcp-4.3.1',
  '',
  'lease 10.0.1.1 {',
  '  starts 5 2015/05/15 01:57:17;',
  '  ends 5 2015/05/15 02:07:17;',
  '  tstp 5 2015/05/15 02:07:17;',
  '  cltt 5 2015/05/15 01:57:17;',
  '  binding state free;',
  '  hardware ethernet 00:11:22:33:44:55;',
  '  client-hostname "host1";',
  '  uid "foo";',
  '}',
  'lease 10.0.1.2 {',
  '  starts 5 2015/05/15 02:09:16;',
  '  ends 5 2015/05/15 02:19:16;',
  '  tstp 5 2015/05/15 02:19:16;',
  '  cltt 5 2015/05/15 02:09:16;',
  '  binding state free;',
  '  hardware ethernet 00:11:22:33:44:56;',
  '  client-hostname "host2";',
  '  uid "bar";',
  '}',
  'lease 10.0.1.3 {',
  '  starts 5 2015/05/15 02:16:01;',
  '  ends 5 2015/05/15 02:26:01;',
  '  tstp 5 2015/05/15 02:26:01;',
  '  cltt 5 2015/05/15 02:16:01;',
  '  binding state free;',
  '  hardware ethernet 00:11:22:33:44:57;',
  '  client-hostname "host3";',
  '  uid "baz-1";',
  '}',
  'lease 10.0.1.3 {',
  '  starts 5 2015/05/15 02:17:01;',
  '  ends 5 2015/05/15 02:27:01;',
  '  tstp 5 2015/05/15 02:27:01;',
  '  cltt 5 2015/05/15 02:17:01;',
  '  binding state free;',
  '  hardware ethernet 00:11:22:33:44:57;',
  '  client-hostname "host3";',
  '  uid "baz-2";',
  '}',
].join('\n');

var data = dhcpdleases(s);

assert.equal(data instanceof Array, true);
assert.equal(data.length, 4);

data.forEach(function(lease) {

  ['starts', 'ends', 'tstp', 'cltt'].forEach(function(key) {
    assert(lease[key] instanceof Date && isFinite(lease[key]))
  });

  assert.equal(lease['binding state'], 'free');
  assert(lease['hardware ethernet'].match(/([0-9a-fA-F]{2}:){5}([0-9a-fA-F]){2}/));
  assert(lease.hasOwnProperty('uid'));
  assert(lease.hasOwnProperty('client-hostname'));
});

assert.equal(data[0].uid, 'foo');
assert.equal(data[1].uid, 'bar');
assert.equal(data[2].uid, 'baz-1');
assert.equal(data[3].uid, 'baz-2');

console.log(JSON.stringify(data, null, 2));

