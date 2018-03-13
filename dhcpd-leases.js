/**
 * parse isc-dhcpd dhcpd.leases(5) file format
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: May 15, 2015
 * License: MIT
 */

module.exports = dhcpdleases;
function dhcpdleases(s) {
  var leases = [];

  var current;
  var index = -1;
  s.trim().split('\n').forEach(function(line) {
    var m;
    if ((m = line.match(/^lease (.*) {$/))) {
      // new lease
      index += 1
      leases[index] = {}
      leases[index].ip = m[1]
    } else if ((m = line.match(/^  (starts|ends|cltt|atsfp|tstp|tsfp) \d+ (.*);$/))) {
      // starts, ends, cltt, etc. dates
      leases[index][m[1]] = new Date(m[2] + ' UTC');
    } else if ((m = line.match(/^  ([a-zA-Z0-9 -]+) ([^"].*);$/))) {
      // misc.
      leases[index][m[1]] = m[2];
    } else if ((m = line.match(/^  ([a-zA-Z0-9 -]+) "(.*)";$/))) {
      // client-hostname, uid
      leases[index][m[1]] = m[2];
    }
  });

  return leases;
}
