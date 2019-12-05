import React from 'react';

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {CharacterList} from "../components/characterList";

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

it("should show custom error message when list is empty", () => {
    act(() => {
        render(
            <CharacterList list={[]} errorMsg="Custom Error Message"/>,
            container
        );
    });

    const errorMsg = container.querySelector('div');
    expect(errorMsg.textContent).toEqual("Custom Error Message");
});

it("should show delete options", () => {
    act(() => {
        render(
            <CharacterList list={[
                {id: 1, name: "SpiderMan", thumbnail: {path: "", extension: ""}},
                {id: 2, name: "Venom", thumbnail: {path: "", extension: ""}},
                {id:3, ame: "SpiderGirl", thumbnail: {path: "", extension: ""}}
            ]}  showDelete/>,
            container
        );
    });

    const deleteOverlay = container.querySelector('.delete-overlay');
    expect(deleteOverlay).not.toBe(null)
});

it("should render 3 characters", () => {
    act(() => {
        render(
            <CharacterList list={[
                {id: 1, name: "SpiderMan", thumbnail: {path: "", extension: ""}},
                {id: 2, name: "Venom", thumbnail: {path: "", extension: ""}},
                {id:3, name: "SpiderGirl", thumbnail: {path: "", extension: ""}}
            ]} />,
            container
        );
    });

    const result = container.querySelectorAll('.character-container').length;
    expect(result).toBe(3);
});
