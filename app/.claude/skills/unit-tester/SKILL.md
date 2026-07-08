---
name: unit-tester
description: use PROACTIVELY - Create unit tests following this Angular project's conventions. Trigger after creating/modifying a component, service, signal store, pipe, or utility. Covers presentational components (inputs/outputs), container components, services, HTTP testing, snapshots, and interaction tests.
---

# Skill: Unit Tester (Angular)

Create or update unit tests following this project's conventions: Angular 19 (standalone components, signals), Jest, `@testing-library/angular`.

## Stack

- **Runner**: Jest (`jest-preset-angular`), run with `npm test`.
- **Rendering**: `@testing-library/angular` via the project helper `@testing/render`.
- **Files**: `*.test.ts`, co-located with the source.
- Data access uses Angular `HttpClient`, tested with `HttpTestingController`.

## When to use this skill

- After creating or modifying a **component, service, pipe, or utility**.
- User asks to **add, update, or fix tests**, or **increase coverage**.

## Location & naming

Tests are co-located with source files, suffix `.test.ts` (NOT `.spec.ts`):

- `theme-toggle.component.ts` → `theme-toggle.component.test.ts`
- `theme.service.ts` → `theme.service.test.ts`
- `format-price.ts` → `format-price.test.ts`

## Describe block convention

Always use the full source path (without extension):

```ts
describe('src/app/ui/atoms/theme-toggle/theme-toggle.component', () => {
  // tests
});
```

## Test naming convention — When/Then

Use the **When/Then** pattern, never "Should":

```ts
// ✅
it('When theme is light then shows the moon icon', () => {});
it('When the button is clicked then emits themeToggle', () => {});
it('When the service returns an error then surfaces the error state', () => {});

// ❌
it('Should show the moon icon', () => {});
```

---

## Testing utilities

### Imports

Everything comes from the single helper `@testing/render` (it re-exports all of `@testing-library/angular` + `userEvent`):

```ts
import {
  renderWithProviders,
  renderForSnap,
  injectService,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing/render';
```

### `renderWithProviders(Component, options)`

Renders a component with the app providers pre-wired. Returns the `@testing-library/angular` `RenderResult` (Promise).

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `inputs` | `object` | — | Signal inputs (props), e.g. `{ isLight: true }` |
| `on` | `object` | — | Output listeners, e.g. `{ themeToggle: jest.fn() }` |
| `withHttp` | `boolean` | `false` | set `true` to add `provideHttpClient` + `provideHttpClientTesting` (mockable HTTP) |
| `withRouter` | `boolean \| Routes` | `false` | `provideRouter` — **required** for any component using `<router-outlet>`, `routerLink`, or `ActivatedRoute` |
| `withAnimations` | `boolean` | `false` | real animations instead of the noop provider |
| `providers` | `Provider[]` | `[]` | extra DI providers |
| `imports` | `Type[]` | — | extra standalone imports (rare) |

### `renderForSnap(Component, options)`

Same options; returns the `container: HTMLElement` for snapshot assertions.

### `injectService(token, options)`

