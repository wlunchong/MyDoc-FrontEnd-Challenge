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
            getCharactersAPI: "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=2daa9eccd0b8234f9bcf6bdddfb59fa6&hash=6a48ab1f9189be12c854d318c422ae54",
            keyword: "",
            loading: false,
            showAutoComplete: true,
            currentPageNo: 1,
            selectedCharacter: null
        };

        // debounce search, fire when user stop typing for 300ms
        this.debouncedSearchTerm = debounce(500, this.searchCharacter);
    }

    // set keyword and result list
    setKeywordAndList = (keyword = "", list = null) => {
        this.setState({keyword, list, currentPageNo: 1})
    };

    // show or hide loading
    toggleLoading = (loading = !this.state.loading) => {
        this.setState({loading})
    };

    // promise function to call Marvel API by passing URL and keyword
    // keyword will be return with data to compare whether keyword is latest
    getCharactersList = (link, keyword) => {
        return new Promise(async (resolve, reject) => {
                this.toggleLoading(true);

                const resp = await fetch(link);
                const respToJSON = await resp.json();

                this.toggleLoading(false)

                if (resp.ok) {
                    resolve({data: respToJSON.data.results, keyWordFromCurrentResult: keyword})
                } else {
                    reject(respToJSON.message)
                }
        })
    };

    // function to check keyword and update relevant data conditionally
    searchCharacter = async () => {
        try {
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
        } catch (e) {
            alert(e)
        }

    };

    // onChangeEvent from search input
    onSearchInputChange = (name, showAutoComplete = true) => {
        this.setState({
            keyword: name,
            showAutoComplete
        }, () => {
            this.debouncedSearchTerm()
        })
    };

    // function to get result by pageNo
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

    // function to go to either next or prev page
    goToPage = (page) => {
        this.setState({currentPageNo: page})
    };

    // show or hide character detail container
    toggleCharacterDetails = (selectedCharacter) => {
        this.setState({
            selectedCharacter
        })
    };

    // form submit event. Allow user to perform instant search by click enter button
    onFormSubmit = (e) => {
        e.preventDefault();
       this.setState({
           showAutoComplete: false
       }, () => this.searchCharacter())
    };

    // close auto complete container when user click anywhere of page
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
                        {!loading && showAutoComplete && <AutoCompleteContainer list={list} onKeywordSelect={this.onSearchInputChange}/>}
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
                    close={this.toggleCharacterDetails}/>}
            </div>
        );
    }
}