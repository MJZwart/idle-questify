export const randomBetween = (min: number, max: number): number => {
    return Math.random() * (max - min + 1) + min;
};

export const randomBetweenSmall = (min: number, max: number): number => {
    return Math.random() * max + min;
};

export const roundToDecimals = (num: number, decimals: number) => {
    return parseFloat(num.toFixed(decimals));
};

const numberNames = [
    'million',
    'billion',
    'trillion',
    'quadrillion',
    'quintillion',
    'sextillion',
    'septillion',
    'octillion',
    'nonillio',
    'decillion',
    'tredecillion',
    'quattordecillion',
];
const numberShorthands = ['M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UnDc', 'DuDc', 'TrDc', 'QtDc'];

let shorthand = -1;

export function parseBigNumbers(number: number | string | undefined, longNames = false, decimals = 2): string {
    if (number === undefined) return '';
    let nrCopy = typeof number === 'string' ? parseInt(number) : number;
    if (nrCopy < 1000000) return applyInterpunction(nrCopy.toFixed(decimals));
    nrCopy = reduceToThreeDigits(nrCopy);
    const finalNumber = applyShorthand(reduceToDecimals(nrCopy, decimals), shorthand, longNames);
    shorthand = -1;
    return finalNumber;
}

function reduceToThreeDigits(number: number) {
    let nrCopy = number;
    while (shorthand < numberShorthands.length) {
        if (nrCopy / 1000 > 0.99) {
            nrCopy = nrCopy / 1000;
            shorthand++;
            continue;
        }
        return nrCopy;
    }
    return nrCopy;
}

function reduceToDecimals(number: number, decimals: number) {
    return (Math.floor(number * 100) / 100).toFixed(decimals);
}

function applyShorthand(number: string, shorthandIdx: number, longNames = false) {
    if (shorthandIdx < 0) return `${number}`;
    if (longNames) return `${number} ${numberNames[shorthandIdx]}`;
    return `${number}${numberShorthands[shorthandIdx]}`;
}

export function applyInterpunction(number: number | string) {
    let nrString = typeof number === 'number' ? number.toString() : number;
    const pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(nrString)) {
        nrString = nrString.replace(pattern, '$1,$2');
    }
    return nrString;
}
