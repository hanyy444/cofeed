import './logo.component.scss'

const Logo = ({ goHome }) => {
    return ( 
        <div className= "logo" id="logo" data-testid="logo" onClick={goHome}>
            <h1 className="logo__text">Cofeed</h1>
        </div>
    )
}

export default Logo;