Configures a testing module and returns the injected service instance. Use it to test services/signals directly (the Angular replacement for React's `renderHook`).

```ts
const service = injectService(ThemeService); // add { withHttp: true } if the service calls HttpClient
```

### HTTP mocking — `HttpTestingController`

When `withHttp: true` is set, assert/flush requests via the testing backend:

```ts
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

const httpMock = TestBed.inject(HttpTestingController);
// ... trigger the request ...
const req = httpMock.expectOne('/api/products');
req.flush([{ id: '1' }]);          // respond
httpMock.verify();                 // no outstanding requests (in afterEach)
```

---

## 1. Testing a presentational component (inputs / outputs)

The core DS pattern: an input drives the view, a click emits an output. No service.

```ts
import { fireEvent, renderWithProviders, screen } from '@testing/render';
import { ThemeToggleComponent } from './theme-toggle.component';

describe('src/app/ui/atoms/theme-toggle/theme-toggle.component', () => {
  it('When isLight is true then shows the moon icon and the "go dark" label', async () => {
    await renderWithProviders(ThemeToggleComponent, {
      inputs: { isLight: true },    });

    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).toBe('Passer en mode sombre');
    expect(button.textContent).toContain('🌙');
  });

  it('When the button is clicked then emits themeToggle', async () => {
    const onToggle = jest.fn();

    await renderWithProviders(ThemeToggleComponent, {
      inputs: { isLight: true },
      on: { themeToggle: onToggle },    });

    fireEvent.click(screen.getByRole('button'));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
```

- `inputs` sets signal inputs; `on` binds an output to a spy.
- Prefer `fireEvent` over `userEvent`.

---

## 2. Testing a container component (service + DOM)

Container components inject services. Render with the providers they need; the root-provided services (e.g. `ThemeService`) are auto-available.

```ts
import { fireEvent, renderWithProviders, screen } from '@testing/render';
import { MainLayoutComponent } from './main-layout.component';

describe('src/app/layouts/main-layout/main-layout.component', () => {
  beforeEach(() => {
    // ThemeService reads/writes localStorage → isolate each test
    localStorage.clear();
  });

  it('When the toggle is clicked then switches the theme', async () => {
    await renderWithProviders(MainLayoutComponent, { withRouter: true });

    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).toBe('Passer en mode sombre');

    fireEvent.click(button);

    expect(button.getAttribute('aria-label')).toBe('Passer en mode clair');
  });
});
```

- `withRouter: true` is mandatory here (`<router-outlet>` in the template).
- Clear `localStorage` in `beforeEach` whenever `ThemeService` is involved.

---

## 3. Snapshot tests

```ts
import { renderForSnap } from '@testing/render';
import { HeaderComponent } from './header.component';

describe('src/app/ui/organisms/header/header.component', () => {
  it('When rendered then matches the snapshot', async () => {
    const container = await renderForSnap(HeaderComponent, {
      inputs: { isLight: true },    });

    expect(container).toMatchSnapshot();
  });
});
```

- Snapshots capture the **DOM structure + classes**, not the CSS (styling comes from cascading `var(--…)` tokens).
- Regenerate intentionally with `npm test -- -u`. Commit the `__snapshots__/` files.

---

## 4. Testing a service / signals

Use `injectService`. Read signals by **calling** them (`theme()`), and computed/derived signals too (`isLight()`).

```ts
import { injectService } from '@testing/render';
import { ThemeService } from './theme.service';

describe('src/app/core/theme/theme.service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('When toggle is called then flips the theme signal', () => {
    const service = injectService(ThemeService);

    expect(service.theme()).toBe('light');

    service.toggle();

    expect(service.theme()).toBe('dark');
    expect(service.isLight()).toBe(false);
  });

  it('When a theme is stored then resolves it on init', () => {
    localStorage.setItem('Simplis-theme', 'dark');

    const service = injectService(ThemeService);

    expect(service.theme()).toBe('dark');
  });
});
```

---

## 5. Testing an HTTP data service

```ts
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { injectService } from '@testing/render';
import { ProductService } from './product.service';

describe('src/app/core/products/product.service', () => {
  let httpMock: HttpTestingController;

  afterEach(() => {
    httpMock.verify(); // fail if an unexpected request was made
  });

  it('When getProducts is called then requests the products endpoint', () => {
    const service = injectService(ProductService, { withHttp: true });
    httpMock = TestBed.inject(HttpTestingController);

    const products: unknown[] = [];
    service.getProducts().subscribe((res) => products.push(...res));

    const req = httpMock.expectOne('/api/products');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: '1', name: 'Starter' }]);

    expect(products).toHaveLength(1);
  });

  it('When the request fails then surfaces the error', () => {
    const service = injectService(ProductService, { withHttp: true });
    httpMock = TestBed.inject(HttpTestingController);

    let errored = false;
    service.getProducts().subscribe({ error: () => (errored = true) });

    httpMock.expectOne('/api/products').flush('boom', {
      status: 500,
      statusText: 'Server Error',
    });

    expect(errored).toBe(true);
  });
});
```

---

## 6. Testing a pipe / utility

```ts
import { formatPrice } from './format-price';

describe('src/app/core/utils/format-price', () => {
  it.each([
    { input: 0, expected: '0,00 €' },
    { input: 214.8, expected: '214,80 €' },
    { input: 1000000, expected: '1 000 000,00 €' },
  ])('When input is $input then returns $expected', ({ input, expected }) => {
    expect(formatPrice(input)).toBe(expected);
  });
});
```

---

## Signals — gotchas to remember

- **Read a signal by calling it**: `theme()`, `isLight()`. `theme` alone is the signal function, not the value.
- **Inputs are signals**: in tests, set them with the `inputs` option; in templates they are read as `input()`.
- **Outputs are events, not callbacks**: `output<void>()` emits with `.emit()`. In tests, listen via the `on` option.
- **Derived state is `computed()`**, not a plain field (a field is evaluated once, never reacts).

---

## Cleanup rules

```ts
// localStorage — clear in beforeEach whenever ThemeService (or any storage) is involved
beforeEach(() => {
  localStorage.clear();
});

// HttpTestingController — verify() in afterEach when asserting HTTP
afterEach(() => {
  httpMock.verify();
});

// Spies — every jest.spyOn MUST be restored inline at the end of the test that created it
it('When ... then ...', () => {
  const spy = jest.spyOn(module, 'fn').mockReturnValue(/* … */);
  // ... test body ...
  spy.mockRestore(); // ✅ inline cleanup
});
```

- A clear/reset is **never mandatory** — do not add a `beforeEach`/`afterEach` when nothing's call count is asserted. Many presentational + snapshot tests need no cleanup block at all.
- Prefer targeting a specific mock (`spy.mockRestore()`, `mock.mockClear()`) over `jest.clearAllMocks()`.
- ❌ Never `jest.restoreAllMocks()`.

---

## What to test

- Inputs drive the rendered output (labels, classes, conditional rendering).
- Outputs are emitted on the right interactions (click, submit).
- Container behavior: service wired correctly, DOM reflects state changes.
- Service logic: signals, computed values, state transitions.
- HTTP: correct endpoint/method/params; success and error paths.
- Utilities/pipes: edge cases (null, undefined, empty, boundaries).
- Component snapshots (structure).

## What NOT to test

- Implementation details.
- Third-party/Angular internals.
- CSS/styling (comes from tokens; use e2e for visual checks).
- Console logs.
