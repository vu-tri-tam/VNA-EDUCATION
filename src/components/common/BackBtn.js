import React from 'react'
import { useHistory } from 'react-router';

const BackBtn = () => {
    
    let history = useHistory();

    return (
        <button type="button" className="btn btn-primary mb-3" onClick={ () => history.goBack() }>
            Quay lại
        </button>
    )
}

export default BackBtn
