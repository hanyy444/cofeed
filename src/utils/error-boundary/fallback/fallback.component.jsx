import './fallback.component.scss'


function errorController(error){
    switch (error?.response?.status){
        case 400: case 500: case 404:
            const { message, status } = error.response.data || error.response.data.error
            return { message, status }
        default:
            return { message: error.message, status: 'failure' }
    }
}


const Fallback = ({ error, resetErrorBoundary}) => {
    const _error = errorController(error)
    return (
        <div className="fallback">
            <p className="fallback__status">Something went wrong! {error.status}</p>
            <span className="fallback__message">{_error.message}</span>
            <button className="fallback__btn" onClick={ () => {
                resetErrorBoundary()
            }}>Try again</button>
        </div>
    )
}

export default Fallback;