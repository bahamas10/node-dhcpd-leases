node-dhcpd-leases
=================

parse isc-dhcpd dhcpd.leases(5) file format

Installation
------------

    npm install dhcpd-leases

Example
-------

Given a file like this `dhcpd.leases`

```
# The format of this file is documented in the dhcpd.leases(5) manual page.
# This lease file was written by isc-dhcp-4.3.1

lease 10.0.1.1 {
  starts 5 2015/05/15 01:57:17;
  ends 5 2015/05/15 02:07:17;
  tstp 5 2015/05/15 02:07:17;
  cltt 5 2015/05/15 01:57:17;
  binding state free;
  hardware ethernet 00:11:22:33:44:55;
  client-hostname "host1";
  uid "foo";
}
lease 10.0.1.2 {
  starts 5 2015/05/15 02:09:16;
  ends 5 2015/05/15 02:19:16;
  tstp 5 2015/05/15 02:19:16;
  cltt 5 2015/05/15 02:09:16;
  binding state free;
  hardware ethernet 00:11:22:33:44:56;
  client-hostname "host2";
  uid "bar";
}
lease 10.0.1.3 {
  starts 5 2015/05/15 02:16:01;
  ends 5 2015/05/15 02:26:01;
  tstp 5 2015/05/15 02:26:01;
  cltt 5 2015/05/15 02:16:01;
  binding state free;
  hardware ethernet 00:11:22:33:44:57;
  client-hostname "host3";
  uid "baz-1";
}
lease 10.0.1.3 {
  starts 5 2015/05/15 02:17:01;
  ends 5 2015/05/15 02:27:01;
  tstp 5 2015/05/15 02:27:01;
  cltt 5 2015/05/15 02:17:01;
  binding state free;
  hardware ethernet 00:11:22:33:44:57;
  client-hostname "host3";
  uid "baz-2";
}
```

return

``` json
[
  {
    "ip": "10.0.1.1",
    "starts": "2015-05-15T01:57:17.000Z",
    "ends": "2015-05-15T02:07:17.000Z",
    "tstp": "2015-05-15T02:07:17.000Z",
    "cltt": "2015-05-15T01:57:17.000Z",
    "binding state": "free",
    "hardware ethernet": "00:11:22:33:44:55",
    "client-hostname": "host1",
    "uid": "foo"
  },
  {
    "ip": "10.0.1.2",
    "starts": "2015-05-15T02:09:16.000Z",
    "ends": "2015-05-15T02:19:16.000Z",
    "tstp": "2015-05-15T02:19:16.000Z",
    "cltt": "2015-05-15T02:09:16.000Z",
    "binding state": "free",
    "hardware ethernet": "00:11:22:33:44:56",
    "client-hostname": "host2",
    "uid": "bar"
  },
  {
    "ip": "10.0.1.3",
    "starts": "2015-05-15T02:16:01.000Z",
    "ends": "2015-05-15T02:26:01.000Z",
    "tstp": "2015-05-15T02:26:01.000Z",
    "cltt": "2015-05-15T02:16:01.000Z",
    "binding state": "free",
    "hardware ethernet": "00:11:22:33:44:57",
    "client-hostname": "host3",
    "uid": "baz-1"
  },
  {
    "ip": "10.0.1.3",
    "starts": "2015-05-15T02:17:01.000Z",
    "ends": "2015-05-15T02:27:01.000Z",
    "tstp": "2015-05-15T02:27:01.000Z",
    "cltt": "2015-05-15T02:17:01.000Z",
    "binding state": "free",
    "hardware ethernet": "00:11:22:33:44:57",
    "client-hostname": "host3",
    "uid": "baz-2"
  }
]
```

Usage
-----

``` js
var fs = require('fs');

var dhcpdleases = require('dhcpd-leases');

var s = fs.readFileSync('/var/db/isc-dhcpd/dhcpd.leases', 'utf-8');
var data = dhcpdleases(s);
console.log(data);
```

License
-------

MIT
