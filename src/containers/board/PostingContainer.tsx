import {Component} from "react";
import PostingView from "../../views/board/PostingView";
import {inject, observer} from "mobx-react";
import {IMember} from "../../stores/member/MemberStore";
import DateUtil from "../../util/DateUtil";
import {toJS} from "mobx";
import {IPosting} from "../../stores/board/PostingStore";
import {IMembership} from "../../stores/membership/MembershipStore";
import {IComment} from "../../stores/board/CommentStore";
import {IProps} from "../../stores/IProps";

@inject('modalStore', 'clubStore', 'memberStore', 'postingStore', 'membershipStore', 'commentStore', 'boardStore')
@observer
class PostingContainer extends Component<IProps, any> {

    //Store들은 null이 아니라고 컴파일러에게 전달 (! 사용)
    clubStore = this.props.clubStore!;
    memberStore = this.props.memberStore!;
    membershipStore = this.props.membershipStore!;
    boardStore = this.props.boardStore!;
    postingStore = this.props.postingStore!;
    commentStore = this.props.commentStore!;

    //모달
    modalStore = this.props.modalStore!;

    //모달 메소드
    onOpenPostingCreateModal() {
        this.modalStore.openPostingCreateModal();
    }

    onOpenPostingDetailModal() {
        this.modalStore.openPostingDetailModal();
    }

    onOpenPostingUpdateModal() {
        this.modalStore.openPostingUpdateModal();
    }

    onClosePostingCreateModal() {
        this.modalStore.closePostingCreateModal();
    }

    onClosePostingDetailModal() {
        this.modalStore.closePostingDetailModal();
    }

    onClosePostingUpdateModal() {
        this.modalStore.closePostingUpdateModal();
    }

    onOpenCommentCreateModal() {
        this.modalStore.openCommentCreateModal();
    }

    onOpenCommentUpdateModal() {
        this.modalStore.openCommentUpdateModal();
    }

    onCloseCommentCreateModal() {
        this.modalStore.closeCommentCreateModal();
    }

    onCloseCommentUpdateModal() {
        this.modalStore.closeCommentUpdateModal();
    }

    /////////////////////////////////////
    onSelectedPosting(posting: IPosting) {
        this.postingStore.selectedPosting(posting);
        //this.props.postingStore.setReadCountUp();
        console.log(posting.title + ' >> 선택');
    }

    onSetReadCountUp() {
        this.postingStore.setReadCountUp();
    }

