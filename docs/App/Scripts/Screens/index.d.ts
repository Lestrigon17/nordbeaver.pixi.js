/// <reference path="../../../../App/Scripts/Screens/index.d.ts" />
import { BaseScreen } from "./BaseScreen";
import { Manager } from "./Manager";
import { ScreenEndGame } from "./ScreenEndGame/ScreenEndGame";
import { ScreenLeaderboard } from "./ScreenLeaderboard/ScreenLeaderboard";
import { ScreenStart } from "./ScreenStart/ScreenStart";
export declare class Screens {
    static BaseScreen: typeof BaseScreen;
    static Manager: typeof Manager;
    static List: {
        Start: typeof ScreenStart;
        EndGame: typeof ScreenEndGame;
        Leaderboard: typeof ScreenLeaderboard;
    };
}
//# sourceMappingURL=index.d.ts.map