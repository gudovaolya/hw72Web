import React, {Fragment} from 'react';
import Header from '../Header/Header';

const Layout = (props) => (
    <Fragment>
        <div className="wrapper">
            <Header />
            <main className="content container">
                {props.children}
            </main>
        </div>
    </Fragment>
);

export default Layout;