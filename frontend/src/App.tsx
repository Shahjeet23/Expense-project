import { Route, Routes } from "react-router-dom";
import Mainlayout from "./layout/layout";
import Home from "./pages/home";
import Users from "./pages/Users";
import Categories from "./pages/Category";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getcate, getusers } from "./features/extrareducer";
import Set1 from "./pages/set1";
import { Setpage2 } from "./pages/set2";
import { Setpage3 } from "./pages/set3";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(getusers());
      dispatch(getcate());
    };
    fetchUsers();
  }, []);
  const users = useAppSelector((state) => state.expense.users);
  const categories = useAppSelector((state) => state.expense.categories);

  return (
    <Routes>
      <Route element={<Mainlayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/set1" element={<Set1 />} />
        <Route path="/set2" element={<Setpage2 />} />
        <Route path="/set3" element={<Setpage3 />} />
      </Route>
    </Routes>
  );
}

export default App;
