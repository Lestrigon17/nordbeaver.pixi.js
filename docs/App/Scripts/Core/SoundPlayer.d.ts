import { Config } from '../Configs';
declare type TSoundAliasKey = keyof typeof Config.Sounds;
export declare class SoundPlayer {
    private static _isEnabled;
    private static _volume;
    private static _soundStorage;
    static Init(): Promise<void>;
    static PlaySound(key: TSoundAliasKey): void;
}
export {};
//# sourceMappingURL=SoundPlayer.d.ts.map