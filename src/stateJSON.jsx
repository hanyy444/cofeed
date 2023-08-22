import React from "react";
import { store } from "redux/store"

const getState = () => store.getState()

const JSONData = () => {
    const currentState = {...getState()}
    const style = {
        padding: '4rem',
        overflow: 'scroll',
        width: '100vw',
        height: '100vh',
        gridColumn: '1/-1',
        fontSize: '1.5rem',
        zIndex: '200',
        gridRow: '1/-1',
    }
    const filteredState = React.useMemo(() => {
        return currentState.users
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