declare type TCallbackItem = {
    callback: Function;
    bound?: object;
};
export declare class EventHandler<TCallback extends Function = (...args: any[]) => void> {
    static Instantiate(): PropertyDecorator;
    callbackStore: TCallbackItem[];
    Invoke(...params: ArgumentTypes<TCallback>): void;
    Subscribe(callback: TCallback, bound?: object): void;
    Unsubscribe(callback: Function, bound?: object): void;
    ClearSubscribes(): void;
    private TryToFixStore;
    private DeleteCallback;
}
export {};
//# sourceMappingURL=EventHandler.d.ts.map