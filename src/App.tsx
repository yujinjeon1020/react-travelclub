import React, {Component, PureComponent} from 'react';
import './css/App.css';
import Nav from "./components/Nav";
import {inject, observer} from "mobx-react";
import autobind from "autobind-decorator";
import {Route, Routes} from "react-router-dom";
import ClubMainContainer from "./containers/club/ClubMainContainer";
import Main from "./components/Main";
import MemberMainContainer from "./containers/member/MemberMainContainer";
import PostingMainContainer from "./containers/board/PostingMainContainer";
import ErrorPageView from "./views/error/ErrorPageView";
import MembershipMainContainer from "./containers/membership/MembershipMainContainer";
import Example from "./components/Example";
import ClubDetailView from "./views/unused/ClubDetailView";

// @inject('clubStore', 'memberStore')
// @autobind
class App extends Component<any>{
    render() {

        const { club } = this.props;

        return (
            <div className="App">
                <Nav />
                    <Routes>
                        <Route path='/' element={<Main />} />
                        <Route path='/club' element={<ClubMainContainer />} />
                        <Route path='/club/:clubId' element={<ClubDetailView />} />
                        <Route path='/membership/:clubId' element={<MembershipMainContainer />} />
                        <Route path='/board/:clubId' element={<PostingMainContainer />} />
                        <Route path='/member' element={<MemberMainContainer />} />
                        <Route path='*' element={<ErrorPageView />} />
                    </Routes>
            </div>
        );
    }
}

export default App;
