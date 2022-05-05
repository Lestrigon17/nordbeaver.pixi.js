import * as PIXI from "pixi.js";
import { BaseScreen } from "../BaseScreen";
export declare class ScreenLeaderboard extends BaseScreen {
    background: PIXI.Sprite;
    titleLabel?: PIXI.Text;
    buttonLeaderboard?: Types.Core.PIXIComponents.ButtonSprite;
    private _titlePage;
    private _buttonBefore?;
    private _buttonNext?;
    private _pages;
    private _currentPage?;
    private _currentPageIndex;
    private _buttonTimeout;
    private _buttonTimeoutLenght;
    protected OnLoadScreen(): void;
    private CreateBackground;
    private CreateView;
    protected OnDestroy(): void;
    private ShowPage;
    private CreateControlMenu;
    private OnClickButtonBefore;
    private OnClickButtonNext;
    private CreatePages;
    private CreateButtonClose;
    private CreateHeader;
}
//# sourceMappingURL=ScreenLeaderboard.d.ts.map