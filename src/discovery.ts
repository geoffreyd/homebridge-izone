import dgram from 'dgram';
import { AddressInfo } from 'net';
import Controller from './controller';

const discoveryMsg = 'IASD';
const discoveryPort = 12107;
const discoveryListenPort = 10086;
const heartBeatPort = 7005;

export default class Discovery {
  discovery: dgram.Socket;
  heartBeat: dgram.Socket;
  controllerClass = Controller;
  public controllers: Controller[] = [];

  public foundFirst: Promise<Controller>;
  private foundResolve: (value: Controller) => void;

  constructor() {
    // Create udp server socket object.
    const discovery = this.discovery = dgram.createSocket("udp4");
    discovery.bind(discoveryListenPort);
    discovery.on('message', this.onMessage.bind(this));
    discovery.on('error', this.onError.bind(this));
    // When udp server started and listening.
    discovery.on('listening', this.onListen.bind(this));

    const heartBeat = this.heartBeat = dgram.createSocket("udp4");
    heartBeat.bind(heartBeatPort);

    heartBeat.on('message', this.onHeartBeat.bind(this));

    this.foundFirst = new Promise((resolve, _reject) => this.foundResolve = resolve);
  }

  onMessage(msgBuffer, rinfo) {
    var address = this.discovery.address() as AddressInfo;
    var msg = msgBuffer.toString();
    if (msg.startsWith("ASPort_")) {
      this.controllerFound(msg, rinfo.address);
    } else {
      console.log(`Dis: "${msg}" - from ${rinfo.address}:${rinfo.port}`);
    }
  }

  onError(err) {
    console.log(`discovery error:\n${err.stack}`);
    this.discovery.close();
  }

  onListen() {
    // Get and print udp server listening ip address and port number in log console. 
    var address = this.discovery.address() as AddressInfo;
    console.log('UDP Server started and listening on ' + address.address + ":" + address.port);

    this.discovery.setBroadcast(true);

    const message = Buffer.from(discoveryMsg);
    this.discovery.send(message, discoveryPort, '255.255.255.255', (err) => {
      console.log("Message Sent");
    });
  }

  onHeartBeat(msg, rinfo) {
    console.log(`Heartbeat got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  }

  controllerFound(data: string, address: string) {
    const [portCode, macCode, ipCode, ...modules] = data.split(",");
    console.log("Found Controller", portCode, macCode, ipCode);
    console.log("With modules", ...modules);
    const [,ip] = ipCode.split('_');
    const [,mac] = macCode.split('_');
    
    const controller = new Controller(ip, mac, modules);
    this.controllers.push(controller);

    if (typeof this.foundResolve === "function") {
      this.foundResolve(controller);
      this.foundResolve = undefined;
    }
  }

}