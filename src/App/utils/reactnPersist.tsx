import moment from "moment";
import { State } from "reactn/default";
import { setGlobal, addCallback } from "reactn";

const KEY_BASE = "QFI_TIMELINE_TOOL";

class Persist {
  private globalStorageKey = `${KEY_BASE}_GLOBAL`;
  private timeoutStorageKey = `${KEY_BASE}_TIMEOUT`;
  private timeoutMs: number;

  constructor(private initialGlobal: State, timeoutMs?: number) {
    if (timeoutMs != null) {
      localStorage.setItem(this.timeoutStorageKey, String(timeoutMs));
      this.timeoutMs = timeoutMs;
    } else {
      const storedTimeout = localStorage.getItem(this.timeoutStorageKey);

      if (storedTimeout == null) {
        this.timeoutMs = 12 * 60 * 60 * 1000;
        localStorage.setItem(this.timeoutStorageKey, String(this.timeoutMs));
      } else {
        this.timeoutMs = Number(storedTimeout);
      }
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
