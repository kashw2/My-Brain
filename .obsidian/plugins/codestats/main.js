/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => CodeStatsPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian3 = require("obsidian");

// src/getISOTimestamp.ts
function getISOTimestamp(date) {
  const offset = -date.getTimezoneOffset();
  const prefix = offset >= 0 ? "+" : "-";
  function pad(num) {
    const norm = Math.abs(Math.floor(num));
    return (norm < 10 ? "0" : "") + norm;
  }
  return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + "T" + pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds()) + prefix + pad(offset / 60) + pad(offset % 60);
}

// src/ApiKeyModal.ts
var import_obsidian = require("obsidian");
var ApiKeyModal = class extends import_obsidian.Modal {
  constructor(app, plugin) {
    super(app);
    this.opened = false;
    this.plugin = plugin;
  }
  onOpen() {
    if (this.opened) {
      return;
    }
    this.opened = true;
    const { contentEl } = this;
    contentEl.classList.add("codestats-modal");
    contentEl.createEl("p", { text: "Enter Code::Stats API key" });
    const input = contentEl.createEl("input", {
      type: "text",
      placeholder: "Enter your API key here",
      value: this.plugin.settings.API_KEY
    });
    contentEl.createEl("button", { text: "Save" }).addEventListener("click", () => {
      this.plugin.settings.API_KEY = input.value;
      this.plugin.saveSettings();
      this.close();
    });
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
    this.opened = false;
  }
};

// src/SettingsTab.ts
var import_obsidian2 = require("obsidian");
var SettingsTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Code::Stats plugin settings" });
    new import_obsidian2.Setting(containerEl).setName("Code::stats API key").setDesc("It can be found or created on https://codestats.net/my/machines page").addText((text) => text.setPlaceholder("Enter your API key here").setValue(this.plugin.settings.API_KEY).onChange(async (value) => {
      this.plugin.settings.API_KEY = value;
      await this.plugin.saveSettings();
    }));
  }
};

// src/main.ts
var DEFAULT_SETTINGS = {
  API_KEY: "",
  API_URL: "https://codestats.net/api"
};
var keysSet = /* @__PURE__ */ new Set(["Meta", "Alt", "Shift", "Control", "CapsLock"]);
var CodeStatsPlugin = class extends import_obsidian3.Plugin {
  constructor() {
    super(...arguments);
    this.counter = 0;
    this.modal = null;
  }
  async onload() {
    await this.loadSettings();
    this.modal = new ApiKeyModal(this.app, this);
    this.addCommand({
      id: "open-codestats-key-modal",
      name: "Enter Code::Stats API key",
      callback: () => {
        var _a;
        (_a = this.modal) == null ? void 0 : _a.open();
      }
    });
    const statusBarItemEl = this.addStatusBarItem();
    statusBarItemEl.setText("C::S");
    this.addSettingTab(new SettingsTab(this.app, this));
    this.registerDomEvent(document, "keyup", (evt) => {
      if (keysSet.has(evt.key) || evt.key.indexOf("Arrow") !== -1) {
        return;
      }
      this.counter += 1;
    });
    this.registerInterval(window.setInterval(() => {
      if (this.counter > 0) {
        void this.updateStats();
      }
    }, 1e4));
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async updateStats() {
    var _a;
    if (!this.settings.API_KEY) {
      (_a = this.modal) == null ? void 0 : _a.open();
      return;
    }
    try {
      void (0, import_obsidian3.requestUrl)({
        url: this.settings.API_URL + "/my/pulses",
        method: "POST",
        headers: {
          "X-API-Token": this.settings.API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          coded_at: getISOTimestamp(new Date()),
          xps: [{
            language: "Markdown",
            xp: this.counter
          }]
        })
      });
    } finally {
      this.counter = 0;
    }
  }
  onunload() {
    void this.updateStats();
  }
};