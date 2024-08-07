import myAxios from "@/plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";

export const getCurrentUser = async () => {
    // const currentUser = getCurrentUserState();
    // if (currentUser) {
    //     console.log('本地拿到用户信息');
    //     return currentUser;
    // }
    // 不存在则从远程获取
    const res = await myAxios.get('/user/current');
    if (res.data.code ===20000 ) {
        showSuccessToast("个人信息加载成功")
        // setCurrentUserState(res.data.data);
        return res.data.data;
    }else{
        showFailToast("个人信息加载失败");
    }
    return null;
}
