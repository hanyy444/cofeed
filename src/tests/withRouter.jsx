import { Router, Route, Routes } from "react-router-dom"
import { createBrowserHistory } from "@remix-run/router"

const history = createBrowserHistory()

const withRouter = (children, opts = {}) => {
    const { path, route } = opts

    if (path) {
        history.push(path)
    }

    return (
        <Router location={history.location} navigator={history}>
            <Routes>
                <Route
                    path={route || path || '/'}
                    element={children}
                />
            </Routes>
        </Router>
    )
}

export default withRouter