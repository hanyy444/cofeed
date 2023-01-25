import './heading-4.component.scss'

const HeadingFour = ({ children }) => {
    return (
        <h4 className='heading-4' data-testid="heading-4">{children}</h4>
    )
}

export default HeadingFour