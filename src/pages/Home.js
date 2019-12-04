import React from "react";
import { debounce } from 'throttle-debounce';
import {Link} from "react-router-dom";

import "../index.css";
import {CharacterList} from "../components/characterList";
import {AutoCompleteContainer} from "../components/autoCompleteContainer";
import CharacterDetails from "../components/characterDetails";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getCharactersAPI: "https://gateway.marvel.com/v1/public/characters?ts=1565922410&apikey=6a038473ffd6407750a2ea27115f7e7c&hash=1492df65a88ef98a1a279719fe509f72",
            keyword: "",
            loading: false,
            showAutoComplete: true,
            currentPageNo: 1,
            selectedCharacter: null
        };

        // debounce search, fire when user stop typing for 300ms
        this.debouncedSearchTerm = debounce(500, this.searchCharacter);
    }

    setKeywordAndList = (keyword = "", list = null) => {
        this.setState({keyword, list, currentPageNo: 1})
    };

    toggleLoading = (loading = !this.state.loading) => {
        this.setState({loading})
    };

    getCharactersList = (link, keyword) => {
        return new Promise(async resolve => {
            try {
                this.toggleLoading(true);

                const resp = await fetch(link);
                const respToJSON = await resp.json();

                this.toggleLoading(false)

                resolve({data: respToJSON.data.results, keyWordFromCurrentResult: keyword})
            } catch (e) {
                resolve({data: [], keyWordFromCurrentResult: ""})
            }

        })
    };

    searchCharacter = async () => {
        const {keyword} = this.state;
        if (!keyword) {
            this.setKeywordAndList();
            return
        };

        const {data, keyWordFromCurrentResult} = await this.getCharactersList(`${this.state.getCharactersAPI}&limit=18&nameStartsWith=${keyword}`, keyword);
        if (keyWordFromCurrentResult !== this.state.keyword) {
            return
        };

        this.setKeywordAndList(keyword, data)
    };

    onSearchInputChange = (name, showAutoComplete = true) => {
        this.setState({
            keyword: name,
            showAutoComplete
        }, () => {
            this.debouncedSearchTerm()
        })
    };

    getCurrentList = (list) => {
       const {currentPageNo} = this.state;
       let startIndex = 0;
       let endIndex = 0;
       if (currentPageNo > 1) {
           startIndex = (currentPageNo - 1) * 3
       }

       endIndex = startIndex + 3;

        return list.slice(startIndex, endIndex)
    };

    goToPage = (page) => {
        this.setState({currentPageNo: page})
    };

    toggleCharacterDetails = (selectedCharacter) => {
        this.setState({
            selectedCharacter
        })
    };

    onFormSubmit = (e) => {
        e.preventDefault();
       this.setState({
           showAutoComplete: false
       }, () => this.searchCharacter())
    };

    closeAutoComplete = () => {
        if (this.state.showAutoComplete) {
            this.setState({
                showAutoComplete: false
            })
        }
    };

    render() {
        const {keyword, list, loading, showAutoComplete, currentPageNo, selectedCharacter} = this.state;
        return (
            <div className="home container" onClick={this.closeAutoComplete}>
                <Link to="/saved">
                    <button className="btn-save btn-nav">
                        View Saved
                    </button>
                </Link>
                <form onSubmit={this.onFormSubmit}>
                    <div className="search-box-row">
                        <input type="text"
                               value={keyword}
                               className="search-input"
                               placeholder="Search Your Hero"
                               onChange={(e) => this.onSearchInputChange(e.target.value)}/>
                        {!loading && showAutoComplete && <AutoCompleteContainer keyword={keyword} list={list} onKeywordSelect={this.onSearchInputChange}/>}
                    </div>
                </form>
                <div className="character-list-container">
                    {list && !loading && <CharacterList list={this.getCurrentList(list)} onCharacterSelect={this.toggleCharacterDetails}/>}
                    {loading && <div className="loading">Loading...</div>}
                </div>
                {!loading &&
                <div className="buttons-row">
                    {currentPageNo > 1 && <button onClick={() => this.goToPage(currentPageNo-1)}>Prev</button>}
                    {list && currentPageNo * 3 < list.length && <button onClick={() => this.goToPage(currentPageNo + 1)}>Next</button>}
                </div>}
                {selectedCharacter &&
                <CharacterDetails
                    character={selectedCharacter}
                    onCharacterSelect={this.toggleCharacterDetails}/>}
            </div>
        );
    }
}