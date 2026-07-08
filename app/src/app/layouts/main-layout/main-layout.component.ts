import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "@ui/organisms/header/header.component";
import { ThemeService } from "../../core/theme/theme.service";

@Component({
	selector: "app-main-layout",
	imports: [RouterOutlet, HeaderComponent],
	templateUrl: "./main-layout.component.html",
	styleUrl: "./main-layout.component.scss",
})
export class MainLayoutComponent {
	private readonly themeService = inject(ThemeService);

	readonly isLight = this.themeService.isLight;

	toggleTheme(): void {
		this.themeService.toggle();
	}
}
