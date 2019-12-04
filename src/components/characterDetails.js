import React from "react";
import "../index.css";

export class CharacterDetails extends React.Component {
    render() {
        return (
            <div className="character-list">
                {this.props.list.map(lis => this.renderCharacter(lis))}
            </div>
        )
    }
}