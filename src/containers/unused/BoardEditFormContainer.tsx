import {Component} from "react";
import {inject, observer} from "mobx-react";
import BoardEditFormView from "../../views/unused/BoardEditFormView";
import postingStore, {IPosting} from "../../stores/board/PostingStore";
import memberStore, {IMember} from "../../stores/member/MemberStore";
import DateUtil from "../../util/DateUtil";
import {toJS} from "mobx";
import boardStore from "../../stores/board/BoardStore";
import membershipStore, {IMembership} from "../../stores/membership/MembershipStore";
import clubStore from "../../stores/club/ClubStore";

interface props {
    clubStore?: typeof clubStore;
    memberStore?: typeof memberStore;
    membershipStore?: typeof membershipStore;
    boardStore?: typeof boardStore;
    postingStore?: typeof postingStore;
}

@inject('clubStore', 'memberStore', 'membershipStore', 'postingStore', 'boardStore')
@observer
class BoardEditFormContainer extends Component<props> {

    clubStore = this.props.clubStore!;
    memberStore = this.props.memberStore!;
    membershipStore = this.props.membershipStore!;
    boardStore = this.props.boardStore!;
    postingStore = this.props.postingStore!;

    onSelectedPosting(board: IPosting) {
        this.postingStore.selectedPosting(board);
        console.log(board.title + ' >> 선택');
    }

    onAddPosting() {
        let { club } = this.clubStore;
        let { members } = this.memberStore;
        let { posting } = this.postingStore;
        let { memberships } = this.membershipStore;
        if (!posting.writerEmail) {
            window.alert('이메일을 입력해주세요.');
            return;
        } else if (!posting.title) {
            window.alert('제목을 입력해주세요.');
            return;
        } else if (!posting.contents) {
            window.alert('내용을 입력해주세요.');
            return;
        }
        if (!members.find( (target: IMember) => target.email.toLowerCase() === posting.writerEmail.toLowerCase())) {
            window.alert('존재하지 않는 회원입니다. 회원가입을 진행해주세요.');
            return;
        }
        // if (!memberships.find ( (target: IMembership) => target.email.toLowerCase() === posting.writerEmail.toLowerCase())) {
        //     window.alert('멤버십이 아니면 게시글을 작성할 수 없습니다.');
        //     return;
        // }
        posting = {...posting,
            boardId: club.usid,
            postId: ++posting.postId,
            writtenDate: DateUtil.today()}
        this.postingStore.addPosting(posting);
        window.alert('게시글이 성공적으로 작성 되었습니다.');
        console.log(toJS(club));
        console.log(posting.title + ': 글 ' + club.name + '에 작성 완료');
    }

    onSetPostingProps(name: string, value: string) {
        this.postingStore.setPostingProps(name, value);
    }

    onRemovePosting(postId: number) {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            this.postingStore.removePosting(postId);
            console.log(postId + '번 글 삭제');
            window.alert('성공적으로 삭제되었습니다.');
        }
    }

    render() {

        const { clubs, club } = this.clubStore;
        const { members, member } = this.memberStore;
        // const { membership, memberships } = this.membershipStore;
        const { board, boards } = this.boardStore;

        return (
            <BoardEditFormView
                club = {club}
                clubs = {clubs}
                member = {member}
                members = {members}
                board = {board}
                boards = {boards}
                onAddPosting = {this.onAddPosting.bind(this)}
                onSetPostingProps = {this.onSetPostingProps.bind(this)}
                onRemovePosting = {this.onRemovePosting.bind(this)}
                onSelectedPosting = {this.onSelectedPosting.bind(this)}
            />
        )
    }

}

export default BoardEditFormContainer;