import React from 'react';

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {AutoCompleteContainer} from "../components/autoCompleteContainer";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("should show error message when list is empty", () => {
    act(() => {
        render(
            <AutoCompleteContainer list={[]}/>,
            container
        );
    });

    const errorMsg = container.querySelector('.error-msg');
    expect(errorMsg).not.toBe(null);
});

it("should render 3 data from list", () => {
    const list = [
        {id: 1, name: "SpiderMan", thumbnail: {path: "path", extension: "jpg"}},
        {id: 2, name: "Venom", thumbnail: {path: "path", extension: "jpg"}},
        {id: 3, name: "SpiderGirl", thumbnail: {path: "path", extension: "jpg"}},
    ];
    act(() => {
        render(
            <AutoCompleteContainer list={list}/>,
            container
        );
    });

    const result = container.querySelectorAll('.result-row').length;
    expect(result).toBe(3);
});
