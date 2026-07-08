import { Component, input, output } from "@angular/core";

export type ThemeToggleComponentProps = {
	isLight: boolean;
};

@Component({
	selector: "app-theme-toggle",
	imports: [],
	templateUrl: "./theme-toggle.component.html",
	styleUrl: "./theme-toggle.component.scss",
})
export class ThemeToggleComponent {
	isLight = input.required<ThemeToggleComponentProps["isLight"]>();

	themeToggle = output<void>();
}
