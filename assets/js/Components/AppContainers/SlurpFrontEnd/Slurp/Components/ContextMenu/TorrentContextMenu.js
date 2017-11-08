import React from "react";
import {ContextMenu, Item, Separator, IconFont} from 'react-contexify';
import slurp_store from "./../../../store/globalstore"

function onClick(targetNode, ref, data) {
    let state = slurp_store.getState();
    // targetNode refer to the html node on which the menu is triggered
    console.log(targetNode);
    //ref will be the mounted instance of the wrapped component
    //If you wrap more than one component, ref will be an array of ref
    console.log(ref);
    // Additionnal data props passed down to the `Item`
    console.log(data);
}

// create your menu first
export const MyAwesomeMenu = () => (

    <ContextMenu id='menu_id'>
        <Item onClick={onClick}>Start</Item>
        <Item onClick={onClick}>Stop</Item>
        <Item onClick={onClick}>Remove</Item>
        <Separator/>
        <Item>Set Tags</Item>
        <Item>Torrent Details</Item>

    </ContextMenu>
);