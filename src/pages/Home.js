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
            results: null,
            currentPageNo: 1,
            selectedCharacter: null
        };

        // debounce search, fire when user stop typing for 300ms
        this.debouncedSearchTerm = debounce(300, this.searchCharacter);
    }

    setKeywordAndList = (keyword = "", list = null) => {
        this.setState({keyword, list, currentPageNo: 1})
    };

    toggleLoading = (loading = !this.state.loading) => {
        this.setState({loading})
    };

    getCharactersList = (link) => {
        return new Promise(async resolve => {
            try {
                this.toggleLoading(true);

                const resp = await fetch(link);
                const respToJSON = await resp.json();

                this.toggleLoading(false)

                resolve(respToJSON.data.results)
            } catch (e) {
                resolve([])
            }

        })
    };

    searchCharacter = async (value = this.state.keyword, shouldCloseAutoComplete = false) => {
        if (!value) {
            this.setKeywordAndList();
            return
        };

        const keyword = typeof(value) === "object" ? value.name : value;

        if (shouldCloseAutoComplete) {
            this.setState({
                showAutoComplete: false
            })
        } else if (!this.state.showAutoComplete && !shouldCloseAutoComplete) {
            this.setState({
                showAutoComplete: true
            })
        }

        const resp = await this.getCharactersList(`${this.state.getCharactersAPI}&limit=18&nameStartsWith=${keyword}`);
        this.setKeywordAndList(keyword, resp)

        if (shouldCloseAutoComplete) {
            this.setState({results: resp})
        }
    };

    onSearchInputChange = (event) => {
        this.setState({
            keyword: event.target.value
        }, () => {
            this.debouncedSearchTerm()
        })
    };

    getResult = (results) => {
       const {currentPageNo} = this.state;
       let startIndex = 0;
       let endIndex = 0;
       if (currentPageNo > 1) {
           startIndex = (currentPageNo - 1) * 3
       }

       endIndex = startIndex + 3

        return results.slice(startIndex, endIndex)
    };

    goToPage = (page) => {
        this.setState({currentPageNo: page})
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        this.searchCharacter(this.state.keyword, true)
    };

    toggleCharacterDetails = (selectedCharacter) => {
        this.setState({
            selectedCharacter
        })
    };


    render() {
        const {keyword, list, loading, showAutoComplete, results, currentPageNo, selectedCharacter} = this.state;
        return (
            <div className="home container">
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
                               onChange={this.onSearchInputChange}/>
                        {!loading && showAutoComplete && <AutoCompleteContainer keyword={keyword} list={list} onKeywordSelect={this.searchCharacter}/>}
                    </div>
                </form>
                {results && <CharacterList list={this.getResult(results)} onCharacterSelect={this.toggleCharacterDetails}/>}
                    <div className="buttons-row">
                        {currentPageNo > 1 && <button onClick={() => this.goToPage(currentPageNo-1)}>Prev</button>}
                        {results && currentPageNo * 3 < results.length && <button onClick={() => this.goToPage(currentPageNo + 1)}>Next</button>}
                    </div>
                {selectedCharacter &&
                <CharacterDetails
                    character={selectedCharacter}
                    onCharacterSelect={this.toggleCharacterDetails}/>}
            </div>
        );
    }
}