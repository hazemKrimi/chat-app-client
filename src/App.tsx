import { Route, Switch } from 'react-router-dom';
import { Home, Room } from './pages';
import './App.css';

const App = () => {
	return (
		<Switch>
			<Route exact path='/'>
				<Home />
			</Route>
			<Route exact path='/room/:id'>
				<Room />
			</Route>
		</Switch>
	);
};

export default App;
