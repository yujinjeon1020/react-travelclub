import React from 'react';
import {Box, Container, Grid} from "@material-ui/core";
import PostingContainer from "./PostingContainer";
import {useParams} from "react-router";
import PostingSearchbarContainer from "./PostingSearchbarContainer";

// @inject('clubStore', 'memberStore', 'postingStore')
// @observer
// class PostingMainContainer extends PureComponent<any, any>{
//
//     render() {

function PostingMainContainer() {

    let { clubId } = useParams();

        return (
            <div>
                <Container>
                    <Box m={3}>
                        <PostingSearchbarContainer />
                    </Box>
                    <Box m={3}>
                        <PostingContainer />
                    </Box>
                </Container>
            </div>
        );
    // }
}

export default PostingMainContainer;