import './App.css';
import Header from "./components/header";
import {Route, Routes} from "react-router-dom";
import Users from "./features/user/component/userList";
function App() {
    return(
        <>
        <Header></Header>
            <Routes>
                <Route path={''} element={<Users/>}></Route>
            </Routes>
        </>
    )
}

export default App;
