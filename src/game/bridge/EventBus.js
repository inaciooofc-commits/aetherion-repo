import Phaser from 'phaser';
export const EventBus = new Phaser.Events.EventEmitter();
export const emitReact = (name, payload = {}) => EventBus.emit(name, payload);
