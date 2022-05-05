import * as PIXI from "pixi.js";
import { BaseScreen } from "../BaseScreen";
export declare class ScreenStart extends BaseScreen {
    background: PIXI.Sprite;
    titleLabel?: PIXI.Text;
    buttonLeaderboard?: Types.Core.PIXIComponents.ButtonSprite;
    protected OnOpen(): Promise<void>;
    protected OnLoadScreen(): void;
    private SubscribeEvents;
    protected OnDestroy(): void;
    private HandleButtonLeaderboard;
    private CreateBackground;
    private CreateView;
    private CreateButtonStart;
    private CreateHeader;
    private CreateButtonLeaderboard;
    private CreateButtonMILogin;
    private CreateFakeName;
    private CreateRecord;
    private HandleButtonStart;
}
//# sourceMappingURL=ScreenStart.d.ts.map