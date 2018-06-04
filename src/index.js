import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';
import {App, Home, Login, Register} from 'containers';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

let rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect to={'/'}/>
        </Switch>
      </div>
    </Router>
  </Provider>, rootElement
);



// import React, {Fragment} from 'react';
// import ReactDOM from 'react-dom';
// import {Route, Router, Redirect, Switch} from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory';
// import createHashHistory from 'history/createHashHistory';
// import Login from './Login';
// import Register from './Register';
//
// let rootElement = document.getElementById('root');
// const PUBLIC_URL = process.env.PUBLIC_URL || '';
// const BUILD_FLAVOR = process.env.REACT_APP_BUILD_FLAVOR;
// const history = BUILD_FLAVOR === 'APP' ? createHashHistory({basename: `${PUBLIC_URL}`}) : createHistory({basename: `${PUBLIC_URL}`});
//
// console.log(PUBLIC_URL);
// console.log(BUILD_FLAVOR);
// console.log(history);
//
// ReactDOM.render(
//   <Router history={history} basename={`${PUBLIC_URL}`}>
//     <Fragment>
//       <Switch>
//         <Route exact path="/login" component={Login} />
//         <Route exact path="/register" component={Register} />
//         <Redirect to={'/login'}/>
//       </Switch>
//     </Fragment>
//   </Router>
//   , rootElement
// );