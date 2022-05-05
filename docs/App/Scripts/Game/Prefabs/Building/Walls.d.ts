import { Base } from "./Base";
import { Roofs } from "./Roofs";
import { SideLeft } from "./SideLeft";
import { SideRight } from "./SideRight";
import { Windows } from "./Windows";
export declare class Walls extends Base {
    static allowHeight: number;
    get allowHeight(): number;
    private _sprites;
    allowConstrains: {
        up: (typeof Walls | typeof Windows | typeof Roofs)[];
        right: (typeof Walls | typeof Windows | typeof SideRight)[];
        left: (typeof SideLeft)[];
    };
    protected OnLoad(): void;
}
//# sourceMappingURL=Walls.d.ts.map