    onAddPosting() {
        let { club } = this.clubStore;
        let { members } = this.memberStore;
        let { posting } = this.postingStore;
        let { memberships } = this.membershipStore;
        if (!posting.writerEmail) {
            window.alert('이메일을 입력해주세요.');
            throw new Error('이메일을 입력해주세요.');
        } else if (!posting.title) {
            window.alert('제목을 입력해주세요.');
            throw new Error('제목을 입력해주세요.');
        } else if (!posting.contents) {
            window.alert('내용을 입력해주세요.');
            throw new Error('내용을 입력해주세요.');
        }
        //이메일 형식 검사
        if (!this.memberStore.isValidEmailAddress(posting.writerEmail)) {
            window.alert('이메일 형식이 올바르지 않습니다. 다시 시도해주세요.');
            throw new Error('이메일 형식이 올바르지 않습니다. 다시 시도해주세요.');
        }
        if (!members.find( (target: IMember) => target.email.toLowerCase() === posting.writerEmail.toLowerCase())) {
            window.alert('존재하지 않는 회원입니다. 회원가입을 진행해주세요.');
            throw new Error('존재하지 않는 회원입니다. 회원가입을 진행해주세요.');
        }
        if (!memberships.find ( (target: IMembership) => target.clubId === club.usid && target.email.toLowerCase() === posting.writerEmail.toLowerCase())) {
            window.alert('멤버십이 아니면 게시글을 작성할 수 없습니다.');
            throw new Error('멤버십이 아니면 게시글을 작성할 수 없습니다.');
        }
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
            //댓글도 함께 삭제
            this.commentStore.removeWithPosting(postId);
            console.log(postId + '번 글 삭제');
            window.alert('성공적으로 삭제되었습니다.');
        } else {
            return;
        }
    }

    onUpdatePosting() {
        let { posting } = this.postingStore;
        if (!posting.title) {
            window.alert('제목을 입력해주세요.');
            throw new Error('제목을 입력해주세요.');
        } else if (!posting.contents) {
            window.alert('내용을 입력해주세요.');
            throw new Error('내용을 입력해주세요.');
        }
        this.postingStore.updatePosting();
        window.alert('게시글이 수정되었습니다.');
    }

    //@observable data가 변경되지 않는 메소드류 사용시 화면에 존재하는 데이터가 사라짐을 방지
    onSetForce() {
        this.postingStore.setForce();
    }

    //////////////////////////Comment//////////////////////////////
    onSelectedComment(comment: IComment) {
        this.commentStore.selectedComment(comment);
        console.log(comment.commentId + ' >> 선택');
    }
    
    onAddComment() {
        let { club } = this.clubStore;
        let { members } = this.memberStore;
        let { posting } = this.postingStore;
        let { memberships } = this.membershipStore;
        let { comment } = this.commentStore;
        if (!comment.writerEmail) {
            window.alert('이메일을 입력해주세요.');
            throw new Error('이메일을 입력해주세요.');
        } else if (!comment.contents) {
            window.alert('내용을 입력해주세요.');
            throw new Error('내용을 입력해주세요.');
        }
        //이메일 형식 검사
        if (!this.memberStore.isValidEmailAddress(comment.writerEmail)) {
            window.alert('이메일 형식이 올바르지 않습니다. 다시 시도해주세요.');
            throw new Error('이메일 형식이 올바르지 않습니다. 다시 시도해주세요.');
        }
        if (!members.find( (target: IMember) => target.email.toLowerCase() === comment.writerEmail.toLowerCase())) {
            window.alert('존재하지 않는 회원입니다. 회원가입을 진행해주세요.');
            throw new Error('존재하지 않는 회원입니다. 회원가입을 진행해주세요.');
        }
        if (!memberships.find ( (target: IMembership) => target.clubId === club.usid
            && target.email.toLowerCase() === comment.writerEmail.toLowerCase())) {
            window.alert('멤버십이 아니면 댓글을 작성할 수 없습니다.');
            throw new Error('멤버십이 아니면 댓글을 작성할 수 없습니다.');
        }
        comment = {...comment,
            boardId: posting.boardId,
            postId: posting.postId,
            commentId: ++comment.commentId,
            writtenDate: DateUtil.today()}
        this.commentStore.addComment(comment);
        window.alert('댓글이 성공적으로 작성되었습니다.');
    }

    onSetCommentProps(name: string, value: string) {
        this.commentStore.setCommentProps(name, value);
    }

    onRemoveComment(boardId: number, postId: number, commentId: number) {
        if (window.confirm('댓글을 삭제하시겠습니까?')) {
            this.commentStore.removeComment(boardId, postId, commentId);
            console.log(commentId + ' 번 댓글 삭제');
            window.alert('성공적으로 삭제되었습니다.');
        } else {
          return;
        }
    }

    onUpdateComment(boardId: number, postId: number, commentId: number, e: any) {
        let { comment } = this.commentStore;
        if (!comment.contents) {
            window.alert('내용을 입력해주세요.');
            throw new Error('내용을 입력해주세요.');
        }
        this.commentStore.updateComment(boardId, postId, commentId);
        window.alert('댓글이 수정되었습니다.');
    }

    render() {

        let { club, clubs } = this.clubStore;
        let { member, members } = this.memberStore;
        let { posting, postings, searchPosting } = this.postingStore;
        let { comment, comments } = this.commentStore;
        let { board } = this.boardStore;
        let { postingCreateModalOpen, postingDetailModalOpen, postingUpdateModalOpen,
        commentCreateModalOpen, commentUpdateModalOpen } = this.modalStore;

        //클럽별 게시판 필터링 + 서치바 필터링
        postings = postings.filter( (target: IPosting) => target.boardId === club.usid && target.title.toLowerCase().search(searchPosting.toLowerCase()) !== -1);

        return (
            <PostingView
                club = {club}
                clubs = {clubs}
                member = {member}
                members = {members}
                posting = {posting}
                postings = {postings}
                comment = {comment}
                comments = {comments}
                board = {board}
                //모달
                postingCreateModalOpen={postingCreateModalOpen}
                postingDetailModalOpen={postingDetailModalOpen}
                postingUpdateModalOpen={postingUpdateModalOpen}
                commentCreateModalOpen={commentCreateModalOpen}
                commentUpdateModalOpen={commentUpdateModalOpen}
                onOpenPostingCreateModal={this.onOpenPostingCreateModal.bind(this)}
                onOpenPostingDetailModal={this.onOpenPostingDetailModal.bind(this)}
                onOpenPostingUpdateModal={this.onOpenPostingUpdateModal.bind(this)}
                onClosePostingCreateModal={this.onClosePostingCreateModal.bind(this)}
                onClosePostingDetailModal={this.onClosePostingDetailModal.bind(this)}
                onClosePostingUpdateModal={this.onClosePostingUpdateModal.bind(this)}
                onOpenCommentCreateModal={this.onOpenCommentCreateModal.bind(this)}
                onOpenCommentUpdateModal={this.onOpenCommentUpdateModal.bind(this)}
                onCloseCommentCreateModal={this.onCloseCommentCreateModal.bind(this)}
                onCloseCommentUpdateModal={this.onCloseCommentUpdateModal.bind(this)}
                //모달

                onAddPosting = {this.onAddPosting.bind(this)}
                onSetPostingProps = {this.onSetPostingProps.bind(this)}
                onRemovePosting = {this.onRemovePosting.bind(this)}
                onSelectedPosting = {this.onSelectedPosting.bind(this)}
                onSetReadCountUp = {this.onSetReadCountUp.bind(this)}
                onUpdatePosting = {this.onUpdatePosting.bind(this)}
                onSetForce = {this.onSetForce.bind(this)}

                onSelectedComment = {this.onSelectedComment.bind(this)}
                onAddComment = {this.onAddComment.bind(this)}
                onSetCommentProps = {this.onSetCommentProps.bind(this)}
                onRemoveComment = {this.onRemoveComment.bind(this)}
                onUpdateComment = {this.onUpdateComment.bind(this)}
            />
        )
    }
}

export default PostingContainer;