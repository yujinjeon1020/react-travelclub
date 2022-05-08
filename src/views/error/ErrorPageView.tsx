import {PureComponent} from "react";

class ErrorPageView extends PureComponent<any, any> {
    render() {
        return (
            <div>
                <br /><br />
                <img src="images/NotFound.png"/>
                {/*<h2>요청하신 페이지를 찾을 수 없습니다.</h2>*/}
            </div>
        )
    }
}

export default ErrorPageView;