import React, {Component, PureComponent} from "react";
import {Box, Container} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import MemberEditFormContainer from "./MemberEditFormContainer";
import MemberListContainer from "./MemberListContainer";
import autobind from "autobind-decorator";
import MemberSearchbarContainer from "./MemberSearchbarContainer";
import memberStore from "../../stores/member/MemberStore";
import {IProps} from "../../stores/IProps";

@inject('memberStore')
@observer
class MemberMainContainer extends Component<IProps> {

    memberStore = this.props.memberStore!;

    render() {

        //const { member } = this.props;

        return (
            <div>
                <Container >
                    <Box m={3}>
                        <MemberEditFormContainer />
                    </Box>
                    <Box m={3}>
                        <MemberSearchbarContainer />
                    </Box>
                    <Box m={3}>
                        <MemberListContainer />
                    </Box>
                </Container>
            </div>
        );
    }
}

export default MemberMainContainer;