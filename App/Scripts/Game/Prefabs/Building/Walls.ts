import { Config } from "../../../Configs";
import { Core } from "../../../Core";
import { Base } from "./Base";
import { Roofs } from "./Roofs";
import { SideLeft } from "./SideLeft";
import { SideRight } from "./SideRight";
import { Windows } from "./Windows";

const { Enviroment} = Config.Sprites.Sheets;
const { walls } = Enviroment.sprites.building;
export class Walls extends Base {
	public static allowHeight: number = 5;
	public get allowHeight(): number {
		return Walls.allowHeight;
	}

	private _sprites: string[] = [
		walls[1],
		walls[2]
	]

	public allowConstrains = {
		up: [Walls, Roofs, Windows],
		right: [Walls, Windows, SideRight],
		left: [SideLeft]
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