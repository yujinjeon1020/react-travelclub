import {Component} from "react";
import {inject, observer} from "mobx-react";
import PostingSearchbarView from "../../views/board/PostingSearchbarView";
import {IProps} from "../../stores/IProps";

@inject('postingStore')
@observer
class PostingSearchbarContainer extends Component<IProps> {

    postingStore = this.props.postingStore!;

    onChangeSearchPosting(searchPosting: string) {
        this.postingStore.setSearchPosting(searchPosting);
    }

    render() {
        return (
            <PostingSearchbarView
                onChangeSearchPosting = {this.onChangeSearchPosting.bind(this)}
            />
        )
    }
}

export default PostingSearchbarContainer;