class SimpleBus {
  constructor() { this.events = {}; }
  on(name, fn) {
    if (!this.events[name]) this.events[name] = [];
    this.events[name].push(fn);
  }
  off(name, fn) {
    if (this.events[name]) this.events[name] = this.events[name].filter(f => f !== fn);
  }
  emit(name, payload) {
    if (this.events[name]) this.events[name].forEach(fn => fn(payload));
  }
  clear() { this.events = {}; }
}

export const EventBus = new SimpleBus();
