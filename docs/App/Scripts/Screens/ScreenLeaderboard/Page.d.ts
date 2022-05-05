import { Core } from "../../Core";
export declare type TPlayerItemSetting = {
    posY: number;
};
export declare class Page extends Core.PIXIComponents.Base {
    OnReady: Types.Core.EventHandler;
    name: string;
    private _players;
    private _marginTop;
    private _marginMiddle;
    protected OnLoad(): void;
    Show(): void;
    Hide(): void;
    private CreateView;
    private CreatePlayers;
    private CreatePlayer;
}
//# sourceMappingURL=Page.d.ts.map