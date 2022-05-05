import { BaseScreen } from "./BaseScreen";
declare type TOpenScreenData = {
    prevScreen?: Nullable<BaseScreen>;
};
export declare class Manager {
    private static _screenCache;
    private static _activeScreen?;
    private static _isBusy;
    static GetFromCache(screen: typeof BaseScreen): Nullable<BaseScreen>;
    static OpenScreen<T extends BaseScreen>(screen: typeof BaseScreen, data?: TOpenScreenData): Promise<T>;
    private static OnScreenInitialized;
}
export {};
//# sourceMappingURL=Manager.d.ts.map