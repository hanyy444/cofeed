import './user-detail.component.scss'

const UserDetail = ({ icon, text }) => {
    return ( 
        <div className= "user-detail" data-testid="user-detail">
            <span>{icon}</span>
            <p> {text} </p>
        </div>
    )
}

export default UserDetail;

