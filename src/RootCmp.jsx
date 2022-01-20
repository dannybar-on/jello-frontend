import React from 'react'
import { Switch, Route } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import './assets/styles/styles.scss'
import { AppHeader } from './cmps/AppHeader.jsx'
import routes from './routes.js'

export class RootCmp extends React.Component {
    
    render() {
        return (
        <div>
            <AppHeader />
        <main>
            <Switch>
                {routes.map(route=> <Route key={route.path} component={route.component} path={route.path} /> )}
            </Switch>
        </main>
        </div>
        )
    }
}