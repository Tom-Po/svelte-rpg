import { writable } from "svelte/store";

let existingIds = [];

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const getRandomMobId = () => {
    const value = Math.floor(getRandomArbitrary(2, 15))
    if (existingIds.includes(value)) {
        existingIds = existingIds.filter(id => id !== value)
        return getRandomMobId()
    }
    existingIds.push(value)
    return value;
}

function getInitialState() {
    return [
        {
            id: getRandomMobId(),
            encounter: {
                name: "Trashmob",
                hp: 100,
                atk: 20,
            },
        },
        {
            id: getRandomMobId(),
            encounter: {
                name: "Other Trashmob",
                hp: 100,
                atk: 20,
            },
        },
        {
            id: getRandomMobId(),
            encounter: {
                name: "Boss",
                hp: 100,
                atk: 20,
            },
        },
    ];
}

function createEventList() {
    const { subscribe, set, update } = writable(getInitialState())
    return {
        subscribe,
        removeEvent: (encounter) => update(events => {
            return events.filter((e) => e.id !== encounter.id);
        }),
        reset: () => set(getInitialState()),
    }
}

export const events = createEventList()