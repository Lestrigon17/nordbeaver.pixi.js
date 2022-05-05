import * as PIXI from "pixi.js";
import { Screens } from "..";
import { Config } from "../../Configs";
import { Core } from "../../Core";
import { Game } from "../../Game";
import { Logger } from "../../Logger";
import { BaseScreen } from "../BaseScreen";
import { Page } from "./Page";

const { UI: UISprites, UIBackgrounds_1: UIBackgrounds } = Config.Sprites.Sheets

export class ScreenLeaderboard extends BaseScreen {
	public background!: PIXI.Sprite;
	public titleLabel?: PIXI.Text;
	public buttonLeaderboard?: Types.Core.PIXIComponents.ButtonSprite;

	private _titlePage!: PIXI.Text;
	private _buttonBefore?: Types.Core.PIXIComponents.ButtonSprite;
	private _buttonNext?: Types.Core.PIXIComponents.ButtonSprite;
	private _pages: Page[] = [];
	private _currentPage?: Page;
	private _currentPageIndex: number = 0;
	private _buttonTimeout: number = 0;
	private _buttonTimeoutLenght: number = 800;

	protected OnLoadScreen(): void {
		this.sortableChildren = true;

		Core.ResourceLoader.Get(UIBackgrounds.path)
			.then((res) => {
				this.CreateBackground(res);
				return Core.ResourceLoader.Get(UISprites.path);
			})
			.then((res) => {
				this.CreateView(res);
			});
	}

	private CreateBackground(spriteSheet: PIXI.LoaderResource): void {
		if (!spriteSheet.textures) {
			Logger.LogError("Invalid spritesheet", UIBackgrounds.path);
			return;
		}
		
		const background = new PIXI.Sprite( spriteSheet.textures[UIBackgrounds.sprites.background] );
		background.setParent(this);
		background.anchor.set(0.5);
		background.scale.set(0.6);

		this.background = background;
	}

	private CreateView(spriteSheet: PIXI.LoaderResource): void {
		if (!spriteSheet.textures) {
			Logger.LogError("Invalid spritesheet", UISprites.path);
			return;
		}

		this.CreateButtonClose(spriteSheet);
		this.CreateHeader(spriteSheet);
		this.CreateControlMenu(spriteSheet)
		this.CreatePages();
		this.ShowPage()
		// this.CreateButtonLeaderboard(spriteSheet);
		// this.CreateButtonMILogin(spriteSheet);
		// this.CreateFakeName(spriteSheet);
		// this.CreateRecord(spriteSheet);
	}

	protected OnDestroy(): void {
		if (this._buttonBefore) {
			this._buttonBefore.OnButtonEvent.Subscribe(this.OnClickButtonBefore, this);
		}
		
		if (this._buttonNext) {
			this._buttonNext.OnButtonEvent.Subscribe(this.OnClickButtonNext, this);
		}
	}

	private ShowPage(pageIndex: number = 0): void {
		if (!this._pages[pageIndex]) return;
		if (this._currentPage) this._currentPage.Hide();

		this._currentPageIndex = pageIndex;
		this._currentPage = this._pages[pageIndex];
		this._currentPage.Show();
		
		if (this._titlePage) {
			this._titlePage.text = this._currentPage.name;
		}
	}

	private CreateControlMenu(spriteSheet: PIXI.LoaderResource): void {
		const posY = -this.background.height / 2 + 100
		const title = new PIXI.Text("Unloaded");
		title.setParent(this);
		title.scale.set(0.5);
		title.anchor.set(0.5);
		title.position.set(0, posY);
		title.style.fill = "#ff6801";
		title.style.fontSize = "75px";
		title.style.fontFamily = "Krabuler";

		this._titlePage = title;

		const buttonBefore = new Core.PIXIComponents.ButtonSprite();
		buttonBefore.spriteConfig = UISprites.sprites.buttonArrow;
		buttonBefore.spriteSheet = spriteSheet;
		buttonBefore.setParent(this);
		buttonBefore.scale.set(-0.8, 0.8)
		buttonBefore.position.set(-this.background.width / 2 + 50, posY);
		buttonBefore.OnButtonEvent.Subscribe(this.OnClickButtonBefore, this);
		this._buttonBefore = buttonBefore;

		const buttonNext = new Core.PIXIComponents.ButtonSprite();
		buttonNext.spriteConfig = UISprites.sprites.buttonArrow;
		buttonNext.spriteSheet = spriteSheet;
		buttonNext.setParent(this);
		buttonNext.scale.set(0.8, 0.8)
		buttonNext.position.set(this.background.width / 2 - 50, posY);
		buttonNext.OnButtonEvent.Subscribe(this.OnClickButtonNext, this);
		this._buttonNext = buttonNext;
	}

