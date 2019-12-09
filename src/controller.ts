import fetch from 'node-fetch';

type ControllerSettings = {
  AirStreamDeviceUId: string,
  DeviceType: 'ASH',
  SysOn: 'on'|'off',
  SysMode: 'cool'|'heat'|'vent'|'dry'|'auto',
  SysFan: 'low'|'med'|'high'|'auto',
  SleepTimer: 0|30|60|90|120,
  UnitType: string,
  Supply: string, // 'number' in vent temp
  Setpoint: string, // 'number'
  Temp: string, // 'number'
  RAS: 'master'|'RAS'|'zones',
  CtrlZone: number,
  Tag1: string,
  Tag2: string,
  Warnings: 'none'|'filter',
  ACError: string, // This is a 3 character string. If this filed reports " OK", then there are no faults present.
  Id: number,
  EcoLock: 'true'|'false',
  EcoMax: string, // 'number'
  EcoMin: string, // 'number'
  NoOfConst: number,
  NoOfZones: number,
  // "110" – the system is zone control only and all the zones are OPEN/CLOSE zones 
  // "210" - the system is zone control only. Zones can be temperature controlled, dependant on the zone settings.
  // "310" – the system is zone control and unit control.
  // "320" - unknown, but this is what mine is.
  SysType: '110'|'210'|'310'|'320',
  AirflowLock: 'off'|'onMin'|'off',
  UnitLocked: 'true'|'false',
  FreeAir: 'disabled'|'off'|'on',
  FanAuto: 'disabled'|'3-speed'|'2-speed'|'var-speed',
  OemMake: 0
}

type ZoneSettings = { 
  AirStreamDeviceUId: string,
  Id: 0,
  Index: number,
  Name: string,
  Type: 'auto'|'opcl'|'const',
  Mode: 'open'|'close'|'auto',
  SetPoint: number,
  Temp: number,
  MaxAir: number, // 0-100
  MinAir: number, // 0-100
  Const: number, // If the value is 255 the zone is not a constant. Otherwise the number indicates the number of a constant.
  ConstA: 'true'|'false',
  DmpFlt: 'false',
  Master: 'false',
  iSense: 'off' 
}

interface ZonesById {
  [key: string]: ZoneSettings;
}

export default class Controller {
  settings: ControllerSettings;
  zones: ZoneSettings[] = [];
  private baseUrl: string;
  
  constructor(
    public ip: string,
    public id: string,
    public modules: string[]
  ) {
    this.setup();
    this.baseUrl = `http://ip`;
  }
  
  async setup() {
    await this.getSystemSettings();
    await this.getZoneSettings();
  }

  async getSystemSettings() {
    const sysRequest = await fetch(`${this.baseUrl}/SystemSettings`);
    const sysSettings = await sysRequest.json()
    console.log("System settings", sysSettings);
    this.settings = sysSettings;
  }

  async getZoneSettings() {
    const noOfZones = this.settings.NoOfZones;
    const zoneRequest = await this.get('Zones1_4');
    let zoneSettings: ZoneSettings[] = await zoneRequest.json();
    if (noOfZones > 4) {
      const zoneRequest = await this.get('Zones5_8');
      zoneSettings = zoneSettings.concat(await zoneRequest.json());
    }
    if (noOfZones > 8) {
      const zoneRequest = await this.get('Zones9_12');
      zoneSettings = zoneSettings.concat(await zoneRequest.json());
    }
    this.zones = zoneSettings.filter((zone) => zone.Index < noOfZones);
    console.log("Zome Settings", this.zones);
  }

  async getSchedualSettings() {
    this.get('Schedules1_5');
  }

  /*
   * COMMANDS
   */
  async toggleSystem() {
    const toState = this.settings.SysOn == "on" ? "off" : "on"
    await this.post('SystemON', {
      SystemOn: toState
    });
  }

  /*
   * NETWORK
   */  
  get(path) {
    return fetch(`${this.baseUrl}/${path}`);
  }
  post(path, body) {
    return fetch(`${this.baseUrl}/${path}`, {
      method: 'POST',
      body
    });
  }

}
