import { MainMenu } from "./MainMenu/MainMenu";
import { MainToolbar } from "./MainToolbar/MainToolbar";

export const UI = () => {
  return (
    <>
      <MainMenu />

      <MainToolbar />

      <div>
        {/* {isAuth ? loggedIn : unlogged}
          {isAuth && userMenuVisible && (
            <UserMenu
              userName={ta_State.state.userName}
              showUsermenu={showUsermenu}
            ></UserMenu>
          )} */}
      </div>
    </>
  );
};
