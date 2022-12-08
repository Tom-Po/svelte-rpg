import { writable } from "svelte/store";

const defaultCharacter = {
    name: 'My store character name',
    hp: 100,
    baseHp: 100,
    position: 0,
    oldPosition: 0,
    alive: true,
    explored: [0]
}

function createCharacter() {
    const { subscribe, set, update } = writable(defaultCharacter)
    return {
        subscribe,
        takeDamage: (damage) => update(character => {
            const newHp = character.hp - damage;
            const alive = newHp > 0;
            return {
                ...character,
                hp: newHp > 0 ? newHp : 0,
                alive
            }
        }),
        move: (position) => update(character => {
            return {
                ...character,
                position,
                explored: [...character.explored, position]
            }
        }),
        setRefPosition: (position) => update(character => {
            return {
                ...character,
                oldPosition: position,
            }
        }),
        reset: () => set(defaultCharacter),
    }
}

export const character = createCharacter()