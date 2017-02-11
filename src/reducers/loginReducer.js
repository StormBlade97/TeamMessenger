import '../actions/loginActions.js'
import {combineReducers} from 'redux'

function authentication(state, action) {
	state = state || {
		isFetching: false, 
		responseFromServer: '000',
		loggedin: false
		} //default state
	switch(action.type) {
	case 'SEND_AUTHENTICATION_INFO': 
		return Object.assign({}, state, {
				isFetching: true
			})
	case 'RECIEVE_AUTHENTICATION_INFO': 
		return Object.assign({}, state, {
				isFetching: false, 
				responseFromServer: action.payload.response,
				loggedin: action.payload.response == '200'
			})
	default: return state; //if nothing else leave state.authentication intact
}
}
function userInfo(state = {}, action) {
	switch(action.type) {
	case 'RECEIVE_USER_AUTH_DATA': return Object.assign({}, state, action.payload);
	default: return state; //if nothing else leave state.userInfo intact
}
}

const loginReducer = combineReducers({authentication, userInfo});
export default loginReducer;