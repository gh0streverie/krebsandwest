import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from '../Nav';
import Mystery from '../Mystery';

const SiteRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={Nav} />
                <Route path="/mystery" Component={Mystery} />
            </Routes>
        </Router>
    );
}

export default React.memo(SiteRouter);