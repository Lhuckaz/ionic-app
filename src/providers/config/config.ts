import { Injectable } from '@angular/core';

const config_key_name = "confi2";

@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
    name: "",
    username: ""
  }

  constructor() {

  }

  getConfigData(): any {
    return localStorage.getItem(config_key_name);
  }

  setConfigData(showSlide?: boolean, name?: string, username?: string): void {
    let config = this.config;
    if (showSlide) {
      config.showSlide = showSlide
    }
    if (name) {
      config.name = name
    }
    if (username) {
      config.username = username
    }
    localStorage.setItem(config_key_name, JSON.stringify(config));
  }

}
