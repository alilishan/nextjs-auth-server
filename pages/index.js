import Head from 'next/head';
import React from 'react';

import OunchLogo from '../assets/ounch-logo.svg';

const Home = () => {
    return (
        <div>
            <Head>
                <title>Auth Server</title>
            </Head>
            <div className="container text-center py-6">
                <h1 className="display-6">Auth Server</h1>
                <p className="lead"></p>

                <hr className="dashed"/>

                <div className="svg-icon">
                    <OunchLogo />
                </div>
            </div>
        </div>
    );
}
 
export default Home;