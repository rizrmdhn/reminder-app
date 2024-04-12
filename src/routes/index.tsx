import { TAuthUserState } from "@/states/authUser/reducer";
import LoggedInRoutes from "./LoggedInRoutes";
import LoggedOutRoutes from "./LoggedOutRoutes";

export default function Routes({ authUser }: { authUser: TAuthUserState }) {
  if (authUser.data) {
    return <LoggedInRoutes />;
  } else {
    return <LoggedOutRoutes />;
  }
}
