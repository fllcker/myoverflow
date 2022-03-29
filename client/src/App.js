import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import AuthLoginPage from "./components/AuthLoginPage";
import MessagePage from "./components/MessagePage";
import AuthSingupPage from "./components/AuthSingupPage";

function App() {
    return (
        <div className="App">
            <Header/>

            <Routes>
                <Route path='/alert/:title/:text' element={<MessagePage/>}/>
                <Route path='/users/login' element={<AuthLoginPage/>}/>
                <Route path='/users/singup' element={<AuthSingupPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
