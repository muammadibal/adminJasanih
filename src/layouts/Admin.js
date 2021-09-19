/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Footer from 'components/Footer/Footer.js';
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Route, Switch, useLocation } from 'react-router-dom';
import { checkLogin } from 'redux/actions/authAction';
import routes from 'routes.js';

var ps;

function Dashboard(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { checkLoginLoading, checkLoginResult, checkLoginError } = useSelector((state) => state.authReducer);
  const [backgroundColor, setBackgroundColor] = React.useState('blue');
  const [activeColor, setActiveColor] = React.useState('white');
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle('perfect-scrollbar-on');
    }
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
        document.body.classList.toggle('perfect-scrollbar-on');
      }
    };
  });

  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  React.useEffect(() => {
    dispatch(checkLogin(history));
  }, []);
  return (
    <div className='wrapper'>
      <Sidebar {...props} routes={routes} bgColor={backgroundColor} activeColor={activeColor} />
      <div className='main-panel' ref={mainPanel}>
        <DemoNavbar {...props} />
        <Switch>
          {routes.map((prop, key) => {
            return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
          })}
        </Switch>
        <Footer fluid />
      </div>
    </div>
  );
}

export default Dashboard;