import moment from "moment";
import { State } from "reactn/default";
import { setGlobal, addCallback } from "reactn";

const KEY_BASE = "QFI_TIMELINE_TOOL";

class Persist {
  globalStorageKey = `${KEY_BASE}_GLOBAL`;
  timeoutStorageKey = `${KEY_BASE}_TIMEOUT`;
  initialGlobal: State;
  timeoutMs: number;

  constructor(initialGlobal: State, timeoutMs?: number) {
    this.initialGlobal = initialGlobal;
    if (timeoutMs != null) {
      localStorage.setItem(this.timeoutStorageKey, String(timeoutMs));
      this.timeoutMs = timeoutMs;
    } else {
      this.timeoutMs = Number(
        localStorage.getItem(this.timeoutStorageKey) || 12 * 60 * 60 * 1000
      );
    }
  }

  initialise(onComplete: (global: State) => void): void {
    const global = this.getGlobal();
    addCallback(global => this.storeGlobal(global));
    setGlobal(global);
    onComplete(global);
  }

  storeGlobal(global: State): void {
    localStorage.setItem(
      this.globalStorageKey,
      JSON.stringify({
        lastModified: moment().toISOString(),
        global
      })
    );
  }

  getGlobal(): State {
    const item = localStorage.getItem(this.globalStorageKey);
    if (!item) {
      return this.initialGlobal;
    }

    const { lastModified, global } = JSON.parse(item);
    if (lastModified && moment().diff(lastModified) > this.timeoutMs) {
      return this.initialGlobal;
    }

    if (!global) {
      return this.initialGlobal;
    }

    return global;
  }
}

export { Persist };
