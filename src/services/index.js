export const getCharacterImageURL = (character) => {
    if (!character) return ""

    return `${character.thumbnail.path}.${character.thumbnail.extension}`
};