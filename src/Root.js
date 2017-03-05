import React, {PropTypes} from 'react'
import {Provider} from 'react-redux'
import configureStore from './configureStore.js'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import App from './components/App.js'
import IndexPage from './components/IndexPage.js'
import LoginForm from './components/LoginForm.js'
import WorkSpace from './containers/Workspace.js'
import TaskArea from './containers/TaskArea'
import IssueArea from './components/IssueArea'
import ManagementArea from './components/ManagementArea'

export const store = configureStore() //bad, we dont export store. But in this case we just export for automation
const TaskAreaWrapper = (key = 1) => {return <TaskArea key={key}></TaskArea>}
export default class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={IndexPage}></IndexRoute>
					<Route path="/login" component={LoginForm}></Route>
					<Route path="/workspace" component={WorkSpace}>
						<Route path="task" component={TaskAreaWrapper}></Route>
						<Route path="issue" component={IssueArea}></Route>
						<Route path="management" component={ManagementArea}></Route>
					</Route>
				</Route>
			</Router>
			</Provider>)
	}
}

/* Automation script */
import {automateLogin} from './automatescript/automateLogin'
automateLogin("cashierLead");