import React from "react";
import "../index.css";

export class CharacterList extends React.Component {

    renderCharacter = (character) => {
        const {onCharacterSelect, showDelete} = this.props;

        return (
            <div key={character.id}
                 onClick={() => onCharacterSelect(character)}
                 className="character-container"
                 style={{backgroundImage: `url(${character.thumbnail.path}.${character.thumbnail.extension})`}}>
                {showDelete &&
                    <div className="delete-overlay">Delete</div>
                }
                <div className="name">{character.name}</div>
            </div>
        )
    };

    render() {
        const {list, errorMsg} = this.props;
        if (!list.length) {
            return (
                <div>
                    {errorMsg || "No Character available" }
                </div>
            )
        }

        return (
            <div className="character-list">
                {this.props.list.map(lis => this.renderCharacter(lis))}
            </div>
        )
    }
}