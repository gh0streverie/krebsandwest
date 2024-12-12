import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from '../Nav';
import ImageUploader from '../ImageUploader';
import Pictures from '../Pictures';

const SiteRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={Nav} />
                <Route path="/photos" Component={ImageUploader} />
                <Route path="/pictures" Component={Pictures} />
            </Routes>
        </Router>
    );
}

export default React.memo(SiteRouter);