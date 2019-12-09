// Service.HeaterCooler

// // Required Characteristics
// this.addCharacteristic(Characteristic.Active);
// this.addCharacteristic(Characteristic.CurrentHeaterCoolerState);
// this.addCharacteristic(Characteristic.TargetHeaterCoolerState);
// this.addCharacteristic(Characteristic.CurrentTemperature);

// // Optional Characteristics
// this.addOptionalCharacteristic(Characteristic.LockPhysicalControls);
// this.addOptionalCharacteristic(Characteristic.Name);
// this.addOptionalCharacteristic(Characteristic.SwingMode);
// this.addOptionalCharacteristic(Characteristic.CoolingThresholdTemperature);
// this.addOptionalCharacteristic(Characteristic.HeatingThresholdTemperature);
// this.addOptionalCharacteristic(Characteristic.TemperatureDisplayUnits);
// this.addOptionalCharacteristic(Characteristic.RotationSpeed);

let Accessory, Service, Characteristic, UUIDGen;

export default function(homebridge) {
  // Accessory must be created from PlatformAccessory Constructor
  Accessory = homebridge.platformAccessory;

  // Service and Characteristic are from hap-nodejs
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  UUIDGen = homebridge.hap.uuid;

  // For platform plugin to be considered as dynamic platform plugin,
  // registerPlatform(pluginName, platformName, constructor, dynamic), dynamic must be true
  homebridge.registerPlatform("homebridge-izone", "iZone", IZone, true);
}

function IZone(log, config, api) {
  log("IZone init");
  const platform = this;
  this.log = log;
  this.config = config;
  this.accessories = [];
}
