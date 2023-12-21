type Enemy = {
  id: number;
  name: string;
  attack: number;
  defence: number;
};

export const enemies: Enemy[] = [
  {
    id: 1,
    name: "First enemy",
    attack: 1,
    defence: 1,
  },
  {
    id: 2,
    name: "Second enemy",
    attack: 1.5,
    defence: 1.5,
  },
  {
    id: 3,
    name: "Third enemy",
    attack: 2,
    defence: 2.5,
  },
  {
    id: 4,
    name: "Fourth enemy",
    attack: 5,
    defence: 3.5,
  },
  {
    id: 5,
    name: "Fifth enemy",
    attack: 7,
    defence: 7,
  },
  {
    id: 6,
    name: "Sixth enemy",
    attack: 10,
    defence: 8,
  },
];
