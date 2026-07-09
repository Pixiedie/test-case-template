import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonComponent } from "@ui/atoms/button/button.component";
import { HeadingComponent } from "@ui/atoms/heading/heading.component";

@Component({
	selector: "app-home",
	imports: [RouterLink, ButtonComponent, HeadingComponent],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
})
export class HomeComponent {}
