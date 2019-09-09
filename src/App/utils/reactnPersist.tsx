import moment from "moment";
import { State } from "reactn/default";
import { setGlobal, addCallback } from "reactn";

class Persist {
  localStorageKey = "QFI_TIMELINE_TOOL";
  initialGlobal: State;
  invalidateMs?: number;

  constructor(initialGlobal: State, invalidateMs?: number) {
    this.initialGlobal = initialGlobal;
    this.invalidateMs = invalidateMs;
  }

  initialise(): void {
    const global = this.getGlobal();
    addCallback(global => this.storeGlobal(global));
    setGlobal(global);
  }

  storeGlobal(global: State): void {
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify({
        lastModified: moment().toISOString(),
        global
      })
    );
  }

  getGlobal(): State {
    const item = localStorage.getItem(this.localStorageKey);
    if (!item) {
      return this.initialGlobal;
    }

    const { lastModified, global } = JSON.parse(item);
    if (
      lastModified &&
      this.invalidateMs &&
      moment().diff(lastModified) > this.invalidateMs
    ) {
      return this.initialGlobal;
    }

    if (!global) {
      return this.initialGlobal;
    }

    return global;
  }
}

export { Persist };
