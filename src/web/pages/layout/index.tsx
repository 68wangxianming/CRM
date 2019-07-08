import * as React from "react";
import Footer from "@components/footer/index";
import Header from "@components/header/index";
import './index.css'
const {memo} = React;

const Head = memo(Header)
const Index = (props: { children: React.ReactNode; }) => {

    return (
        <>
            <Head/>
            <section>
                {props.children}
            </section>
            <Footer/>
        </>
    )
};

export default memo(Index);
