export const cx = (
  ...classNames: (string | boolean | undefined | null | number)[]
) => classNames.filter((className) => className).join(' ')
