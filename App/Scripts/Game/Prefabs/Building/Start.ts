import { Config } from "../../../Configs";
import { Core } from "../../../Core";
import { Base } from "./Base";
import { Basement } from "./Basement";
import { BaseToWall } from "./BaseToWall";
import { SideLeft } from "./SideLeft";
import { SideRight } from "./SideRight";
import { Walls } from "./Walls";
import { Windows } from "./Windows";

const { Enviroment} = Config.Sprites.Sheets;
const { basements } = Enviroment.sprites.building;
export class Start extends Base {
	public static allowHeight: number = 2;
	public get allowHeight(): number {
		return Walls.allowHeight;
	}

	private _sprites: string[] = [
		basements[1],
		basements[2]
	]

	public allowConstrains = {
		right: [Basement],
		left: [Basement],
		up: [BaseToWall, Basement, Walls, Windows]
	}

	protected OnLoad(): void {
		Core.ResourceLoader.Get(Enviroment.path)
			.then((spriteSheet) => {
				if (!spriteSheet.textures) return super.OnLoad();

				const id = Core.Utils.Array.GetRandom(this._sprites)!
				this.spriteTexture = spriteSheet.textures[id];
				super.OnLoad();
			})
	}
}