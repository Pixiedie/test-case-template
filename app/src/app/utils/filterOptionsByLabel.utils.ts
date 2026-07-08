const normalize = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');

// Used for a front search
export const filterOptionsByLabel = <T extends { label: string }>(items: T[], query: string): T[] => {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return items;
  }

  return items.filter((item) => normalize(item.label).includes(normalizedQuery));
};
