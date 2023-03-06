import React from "react";
import { store } from "redux/store"

const getState = () => store.getState()

const JSONData = () => {
    const currentState = {...getState()}
    const style = {
        padding: '4rem',
        overflow: 'scroll',
        width: '100%',
        height: '100%',
        gridColumn: '1/-1',
        fontSize: '1.5rem'
    }
    const filteredState = React.useMemo(() => {
        return currentState.auth
    }, [currentState])

    return (
        <div className="box" style={style}>
            {/* Pre Tag must be used */}
            <pre> 
                {JSON.stringify(filteredState, undefined, 5)}
            </pre>
        </div>
    )
}

export default JSONData