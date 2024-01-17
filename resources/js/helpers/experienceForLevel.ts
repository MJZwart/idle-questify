import {BASE_EXP, EXP_ADDITIVE} from 'assets/variables/progress';

export const experienceCapForLevel = (level: number): number => {
    const baseExp = BASE_EXP;
    const cap = baseExp + EXP_ADDITIVE * ((level * (level + 1) * (2 * level + 1)) / 6);
    return cap;
};
