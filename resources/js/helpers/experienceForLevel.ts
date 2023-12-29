export const experienceCapForLevel = (level: number): number => {
    const baseExp = 950;
    const cap = baseExp + 50 * ((level * (level + 1) * (2 * level + 1)) / 6);
    return cap;
};
