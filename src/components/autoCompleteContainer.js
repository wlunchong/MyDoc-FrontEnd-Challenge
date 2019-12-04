import React from "react";
import "../index.css";
import {getCharacterImageURL} from "../services/index";

export class AutoCompleteContainer extends React.Component {

    renderList = (data) => {
        const {onKeywordSelect} = this.props;
        return (
            <div className="result-row" key={data.id} onClick={() => onKeywordSelect(data.name, false)}>
                <div className="character-profile-pic" style={{backgroundImage: `url(${getCharacterImageURL(data)}`}}/>
                <div>{data.name}</div>
            </div>
        )
    }

    render() {
        const {keyword, list} = this.props;
        if (!keyword || !list) {
            return null
        }

        return (
            <div className="auto-complete-container">
                {!list.length ?
                    <div className="error-msg">No Character found. Please try another search</div> :
                    list.map(l => this.renderList(l))
                }
            </div>
        )
    }
}