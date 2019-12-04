import React from "react";
import "../index.css";
import {connect} from "react-redux";

import {CharacterList} from "../components/characterList";
import { unsaveCharacterAction} from "../actions/viewSavedAction";
import {Link} from "react-router-dom";

class ViewSaved extends React.Component {
    // function to delete character
    deleteCharacter = (character) => {
        const res = window.confirm(`Are you sure you want to delete ${character.name}?`);
        res && this.props.unsaveCharacterAction(character);
    };

    render() {
        const {savedCharacters} = this.props;
        return (
            <div className="view-saved container">
                <Link to="/">
                    <button className="btn-save btn-nav btn-home">
                        Home
                    </button>
                </Link>
                <CharacterList list={savedCharacters} onCharacterSelect={this.deleteCharacter} showDelete/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        savedCharacters: state.favourite.savedCharacters
    }
};

export default connect(
    mapStateToProps,
    {unsaveCharacterAction}
)(ViewSaved);