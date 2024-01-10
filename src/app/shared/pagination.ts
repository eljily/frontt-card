import { RulerFactoryOption } from './ruler-factory-option.enum';

export const ruler = (
  currentIndex: number,
  maxPages: number,
  rulerLength: number,
): number[] => {
  const array = new Array(rulerLength).fill(null);
  const min = Math.floor(rulerLength / 2);

  return array.map((_, index) =>
    rulerFactory(currentIndex, index, min, maxPages, rulerLength),
  );
};

const rulerOption = (
  currentIndex: number,
  min: number,
  maxPages: number,
): RulerFactoryOption => {
  return currentIndex <= min
    ? RulerFactoryOption.Start
    : currentIndex >= maxPages - min
    ? RulerFactoryOption.End
    : RulerFactoryOption.Default;
};

const rulerFactory = (
  currentIndex: number,
  index: number,
  min: number,
  maxPages: number,
  rulerLength: number,
): number => {
  const factory = {
    [RulerFactoryOption.Start]: () => index + 1,
    [RulerFactoryOption.End]: () => maxPages - rulerLength + index + 1,
    [RulerFactoryOption.Default]: () => currentIndex + index - min,
  };

  return factory[rulerOption(currentIndex, min, maxPages)]();
};
export const allowNavigation = (
  pageNumber: number,
  index: number,
  maxPages: number,
): boolean => {
  return pageNumber !== index && pageNumber > -1 && pageNumber + 1 <= maxPages;
};
