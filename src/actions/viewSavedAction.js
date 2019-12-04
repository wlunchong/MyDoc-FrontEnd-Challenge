import {SAVE_CHARACTER_SUCCESSFULLY, UNSAVE_CHARACTER_SUCCESSFULLY} from "./actionType";

export const saveCharacterAction = character => ({
    type: SAVE_CHARACTER_SUCCESSFULLY,
    payload: character
});

export const unsaveCharacterAction = character => ({
    type: UNSAVE_CHARACTER_SUCCESSFULLY,
    payload: character
});