	private OnClickButtonBefore(ev: Types.Core.PIXIComponents.EEventType): void {
		if (ev !== Core.PIXIComponents.Button.EEventType.PointerUp) return;
		if (this._buttonTimeout > Date.now()) return;
		const totalPages = this._pages.length;
		const newIndex = this._currentPageIndex <= 0 ? totalPages - 1 : this._currentPageIndex - 1;
		this.ShowPage(newIndex)

		this._buttonTimeout = Date.now() + this._buttonTimeoutLenght;
	}

	private OnClickButtonNext(ev: Types.Core.PIXIComponents.EEventType): void {
		if (ev !== Core.PIXIComponents.Button.EEventType.PointerUp) return;
		if (this._buttonTimeout > Date.now()) return;
		const totalPages = this._pages.length - 1;
		const newIndex = this._currentPageIndex >= totalPages ? 0 : this._currentPageIndex + 1;
		this.ShowPage(newIndex);

		this._buttonTimeout = Date.now() + this._buttonTimeoutLenght;
	}

	private CreatePages(): void {
		const posY = -this.background.height / 2 + 150

		const pageAllTime = new Page();
		pageAllTime.setParent(this);
		pageAllTime.name = "All time";
		pageAllTime.position.set(0, posY);
		pageAllTime.Hide();
		this._pages.push(pageAllTime);
		
		const pageTopMonth = new Page();
		pageTopMonth.setParent(this);
		pageTopMonth.name = "Top of the month";
		pageTopMonth.position.set(0, posY);
		pageTopMonth.Hide();
		this._pages.push(pageTopMonth);
		
		const pageTopDay = new Page();
		pageTopDay.setParent(this);
		pageTopDay.name = "Top of the day";
		pageTopDay.position.set(0, posY);
		pageTopDay.Hide();
		this._pages.push(pageTopDay);

		pageAllTime.OnReady.Subscribe(this.ShowPage, this);
	}

	private CreateButtonClose(spriteSheet: PIXI.LoaderResource): void {		
		const button = new Core.PIXIComponents.ButtonSprite();
		button.setParent(this);
		button.spriteConfig = UISprites.sprites.buttonOk;
		button.spriteSheet = spriteSheet;
		button.zIndex = 2;
		button.scale.set(this.background.scale.x);
		button.position.set(0, this.background.height / 2 - button.height / 2 - 15);

		this.buttonClose = button;
	}

	private CreateHeader(spriteSheet: PIXI.LoaderResource): void {
		const titleBackground = new PIXI.Sprite();
		titleBackground.setParent(this);
		titleBackground.texture = spriteSheet.textures![UISprites.sprites.screenTitleBackground];
		titleBackground.anchor.set(0.5, 0);
		titleBackground.scale.set(this.background.scale.x);
		titleBackground.position.set(0, -this.background.height / 2 + 5);

		const title = new PIXI.Text(Config.Phrases.leaderboardTitle);
		title.setParent(this);
		title.pivot.set(0.5);
		title.scale.set(0.5);
		title.style.fontSize = "75px";
		title.style.fontFamily = "Krabuler";
		title.style.lineHeight = titleBackground.height;
		title.position.set(-title.width / 2, -this.background.height / 2 + 5);
		
		this.titleLabel = title;
	}
}