export const randomBetween = (min: number, max: number): number => {
    return Math.random() * (max - min + 1) + min;
};

export const randomBetweenSmall = (min: number, max: number): number => {
    return Math.random() * max + min;
};

export const roundToDecimals = (num: number, decimals: number) => {
    return parseFloat(num.toFixed(decimals));
};
