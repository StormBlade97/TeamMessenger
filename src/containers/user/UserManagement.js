import React from 'react'
import {connect} from 'react-redux'
import {fetchUserItems, displayUserDetails, selectUserDetails} from '../../actions/UserActions'
import ClickableItemList from '../../components/shared/ClickableItemList'
import UserDetails from './UserDetails'
import UserCreationForm from './UserCreationForm'
import {Panel, FormControl, ListGroupItem, Button} from 'react-bootstrap'

class UserManagement extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedCreateNewUser: false,
            userByNameFilterValue: ''
        }

        const {dispatch} = this.props
        dispatch(fetchUserItems()) /*remote api call should not be inside constructor. should be in componentDidMount()*/
    }

    visibleUsers() {
        const {users} = this.props
        const {userByNameFilterValue} = this.state
        const result = []

        if (users) {
            Object.values(users).map(user => {
                if (user.firstName.includes(userByNameFilterValue) ||
                    user.lastName.includes(userByNameFilterValue)) result.push({
                    name: user.firstName + ' ' + user.lastName, /*you can also use this syntax `${variablename} string`*/
                    id: user.id
                })
            })
        }

        return result
    }

    updateUserByNameFilter(e) { //naming scheme is usually 'handle + Eventname' or 'on + Eventname. I suggest you use: handleFilterByUserNameUpdate()
        this.setState({
            userByNameFilterValue: e.target.value
        })
    }

    onUserItemSelected(userId) {
        const {dispatch} = this.props
        dispatch(displayUserDetails(userId))
        this.setState({selectedCreateNewUser: false})
    }

    onCreateNewUserSelected(e) {
        e.preventDefault()
        const {dispatch} = this.props
        dispatch(selectUserDetails(null))
        this.setState({selectedCreateNewUser: true})
    }

    render() {
        const {selectedUserDetails} = this.props
        const {selectedCreateNewUser} = this.state

        return (
            <div className="row">
                <Panel className="col-sm-2">
                    <FormControl
                        type="text"
                        placeholder='User search'
                        onChange={(e) => {
                            this.updateUserByNameFilter(e)
                        }}
                    />
                    <br/>
                    <ClickableItemList //this can be reused. Thumbs up for arsenii
                        itemList={this.visibleUsers()}
                        onItemSelected={(userId) => {
                            this.onUserItemSelected(userId)
                        }}
                    />
                    <ListGroupItem //maybe change this to a button?
                        onClick={(e) => {
                            this.onCreateNewUserSelected(e)
                        }}
                        bsStyle="primary"
                        >
                        Add new user
                    </ListGroupItem>

                </Panel>
                <div className="col-sm-1"></div> {/*what a hack*/}
                <div className="col-sm-7">
                    {selectedUserDetails && <UserDetails/> || "something"}
                    {selectedCreateNewUser && <UserCreationForm/>}
                </div>
            </div>
        )
    }
}

const mapStatesToProps = state => ({
    users: state.users.byId,
    selectedUserDetails: state.users.selectedUserDetails
})

export default connect(mapStatesToProps)(UserManagement)