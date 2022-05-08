import React from "react";
import {Box, Container} from "@material-ui/core";
import MembershipEditFormContainer from "./MembershipEditFormContainer";
import MembershipListContainer from "./MembershipListContainer";
import {useParams} from "react-router";
import MembershipSearchbarContainer from "./MembershipSearchbarContainer";

function MembershipMainContainer() {

    let {clubId} = useParams();

    return (
        <div>
            {/*<h2>{clubId}번 클럽의 멤버십</h2>*/}
            <Container>
                <Box m={3}>
                    <MembershipEditFormContainer/>
                </Box>
                <Box m={3}>
                    <MembershipSearchbarContainer/>
                </Box>
                <Box m={3}>
                    <MembershipListContainer/>
                </Box>
            </Container>
        </div>
    )
}

export default MembershipMainContainer;