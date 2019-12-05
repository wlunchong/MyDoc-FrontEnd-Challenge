import React from "react";
import "../index.css";
import {getCharacterImageURL} from "../services";

// Component that show list of character
// Props
// =====
// list: Array. List of characters
// onCharacterSelect: Func.  Callback when user click on character.
// showDelete: Boolean. Whether to show delete option or not

export class CharacterList extends React.Component {

    // function to render character
    renderCharacter = (character) => {
        const {onCharacterSelect, showDelete} = this.props;

        return (
            <div key={character.id}
                 onClick={() => onCharacterSelect(character)}
                 className="character-container"
                 style={{backgroundImage: `url(${getCharacterImageURL(character)}`}}>
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