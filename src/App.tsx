import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/useRedux";
import { asyncSetIsPreload } from "./states/isPreload/action";
import Routes from "./routes";
import { Toaster } from "./components/ui/toaster";

function App() {
  const isPreload = useAppSelector((state) => state.isPreload);
  const authUser = useAppSelector((state) => state.authUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncSetIsPreload());
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
