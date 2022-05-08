import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "mobx-react";
import clubStore from "./stores/club/ClubStore";
import memberStore from "./stores/member/MemberStore";
import membershipStore from "./stores/membership/MembershipStore";
import {BrowserRouter} from "react-router-dom";
import postingStore from "./stores/board/PostingStore";
import commentStore from "./stores/board/CommentStore";
import boardStore from "./stores/board/BoardStore";
import modalStore from "./stores/modal/ModalStore";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement) ;
root.render(
    <Provider clubStore={clubStore} memberStore={memberStore} membershipStore={membershipStore} boardStore={boardStore} postingStore={postingStore} commentStore={commentStore} modalStore={modalStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
