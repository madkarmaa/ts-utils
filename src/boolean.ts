declare global {
    interface BooleanConstructor {
        random(chance?: number): boolean;
    }
}

Boolean.random = (chance: number = 50): boolean => {
    chance = Math.min(Math.max(chance, 0), 100);
    return Math.random() < chance / 100;
};

export type __make_module = undefined;
