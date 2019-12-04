import { combineReducers } from "redux";
import {SAVE_CHARACTER_SUCCESSFULLY, UNSAVE_CHARACTER_SUCCESSFULLY} from "../actions/actionType";

const initialState = {savedCharacters: []}
const favourite = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_CHARACTER_SUCCESSFULLY:
            return {
                ...state,
                savedCharacters: [...state.savedCharacters, action.payload]
            };
        case UNSAVE_CHARACTER_SUCCESSFULLY:
            return {
                ...state,
                savedCharacters: [...state.savedCharacters.filter(character => character.id !== action.payload.id)]
            };
        default: {
            return state;
        }
    }
};


export default combineReducers({ favourite });
