import './user-detail.component.scss'

const UserDetail = ({ icon, text }) => {
    return ( 
        <div className= "user-detail" id="user-detail" data-testid="user-detail">
                {icon}
                <p> {text} </p>
        </div>
    )
}

export default UserDetail;

