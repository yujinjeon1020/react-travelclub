import {Component} from "react";
import queryString from 'query-string';

class Example extends Component<any, any> {
    render() {

        let queryParams = new URLSearchParams(window.location.search);
        let term = queryParams.get('clubId');
        let clubId = term?.toString();
        console.log(clubId)

        return (
            <h2>소개</h2>
        )
    }
}

export default Example;