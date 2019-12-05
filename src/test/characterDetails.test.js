import React from 'react';

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {CharacterDetails} from "../components/characterDetails";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    act(() => {
        render(
            <CharacterDetails character={{
                name: "SpiderMan",
                description: "Spiderman do what spider can",
                thumbnail: {path: "", extension: ""},
                comics: {items: []},
                series: {items: []},
                stories: {items: []},
                urls: [{type: "Details", url: "https://www.google.com"}]
            }} savedCharacters={[]}/>,
            container
        );
    });
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});


it("should show name and description of selected character", () => {
    expect(container.querySelector("[data-test-label='Name']").querySelector(".details").textContent).toBe("SpiderMan");
    expect(container.querySelector("[data-test-label='Description']").querySelector(".details").textContent).toBe("Spiderman do what spider can");
});


it("should render an anchor tag based on URL", () => {
    expect(container.querySelector("[data-test-label='Details']").querySelector("a").getAttribute("href")).toEqual("https://www.google.com");
});

it("should not render when user's information is empty", () => {
    expect(container.querySelector("[data-test-label='comics']")).toBe(null);
});