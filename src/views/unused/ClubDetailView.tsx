import React from 'react';
import {useParams} from "react-router";
import {Box, Container} from "@material-ui/core";
import ClubDetailContainer from "../../containers/unused/ClubDetailContainer";

function ClubDetailView() {

    let {clubId} = useParams();

    return (
        <div>
            <h2>{clubId}의 클럽 정보</h2>
            <Container>
                <Box m={3}>
                    <ClubDetailContainer />
                </Box>
            </Container>
        </div>
    )
}

export default ClubDetailView;