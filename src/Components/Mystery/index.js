import React from 'react';

const Mystery = () => {
    return (
        <div>
            <h2>Mystery Component</h2>
            <p>This is the Mystery component. Its content is a mystery!</p>
        </div>
    );
}

export default React.memo(Mystery);