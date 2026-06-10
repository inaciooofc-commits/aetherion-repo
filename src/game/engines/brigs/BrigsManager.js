import { pushGameLog, updateGameHud } from "../../bridge/gameEvents";

export default class BrigsManager {
  constructor({ oxx, game, pixi }) {
    this.oxx = oxx;
    this.game = game;
    this.pixi = pixi;
    this.interval = null;
    this.status = "sleeping";
  }

  start() {
    if (this.interval) return;
    this.status = "active";
    pushGameLog("Brigs ativo: gerenciador local invisível monitorando OXX/OXXh.");
    this.interval = window.setInterval(() => this.tick(), 5000);
  }

  tick() {
    const activeScene = this.game?.scene?.getScenes(true)?.[0]?.scene?.key || "nenhuma";
    updateGameHud({ engine: "OXX", brigs: "OK", activeScene });
    if (!this.game || !this.pixi) {
      pushGameLog("Brigs detectou engine ausente. Recarregue a cena se o mapa congelar.");
    }
  }

  stop() {
    if (this.interval) window.clearInterval(this.interval);
    this.interval = null;
    this.status = "stopped";
  }
}
