import { Config } from "../../../Configs";
import { Core } from "../../../Core";
import { Base } from "./Base";
import { Roofs } from "./Roofs";
import { SideLeft } from "./SideLeft";
import { SideRight } from "./SideRight";
import { Walls } from "./Walls";

const { Enviroment} = Config.Sprites.Sheets;
const { windows } = Enviroment.sprites.building;
export class Windows extends Base {
	public static allowHeight: number = 4;
	public get allowHeight(): number {
		return Windows.allowHeight;
	}

	private _sprites: string[] = [
		windows[1],
		windows[2]
	]

	public allowConstrains = {
		up: [Roofs, Walls, Windows],
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