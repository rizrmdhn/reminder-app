import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/useRedux";
import { asyncSetIsPreload } from "./states/isPreload/action";
import Routes from "./routes";
import { Toaster } from "./components/ui/toaster";
import { asyncGetLocalTheme } from "./states/theme/action";

function App() {
  const isPreload = useAppSelector((state) => state.isPreload);
  const authUser = useAppSelector((state) => state.authUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncSetIsPreload());
    dispatch(asyncGetLocalTheme());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Routes authUser={authUser} />
      <Toaster />
    </>
  );
}

export default App;
