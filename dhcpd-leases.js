/**
 * parse isc-dhcpd dhcpd.leases(5) file format
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: May 15, 2015
 * License: MIT
 */

module.exports = dhcpdleases;
function dhcpdleases(s) {
  var leases = {};

  var current;
  s.trim().split('\n').forEach(function(line) {
    var m;
    if ((m = line.match(/^lease (.*) {$/))) {
      // new lease
      current = m[1];
      leases[current] = {};
    } else if ((m = line.match(/^  (starts|ends|cltt|atsfp|tstp|tsfp) \d+ (.*);$/))) {
      // starts, ends, cltt, etc. dates
      leases[current][m[1]] = new Date(m[2]);
    } else if ((m = line.match(/^  ([a-zA-Z0-9 -]+) ([^"].*);$/))) {
      // misc.
      leases[current][m[1]] = m[2];
    } else if ((m = line.match(/^  ([a-zA-Z0-9 -]+) "(.*)";$/))) {
      // client-hostname, uid
      leases[current][m[1]] = m[2];
    }
  });

  return leases;
}
