import { filterOptionsByLabel } from './filterOptionsByLabel.utils';

const OPTIONS = [
  { value: 'a', label: 'Sociologue' },
  { value: 'b', label: 'Créations de décorations' },
  { value: 'c', label: 'Guide touristique' },
];

describe('src/app/utils/filterOptionsByLabel.utils', () => {
  it.each([
    { query: '', expected: OPTIONS },
    { query: 'soc', expected: [OPTIONS[0]] },
    { query: 'SOCIO', expected: [OPTIONS[0]] },
    { query: 'creations', expected: [OPTIONS[1]] },
    { query: 'zzz', expected: [] },
  ])('When query is "$query" then returns the expected options', ({ query, expected }) => {
    expect(filterOptionsByLabel(OPTIONS, query)).toEqual(expected);
  });
});
