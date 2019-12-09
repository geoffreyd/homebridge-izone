import Discovery from './discovery';
var Service, Characteristic;

export default function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  
  homebridge.registerAccessory("homebridge-izone", "IZone", IZone);
}

class IZone {
  log: Function;
  name: string;

  acService: any;

  constructor(log: Function, config: any) {
    this.log = log;
    this.name = config["name"];
    const acService = new Service.HeaterCooler(this.name);

    acService
      .getCharacteristic(Characteristic.Active)
      .on('get', this.getActiveState.bind(this) );

    const discovery = new Discovery();

  }

  getActiveState() {
    Characteristic.Active.INACTIVE;
    Characteristic.Active.ACTIVE;
  }

}
