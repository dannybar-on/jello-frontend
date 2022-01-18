import React from 'react'
import { Switch, Route } from 'react-router-dom'

import routes from './routes.js'

export class RootCmp extends React.Component {
    
    render() {
        return (
        <div>
        <main>
            <Switch>
                {routes.map(route=> <Route key={route.path} exact component={route.component} path={route.path} /> )}
            </Switch>
        </main>
        </div>
        )
    }
}