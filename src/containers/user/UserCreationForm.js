import React from 'react'
import {connect} from 'react-redux'
import {createUser} from '../../actions/UserActions'
import UserForm from '../../components/user/UserForm'
import {Well} from 'react-bootstrap'

class UserCreationForm extends React.Component {
    constructor(props) {
        super(props)
    }

    createUser(userDetails) { //you might as well just send this function as a call back props from its parent. No need to connect everything!
        const {dispatch} = this.props
        dispatch(createUser(userDetails))
    }

    render() {

        return (
            <Well>
                <UserForm
                    title="Create new user"
                    editUserName={true}
                    submitButtonText="Create user"
                    onSubmit={(userData) => {this.createUser(userData)}}
                />
            </Well>
        )
    }
}

export default connect()(UserCreationForm)