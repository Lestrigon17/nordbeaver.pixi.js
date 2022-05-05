import * as PIXI from 'pixi.js';
import { Core } from "../../Core";
export declare class GameUI extends Core.PIXIComponents.Base {
    countLabel: PIXI.Text;
    protected OnLoad(): void;
    private CreateView;
    private CreateButtonPause;
    private CreateButtonMute;
    private CreateButtonFullscreen;
    private CreateCoinsPanel;
    protected OnUpdate(deltaTime: number): void;
}
//# sourceMappingURL=GameUI.d.ts.map