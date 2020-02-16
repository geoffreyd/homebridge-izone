import Discovery from './discovery';
import Controller, { ControllerSettings } from './controller';

export default class IZoneAPI {

  discovery: Discovery;
  ready: Promise<Controller>;
  controller: Controller;

  constructor() {
    this.discovery = new Discovery();

    this.ready = this.discovery.foundFirst.then(controller => {
      this.controller = controller
      return controller.ready;
    }).then(() => this.controller);
  }

  async getIP() {
    const controller = await this.ready;
    return controller.ip;
  }

  async getActiveZones() {
    const controller = await this.ready;
    return await controller.currentZones();
  }

  async currentSystem() {
    return (await this.ready).currentSystem();
  }
  async system(property: string) {
    return (await this.currentSystem())[property];
  }

  async getState() {
    return this.system('SysOn');
  }
  async setOn() {
    this.controller.toggleSystem("on");
  }
  async setOff() {
    this.controller.toggleSystem("off");
  }

  async getHeaterCoolerState() {
    return this.system('SysMode');
  }

  async setSystemMode(mode: ControllerSettings['SysMode']) {
    return (await this.ready).setSystemMode(mode);
  }

  async getZoneTemp(zoneIdx: number) {
    const zones = await (await this.ready).currentZones();
    return zones.find(zone => zone.Index === zoneIdx).Temp;
  }
  async setZoneTarget(zoneIdx: number, target: number) {
    return (await this.ready).setZoneTarget(zoneIdx.toString(), target.toString());
  }

  async getDuctTemp() {
    return this.system('Temp');
  }

  async getACTarget() {

  }

  async setACTarget(target) {

  }

}
