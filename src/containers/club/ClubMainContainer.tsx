import React, {Component, PureComponent} from 'react';
import {inject, observer} from "mobx-react";
import autobind from "autobind-decorator";
import {Box, Container} from "@material-ui/core";
import ClubEditFormContainer from "./ClubEditFormContainer";
import ClubListContainer from "./ClubListContainer";
import SearchbarContainer from "./SearchbarContainer";
import MembershipContainer from "../unused/MembershipContainer";
import clubStore from "../../stores/club/ClubStore";
import {IProps} from "../../stores/IProps";

@inject('clubStore')
@observer
class ClubMainContainer extends Component<IProps>{

    clubStore = this.props.clubStore!;

    render() {

        //const { club } = this.props;
        //const { selectedClub } = this.props;

        return (
            <div>
                {/*<img src="images/Travel.png" width='20%'/>*/}
                <Container>
                    <Box m={3}>
                        <ClubEditFormContainer />
                    </Box>
                    <Box m={3}>
                        <SearchbarContainer />
                    </Box>
                    <Box m={3}>
                        <ClubListContainer />
                    </Box>
                </Container>
            </div>
        );
    }
}

export default ClubMainContainer;