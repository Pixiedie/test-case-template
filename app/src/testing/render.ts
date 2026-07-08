import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import type { EnvironmentProviders, Provider, ProviderToken, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter, type Routes } from '@angular/router';
import { render as tlRender, type RenderComponentOptions, type RenderResult } from '@testing-library/angular';

export * from '@testing-library/angular';
export { default as userEvent } from '@testing-library/user-event';

export interface ProviderOptions {
  withHttp?: boolean;
  withRouter?: boolean | Routes;
  withAnimations?: boolean;
}

function buildProviders(options: ProviderOptions): (Provider | EnvironmentProviders)[] {
  const { withHttp = false, withRouter = false, withAnimations = false } = options;
  const providers: (Provider | EnvironmentProviders)[] = [];

  if (withHttp) {
    providers.push(provideHttpClient(), provideHttpClientTesting());
  }
  if (withRouter) {
    providers.push(provideRouter(Array.isArray(withRouter) ? withRouter : []));
  }
  providers.push(withAnimations ? provideAnimations() : provideNoopAnimations());

  return providers;
}

export function renderWithProviders<T>(
  component: Type<T>,
  options: RenderComponentOptions<T> & ProviderOptions = {}
): Promise<RenderResult<T>> {
  const { withHttp, withRouter, withAnimations, providers = [], ...rtlOptions } = options;

  return tlRender(component, {
    ...rtlOptions,
    providers: [...buildProviders({ withHttp, withRouter, withAnimations }), ...providers],
  });
}

export async function renderForSnap<T>(
  component: Type<T>,
  options: RenderComponentOptions<T> & ProviderOptions = {}
): Promise<Element> {
  const { container } = await renderWithProviders(component, options);
  return container;
}

export function injectService<T>(token: ProviderToken<T>, options: ProviderOptions = {}): T {
  TestBed.configureTestingModule({ providers: buildProviders(options) });
  return TestBed.inject(token);
}
