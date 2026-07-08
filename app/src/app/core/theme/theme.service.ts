import { DOCUMENT } from "@angular/common";
import { computed, effect, Injectable, inject, signal } from "@angular/core";

export type Theme = "light" | "dark";

const STORAGE_KEY = "Simplis-theme";

@Injectable({ providedIn: "root" })
export class ThemeService {
	private readonly document = inject(DOCUMENT);

	readonly theme = signal<Theme>(this.resolveInitialTheme());
	readonly isLight = computed(() => this.theme() === "light");

	constructor() {
		effect(() => {
			const theme = this.theme();
			this.document.documentElement.setAttribute("data-theme", theme);
			this.storage?.setItem(STORAGE_KEY, theme);
		});
	}

	toggle(): void {
		this.theme.update((current) => (current === "dark" ? "light" : "dark"));
	}

	setTheme(theme: Theme): void {
		this.theme.set(theme);
	}

	/** Priority: stored choice > system preference > light. */
	private resolveInitialTheme(): Theme {
		const stored = this.storage?.getItem(STORAGE_KEY);
		if (stored === "light" || stored === "dark") {
			return stored;
		}

		const prefersDark =
			this.document.defaultView?.matchMedia("(prefers-color-scheme: dark)")
				.matches ?? false;

		return prefersDark ? "dark" : "light";
	}

	private get storage(): Storage | null {
		try {
			return this.document.defaultView?.localStorage ?? null;
		} catch {
			// Strict private mode / access denied: degrade gracefully.
			return null;
		}
	}
}
