import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 判断当前登录用户权限
 * @param loginUser 当前登录用户
 * @param needAccess 需要有的权限
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  //获取当前登录用户具有的权限,如果没有loginUser表示未登录
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

  //如果需要的权限是未登录 直接返回true因为不需要任何权限
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }

  //如果权限需要登录才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    //如果用户没登陆，返回false 无权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }

  //仅管理员可见
  if (needAccess === ACCESS_ENUM.ADMIN) {
    //如果登录用户不为管理员，返回false
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
};

export default checkAccess;
