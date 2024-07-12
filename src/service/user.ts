import myAxios from "@/plugins/myAxios";
import {getCurrentUserState, setCurrentUserState} from "@/states/user";
import {showFailToast, showSuccessToast} from "vant";

 export const getCurrentUser  =async () => {

     const currentUser = getCurrentUserState();
     if (currentUser) {
         return currentUser;
     }
     //不存在则从远程获取
     const  res = myAxios.get('user/current');
         setCurrentUserState((await res).data.code);
     if ((await res).data. code === 20000){
         showSuccessToast("获取用户信息成功");
         return (await res).data;
     }else{
         showFailToast("获取用户信息失败");
         return null;
     }
 }