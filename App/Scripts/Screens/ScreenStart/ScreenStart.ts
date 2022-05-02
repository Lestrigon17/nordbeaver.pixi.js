import * as PIXI from "pixi.js";
import { Config } from "../../Configs";
import { Core } from "../../Core";
import { Logger } from "../../Logger";
import { BaseScreen } from "../BaseScreen";

const { UI: UISprites, UIBackgrounds_1: UIBackgrounds } = Config.Sprites.Sheets

export class ScreenStart extends BaseScreen {
	public background!: PIXI.Sprite;
	public titleLabel?: PIXI.Text;

	protected OnLoadScreen(): void {
		this.sortableChildren = true;

		Core.ResourceLoader.Get(UIBackgrounds.path)
			.then((res) => {
				this.CreateBackground(res);
				return Core.ResourceLoader.Get(UISprites.path);
			})
			.then(this.CreateView.bind(this));
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

	private CreateView(spriteSheet: PIXI.LoaderResource): void {
		if (!spriteSheet.textures) {
			Logger.LogError("Invalid spritesheet", UISprites.path);
			return;
		}

		this.CreateButtonClose(spriteSheet);
		this.CreateHeader(spriteSheet);
		this.CreateButtonLeaderboard(spriteSheet);
		this.CreateButtonMILogin(spriteSheet);
		this.CreateFakeName(spriteSheet);
		this.CreateRecord(spriteSheet);
	}

	private CreateHeader(spriteSheet: PIXI.LoaderResource): void {
		const titleBackground = new PIXI.Sprite();
		titleBackground.setParent(this);
		titleBackground.texture = spriteSheet.textures![UISprites.sprites.screenTitleBackground];
		titleBackground.anchor.set(0.5, 0);
		titleBackground.scale.set(this.background.scale.x);
		titleBackground.position.set(0, -this.background.height / 2 + 5);

		const title = new PIXI.Text(Config.Phrases.yourRecord);
		title.setParent(this);
		title.pivot.set(0.5);
		title.scale.set(0.5);
		title.style.fontSize = "75px";
		title.style.fontFamily = "Krabuler";
		title.style.lineHeight = titleBackground.height;
		title.position.set(-title.width / 2, -this.background.height / 2 + 5);
		
		this.titleLabel = title;
	}

	private CreateButtonClose(spriteSheet: PIXI.LoaderResource): void {		
		const button = new Core.PIXIComponents.ButtonSprite();
		button.setParent(this);
		button.spriteConfig = UISprites.sprites.buttonPlay;
		button.spriteSheet = spriteSheet;
		button.zIndex = 2;
		button.scale.set(this.background.scale.x);
		button.position.set(button.width / 2, this.background.height / 2 - 100);
		

		this.buttonClose = button;
	}

	private CreateButtonLeaderboard(spriteSheet: PIXI.LoaderResource): void {		
		const button = new Core.PIXIComponents.ButtonSprite();
		button.setParent(this);
		button.spriteConfig = UISprites.sprites.buttonLeaderboard;
		button.spriteSheet = spriteSheet;
		button.zIndex = 3;
		button.scale.set(this.background.scale.x);
		button.position.set(-button.width / 2, this.background.height / 2 - 100);
	}

	private CreateButtonMILogin(spriteSheet: PIXI.LoaderResource): void {		
		const button = new Core.PIXIComponents.ButtonSprite();
		button.setParent(this);
		button.spriteConfig = UISprites.sprites.buttonMILogin;
		button.spriteSheet = spriteSheet;
		button.zIndex = 3;
		button.scale.set(this.background.scale.x);
		button.position.set(0, -50);
	}

	private CreateFakeName(spriteSheet: PIXI.LoaderResource): void {
		const background = new PIXI.Sprite();
		background.setParent(this);
		background.texture = spriteSheet.textures![UISprites.sprites.userNameBar];
		background.anchor.set(0.5, 0);
		background.scale.set(this.background.scale.x);
		background.position.set(0, 25);

		const nickname = new PIXI.Text(Config.Phrases.pseudoName);
		nickname.setParent(background);
		nickname.pivot.set(0.5);
		nickname.scale.set(0.5 + 1 - background.scale.x);
		nickname.style.fill = "#ffffff"
		nickname.style.fontSize = "75px";
		nickname.style.fontFamily = "Krabuler";
		nickname.position.set(-background.width * background.scale.x - 50, 15);
	}

	private CreateRecord(spriteSheet: PIXI.LoaderResource): void {
		const style = {
			dropShadow: true,
			dropShadowColor: '#000000',
			dropShadowBlur: 6,
			dropShadowAngle: 90,
			dropShadowDistance: 3,
			fill: "#06eb62", 
			fontFamily: "Krabuler"
		}
		const title = new PIXI.Text(Config.Phrases.currentRecord);
		title.setParent(this);
		title.pivot.set(0.5);
		title.scale.set(0.5);
		title.style.fontSize = "100px";
		title.style = {...title.style, ...style};
		title.position.set(-title.width / 2, -this.background.height / 2 + 65);

		const value = new PIXI.Text("0");
		value.setParent(this);
		value.pivot.set(0.5);
		value.scale.set(0.5);
		value.style.fontSize = "74px";
		value.style = {...value.style, ...style};
		value.position.set(-value.width / 2, -this.background.height / 2 + 115);
	}
}