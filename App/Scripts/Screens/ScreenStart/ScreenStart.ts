import * as PIXI from "pixi.js";
import { Config } from "../../Configs";
import { Core } from "../../Core";
import { Logger } from "../../Logger";
import { BaseScreen } from "../BaseScreen";

const { UI: UISprites, UIBackgrounds_1: UIBackgrounds } = Config.Sprites.Sheets

export class ScreenStart extends BaseScreen {
	public background?: PIXI.Sprite;

	protected OnLoadScreen(): void {
		this.sortableChildren = true;


		Core.ResourceLoader.Get(UIBackgrounds.path)
			.then((res) => {
				this.CreateBackground(res);
				return Core.ResourceLoader.Get(UISprites.path);
			})
			.then(this.CreateButtonClose.bind(this));

		
			
	}

	private CreateBackground(spriteSheet: PIXI.LoaderResource): void {
		if (!spriteSheet.textures) {
			Logger.LogError("Invalid spritesheet", UIBackgrounds.path);
			return;
		}
		
		console.log(spriteSheet)

		this.background = new PIXI.Sprite( spriteSheet.textures[UIBackgrounds.sprites.background] );
		this.background.setParent(this);
		this.background.anchor.set(0.5);
		this.background.scale.set(0.6);
	}

	private CreateButtonClose(spriteSheet: PIXI.LoaderResource): void {
		if (!spriteSheet.textures) {
			Logger.LogError("Invalid spritesheet", UISprites.path);
			return;
		}
		
		const button = new Core.PIXIComponents.ButtonSprite();
		button.setParent(this);
		button.position.set(150, 150);
		button.spriteConfig = UISprites.sprites.buttonPlay;
		button.spriteSheet = spriteSheet;
		button.zIndex = 2;

		if (this.background) {
			button.scale.set(this.background.scale.x);
			button.position.set(0, this.background.height * this.background.scale.y / 2);
		}

		this.buttonClose = button;
	}
}