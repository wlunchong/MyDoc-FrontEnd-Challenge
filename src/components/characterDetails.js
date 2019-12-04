import React from "react";
import "../index.css";
import {getCharacterImageURL} from "../services";
import {connect} from "react-redux";
import {saveCharacterAction, unsaveCharacterAction} from "../actions/viewSavedAction";

// Component that show detail of character
//
// Props
// =====
// character: Obj. Contain details of character such as id, name, picture, comics...
// close: Func. Function that callback when user close current component

class CharacterDetails extends React.Component {
    renderDetailsByLabel = ({label, value, isLink}, index) => {

        const renderExternalLink = (link) => {
            return <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        };

        const renderArrayList = () => {
            return (
                <ul>
                    {value.map((v,i) =>
                        <li key={`${v.name}-${i}`}>
                            <div>{v.name}</div>
                            {renderExternalLink(v['resourceURI'])}
                        </li>
                    )}
                </ul>
            )
        };

        return (
            <div key={`${label}-${index}`}>
                <div className="label">{label}</div>
                <div className="details">
                    {Array.isArray(value) ? renderArrayList() :
                        isLink ? renderExternalLink(value) :
                        (value || '-' )}
                </div>
            </div>
        )
    };

    render() {
        const {character, close, savedCharacters, saveCharacterAction, unsaveCharacterAction} = this.props;
        // select and format label that should show in details page
        const details = [
            {label: "Name", value: character.name},
            {label: "Description", value: character.description},
            {label: "Comics", value: character.comics.items},
            {label: "Series", value: character.series.items},
            {label: "Stories", value: character.stories.items},
        ];

        if (character.urls && character.urls.length) {
            character.urls.forEach(url => {
                details.push({label: url.type, value: url.url, isLink: true})
            })
        }

        // boolean to indicate current character is saved by user before
        const isCharacterSaved = savedCharacters.find(sCharacter => sCharacter.id === character.id);

        return (
            <div className="overlay-container">
                <div className="details-container">
                    <button className="btn-close" onClick={() => close()}>x</button>
                    <div className="character-profile-pic" style={{backgroundImage: `url(${getCharacterImageURL(character)})`}}/>
                    {details
                        .filter(d => d.value && !!d.value.length ? d : false)
                        .map((d, index) => this.renderDetailsByLabel(d, index))}
                    <div className="text-center">
                        <button className="btn-save" onClick={() => isCharacterSaved ? unsaveCharacterAction(character) : saveCharacterAction(character)}>
                            {isCharacterSaved ? "Unsave" : "Save"}  Character
                        </button>
                    </div>
                </div>
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
    {saveCharacterAction, unsaveCharacterAction}
)(CharacterDetails);