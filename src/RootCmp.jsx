import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from "react-router";
import 'react-responsive-modal/styles.css';
import './assets/styles/styles.scss';
import { AppHeader } from './cmps/AppHeader.jsx';
import routes from './routes.js';

class _RootCmp extends React.Component {



    render() {
        const { pathname } = this.props.location;
        
        return (
            <div className="app-container flex column">
                {(pathname.includes('board') ) ? <AppHeader /> : ''}
                <main className='main-app'>
                    <Switch>
                        {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
                    </Switch>
                </main>
            </div>
        );
    }
}

export const _RootCmpWithRouter = withRouter(_RootCmp)