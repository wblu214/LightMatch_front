//定义一些路由
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import User from "@/pages/User.vue";
import Search from "../pages/Search.vue";
import UserEdit from "../pages/UserEdit.vue";
import SearchResult from "../pages/SearchResult.vue";
import Login from "@/pages/Login.vue";
import TeamAdd from "@/pages/TeamAdd.vue";
import TeamUpdate from "@/pages/TeamUpdate.vue";
import TeamMyCreate from "@/pages/TeamMyCreate.vue";
import TeamMyJoin from "@/pages/TeamMyJoin.vue";
import Me from "@/pages/Me.vue";
import Register from "@/pages/Register.vue";

const routes =[
    {path :'/', component: Login , meta:{
            showTabbar: true
        }
    },
    {path: '/register',component: Register, meta:{
            showTabbar: true
        }
    },
    {path: '/team',component: Team },
    {path: '/team/add',component: TeamAdd },
    {path: '/team/update',component: TeamUpdate },
    {path: '/team/my/create',component: TeamMyCreate },
    {path: '/team/my/join',component: TeamMyJoin },
    {path: '/user',component: User },
    {path: '/user/me',component: Me },
    {path: '/user/edit',component: UserEdit },
    {path: '/user/list',component: SearchResult },
    {path: '/search',component: Search },
    {path: '/index',component: Index },
]

export default routes;