const EVENT_PREFIX = "aetherion:";

export function emitGameEvent(type, detail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(`${EVENT_PREFIX}${type}`, { detail }));
}

export function onGameEvent(type, handler) {
  if (typeof window === "undefined") return () => {};
  const eventName = `${EVENT_PREFIX}${type}`;
  const wrapped = (event) => handler(event.detail || {});
  window.addEventListener(eventName, wrapped);
  return () => window.removeEventListener(eventName, wrapped);
}

export function pushGameLog(message, meta = {}) {
  emitGameEvent("log", {
    message,
    meta,
    at: new Date().toISOString()
  });
}

export function updateGameHud(payload = {}) {
  emitGameEvent("hud", payload);
}

export function updateEquipmentPreview(equipment = {}) {
  emitGameEvent("equipment", equipment);
}
