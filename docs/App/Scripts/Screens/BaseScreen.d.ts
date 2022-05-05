import { Core } from '../Core';
declare type TButton = Nullable<Types.Core.PIXIComponents.Button>;
export declare class BaseScreen extends Core.PIXIComponents.Base {
    HandleClose: Types.Core.EventHandler;
    protected set buttonClose(button: TButton);
    protected get buttonClose(): TButton;
    private _buttonClose;
    Open(): Promise<void>;
    Close(): void;
    FirstInitialize(): Promise<void>;
    protected OnLoad(): void;
    protected OnLoadScreen(): void;
    protected OnClose(): void;
    protected OnOpen(): Promise<void>;
    protected OnFirstInitialize(): Promise<void>;
    private SetPositionState;
    private HandleButtonClose;
    private EnableButtonClose;
    private DisableButtonClose;
}
export {};
//# sourceMappingURL=BaseScreen.d.ts.map