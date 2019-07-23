import dgram from 'dgram';
import { AddressInfo } from 'net';

const discoveryMsg = 'IASD';
const discoveryPort = 12107;
const discoveryListenPort = 10086;
const heartBeatPort = 7005;


// Create udp server socket object.
const discovery = dgram.createSocket("udp4");
discovery.bind(discoveryListenPort);

// When udp server receive message.
discovery.on('message', (msgBuffer, rinfo) => {
  var address = discovery.address() as AddressInfo;
  var msg = msgBuffer.toString();
  if (msg.startsWith("ASPort_")) {
    controllerFound(msg, rinfo.address);
  } else {
    console.log(`Dis: "${msg}" - from ${rinfo.address}:${rinfo.port}`);
  }
});

discovery.on('error', (err) => {
  console.log(`discovery error:\n${err.stack}`);
  discovery.close();
});

// When udp server started and listening.
discovery.on('listening', function () {
    // Get and print udp server listening ip address and port number in log console. 
    var address = discovery.address() as AddressInfo; 
    console.log('UDP Server started and listening on ' + address.address + ":" + address.port);

    discovery.setBroadcast(true);

    const message = Buffer.from(discoveryMsg);
    discovery.send(message, discoveryPort, '255.255.255.255', (err) => {
      console.log("Message Sent");
    });
});

function controllerFound(data: string, address: string) {
  const [portCode, macCode, ipCode, ...modules] = data.split(",");
  console.log("Found Controller", portCode, macCode, ipCode);
  console.log("With modules", ...modules);

}


const heartBeat = dgram.createSocket("udp4");
heartBeat.bind(heartBeatPort);

heartBeat.on('message', (msg, rinfo) => {
  console.log(`Heartbeat got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});