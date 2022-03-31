import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import AuthLoginPage from "./components/pages/AuthLoginPage";
import MessagePage from "./components/pages/MessagePage";
import AuthSingupPage from "./components/pages/AuthSingupPage";
import NewQuestionPage from "./components/pages/NewQuestionPage";
import QuestionView from "./components/pages/QuestionView";
import SearchPage from "./components/pages/SearchPage";
import HomePage from "./components/pages/HomePage";
import './components/styles/pages.css'
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:7000'

function App() {

    return (
        <div className="App">
            <Header/>

            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/alert/:title/:text' element={<MessagePage/>}/>
                <Route path='/questions/new' element={<NewQuestionPage/>}/>
                <Route path='/questions/id/:id' element={<QuestionView/>}/>
                <Route path='/search/q/:text' element={<SearchPage/>}/>
                <Route path='/search/tag/:text' element={<SearchPage etag={true}/>}/>
                <Route path='/users/login' element={<AuthLoginPage/>}/>
                <Route path='/users/singup' element={<AuthSingupPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
