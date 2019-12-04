import React from "react";
import "../index.css";

export class CharacterList extends React.Component {
    renderCharacter = (character) => {
        return (
            <div key={character.id} className="character-container" style={{backgroundImage: `url(${character.thumbnail.path}.${character.thumbnail.extension})`}}>
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