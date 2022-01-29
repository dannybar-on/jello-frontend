import { LoginPage } from './pages/LoginPage'
import {BoardDetails} from './pages/BoardDetails'
import {BoardList} from './pages/BoardList.jsx'
import {HomePage} from './pages/HomePage.jsx'
import {Dashboard} from './cmps/Dashboard.jsx'

const routes  = [
    
    {
        path:'/board/login',
        component: LoginPage,
    },
    {
        path:'/board/:boardId/dashboard',
        component: Dashboard,
    },
    {
        path:'/board/:boardId',
        component: BoardDetails,
    },
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