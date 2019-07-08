import * as React from "react";
import {NavLink} from "react-router-dom";
const {memo} = React;

const Header = () => {
    console.log('🍎')
    return (
        <>
            <NavLink to="/other">other</NavLink><br/>
            <NavLink to="/homePages">homePages</NavLink>
        </>
    )
};

export default memo(Header);
