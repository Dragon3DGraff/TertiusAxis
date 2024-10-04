import { EditorMode } from "../engine/types";
import { MainMenu } from "./MainMenu/MainMenu";
import { MainToolbar } from "./MainToolbar/MainToolbar";

type Props = {
  mode: EditorMode;
};
export const UI = ({ mode }: Props) => {
  return (
    <>
      <MainMenu />

      {mode === EditorMode["3D"] ? <MainToolbar /> : null}

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
