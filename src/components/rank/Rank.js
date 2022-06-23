import React from 'react';

const Rank = (username, entries) => {
    return (
        <div>
            <div className='white f3'>
                {`${username.username}, your current entry count is...`}
            </div>
            <div className='white f1'>
                {username.entries}
            </div>
        </div>
    )
}

export default Rank;