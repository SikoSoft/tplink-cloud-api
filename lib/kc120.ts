/**
 * @package     tplink-cloud-api
 * @author      Aaron Wright <aaron@sikosoft.com>
 * @copyright   (C) 2021 Aaron Wright
 * @license     https://www.gnu.org/licenses/gpl-3.0.txt
 * @link        http://sikosoft.com
 */

/* This file is part of tplink-cloud-api.

tplink-cloud-api is free software: you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option) any
later version.

tplink-cloud-api is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
tplink-cloud-api. If not, see http://www.gnu.org/licenses/. */

import device from "./device";

export default class KC120 extends device {
  constructor(tpLink, deviceInfo) {
    super(tpLink, deviceInfo);
    this.genericType = "camera";
  }

  async powerOn() {
    return await this.setCameraSwitch('on');
  }

  async powerOff() {
    return await this.setCameraSwitch('off');
  }

  async setCameraSwitch(switchState) {
    return await super.passthroughRequest({
      'smartlife.cam.ipcamera.switch': { set_is_enable: { 'value': switchState } }
    });
  }
  async set_camera_switch(state) {
    return this.setCameraSwitch(state);
  }

  async isOn() {
    return (await this.getCameraSwitch()) === 'on';
  }

  async isOff() {
    return !(await this.isOn());
  }

  async toggle() {
    const s = await this.getCameraSwitch();
    return await this.setCameraSwitch(s === 'off' ? 'on' : 'off');
  }

  async get_camera_switch() {
    return this.getCameraSwitch();
  }
  async getCameraSwitch() {
    const r = await this.getSysInfo();
    return r.system.camera_switch;
  }

  async getSysInfo() {
    const r = await super.passthroughRequest({
      system: { get_sysinfo: null },
      emeter: { get_realtime: null }
    });
    return r.system.get_sysinfo;
  }
}
