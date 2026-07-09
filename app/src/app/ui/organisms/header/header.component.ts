import { Component, input, output } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
	ThemeToggleComponent,
	type ThemeToggleComponentProps,
} from "@ui/atoms/theme-toggle/theme-toggle.component";

@Component({
	selector: "app-header",
	imports: [ThemeToggleComponent, RouterLink],
	templateUrl: "./header.component.html",
	styleUrl: "./header.component.scss",
})
export class HeaderComponent {
	isLight = input.required<ThemeToggleComponentProps["isLight"]>();

	themeToggle = output<void>();
}
