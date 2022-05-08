import {Component} from "react";
import PostingView from "../../views/board/PostingView";
import postingStore, {IPosting} from "../../stores/board/PostingStore";
import {IMember} from "../../stores/member/MemberStore";
import DateUtil from "../../util/DateUtil";
import {toJS} from "mobx";
import {inject, observer} from "mobx-react";
import {IComment} from "../../stores/board/CommentStore";

@inject('clubStore', 'memberStore', 'postingStore', 'membershipStore')
@observer
class BoardListContainer extends Component<any, any> {

    // onSelectedPosting(board: IPosting) {
    //     this.props.postingStore.selectedPosting(board);
    //     //this.props.postingStore.setReadCountUp();
    //     console.log(board.title + ' >> 선택');
    // }
    //
    // onSetReadCountUp() {
    //     this.props.postingStore.setReadCountUp();
    // }
    //
    // onAddPosting() {
    //     let { club, clubs } = this.props.clubStore;
    //     let { member, members } = this.props.memberStore;
    //     let { board, boards } = this.props.postingStore
    //     if (!board.writerEmail) {
    //         window.alert('이메일을 입력해주세요.');
    //         return;
    //     } else if (!board.title) {
    //         window.alert('제목을 입력해주세요.');
    //         return;
    //     } else if (!board.contents) {
    //         window.alert('내용을 입력해주세요.');
    //         return;
    //     }
    //     if (!members.find( (target: IMember) => target.email.toLowerCase() === board.writerEmail.toLowerCase())) {
    //         window.alert('존재하지 않는 회원입니다.');
    //         return;
    //     }
    //     // if (!club.membershipList.find ( (target: ICMembership) => target.email.toLowerCase() === board.writerEmail.toLowerCase())) {
    //     //     window.alert('게시글 작성 권한이 없습니다. (멤버십이 아님)');
    //     //     return;
    //     // }
    //     window.alert('게시글이 성공적으로 작성 되었습니다.');
    //     board = {...board,
    //                 boardId: club.usid,
    //                 postId: ++board.postId,
    //                 writtenDate: DateUtil.today()}
    //     this.props.postingStore.addPosting(board);
    //     console.log(toJS(club));
    //     console.log(board.title + ': 글 ' + club.name + '에 작성 완료');
    // }
    //
    // onSetPostingProps(name: string, value: string) {
    //     this.props.postingStore.setPostingProps(name, value);
    // }
    //
    // onRemovePosting(postId: number) {
    //     if (window.confirm('게시글을 삭제하시겠습니까?')) {
    //         this.props.postingStore.removePosting(postId);
    //         console.log(postId + '번 글 삭제');
    //         window.alert('성공적으로 삭제되었습니다.');
    //     }
    // }
    //
    // onSelectedComment(comment: IComment) {
    //     this.props.commentStore.selectedComment(comment);
    //     console.log(comment.commentId + ' >> 선택');
    // }

    render() {

        const { club, clubs } = this.props.clubStore;
        const { member, members } = this.props.memberStore;
        const { board, boards } = this.props.postingStore;

        return (
            // <PostingView
            //     club = {club}
            //     clubs = {clubs}
            //     member = {member}
            //     members = {members}
            //     board = {board}
            //     boards = {boards}
            //     onAddPosting = {this.onAddPosting.bind(this)}
            //     onSetPostingProps = {this.onSetPostingProps.bind(this)}
            //     onRemovePosting = {this.onRemovePosting.bind(this)}
            //     onSelectedPosting = {this.onSelectedPosting.bind(this)}
            //     onSetReadCountUp = {this.onSetReadCountUp.bind(this)}
            // />
            <div><h2>안씁니다</h2></div>
        )
    }
}

export default BoardListContainer;