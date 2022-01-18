import {BoardList} from './pages/BoardList.jsx'
import {HomePage} from './pages/HomePage.jsx'

const routes  = [
    {
        path:'/board',
        component: BoardList,
    },
    {
        path:'/',
        component: HomePage,
    },
]

export default routes;