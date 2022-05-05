import * as PIXI from 'pixi.js';
import { Config } from '../../Configs';
import { Core } from "../../Core";
import { Game } from '../../Game';

const {sprites: UISprites} = Config.Sprites.Sheets.UI;
const { Application } = Config.Main.PIXI;

export class GameUI extends Core.PIXIComponents.Base {
	public countLabel!: PIXI.Text;

	protected OnLoad(): void {
		Core.ResourceLoader.Get(Config.Sprites.Sheets.UI.path)
			.then(this.CreateView.bind(this));
	}

	private CreateView(spriteSheet: PIXI.LoaderResource): void {
		if (!spriteSheet.textures) return;
		this.CreateCoinsPanel(spriteSheet)
		this.CreateButtonPause(spriteSheet);
		this.CreateButtonMute(spriteSheet);
		this.CreateButtonFullscreen(spriteSheet);
	}

	private CreateButtonPause(spriteSheet: PIXI.LoaderResource): void {
		const button = new Core.PIXIComponents.ButtonSprite();
		button.setParent(this);
		button.spriteSheet = spriteSheet;
		button.spriteConfig = UISprites.GameUI.buttonPause;
		button.scale.set(0.7);
		button.position.set(Application.width - button.width /2 - 10, button.height / 2);
	}

	private CreateButtonMute(spriteSheet: PIXI.LoaderResource): void {
		const button = new Core.PIXIComponents.ButtonSprite();
		button.setParent(this);
		button.spriteSheet = spriteSheet;
		button.spriteConfig = UISprites.GameUI.buttonMute.active;
		button.scale.set(0.7);
		button.position.set(Application.width - button.width - button.width /2 - 10, button.height / 2);

		let state = false;

		button.OnButtonEvent.Subscribe((ev: Types.Core.PIXIComponents.EEventType) => {
			if (ev !== Core.PIXIComponents.Button.EEventType.PointerUp) return;
			state = !state;
			button.spriteConfig = UISprites.GameUI.buttonMute[ state ? "muted" : "active"];
		})
	}

	private CreateButtonFullscreen(spriteSheet: PIXI.LoaderResource): void {
		const button = new Core.PIXIComponents.ButtonSprite();
		button.setParent(this);
		button.spriteSheet = spriteSheet;
		button.spriteConfig = UISprites.GameUI.buttonFullscreen;
		button.scale.set(0.7);
		button.position.set(Application.width- button.width*2 - button.width /2 - 10, button.height / 2);
	}
	
	private CreateCoinsPanel(spriteSheet: PIXI.LoaderResource): void {
		const background = new PIXI.Sprite();
		background.texture = spriteSheet.textures![UISprites.GameUI.coinScoreBackground];
		background.setParent(this);
		background.scale.set(0.8)
		background.anchor.set(0, 0.5);
		background.position.set(10, background.height / 2 + 10);

		const icon = new PIXI.Sprite();
		icon.texture = spriteSheet.textures![UISprites.GameUI.coinScoreIcon];
		icon.setParent(background);
		icon.scale.set(0.8);
		icon.anchor.set(0, 0.5);

		const countLabel = new PIXI.Text("0");
		countLabel.setParent(background);
		countLabel.scale.set(0.5)
		countLabel.anchor.set(0.5, 0.5);
		countLabel.style.fontSize = "80px";
		countLabel.style.fontFamily = "Krabuler";
		countLabel.style.fill = "#FFFFFF";
		countLabel.position.set(icon.width + (background.width - icon.width) / 2 , 0);

		this.countLabel = countLabel;
	}

	protected OnUpdate(deltaTime: number): void {
		if (this.countLabel && Game.Manager.currentSession && Game.Manager.currentSession.player) {
			this.countLabel.text = `${Game.Manager.currentSession.player.scoreCoins}`;
		}
	}
}