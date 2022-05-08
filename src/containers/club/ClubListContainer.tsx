import {Component} from "react";
import {inject, observer} from "mobx-react";
import ClubListView from "../../views/club/ClubListView";
import {IClub} from "../../stores/club/ClubStore";
import {IBoard} from "../../stores/board/BoardStore";
import {IMembership} from "../../stores/membership/MembershipStore";
import {IMember} from "../../stores/member/MemberStore";
import DateUtil from "../../util/DateUtil";
import {IProps} from "../../stores/IProps";

@inject('modalStore', 'clubStore', 'boardStore', 'membershipStore', 'memberStore', 'postingStore', 'commentStore')
@observer
class ClubListContainer extends Component<IProps> {

    //Store들은 null이 아니라고 컴파일러에게 전달 (! 사용)
    clubStore = this.props.clubStore!;
    memberStore = this.props.memberStore!;
    membershipStore = this.props.membershipStore!;
    boardStore = this.props.boardStore!;
    postingStore = this.props.postingStore!;
    commentStore = this.props.commentStore!;

    //모달스토어
    modalStore = this.props.modalStore!;

    //모달메소드
    onOpenBoardDetailModal(club: IClub) {
        this.modalStore.openBoardDetailModal(club);
    }

    onOpenBoardCreateModal() {
        this.modalStore.openBoardCreateModal();
    }

    onOpenBoardUpdateModal() {
        this.modalStore.openBoardUpdateModal();
    }

    onCloseBoardDetailModal() {
        this.modalStore.closeBoardDetailModal();
    }

    onCloseBoardCreateModal() {
        this.modalStore.closeBoardCreateModal();
    }

    onCloseBoardUpdateModal() {
        this.modalStore.closeBoardUpdateModal();
    }

    ///////////////////////////////
    onSelectedClub(club: IClub) {
        this.clubStore.selectedClub(club);
        console.log(club.usid + '선택');
        console.log('클럽 이름: ' + club.name);
        console.log('클럽 소개: ' + club.intro);
    }

    onRemoveClub(boardId: number, clubId: number) {
        if (window.confirm(clubId + '번 클럽을 삭제하시겠습니까?')) {
            this.clubStore.removeClub(clubId);
            //클럽의 멤버십도 함께 삭제
            this.membershipStore.removeWithClub(clubId);
            //클럽의 게시판도 함께 삭제
            this.boardStore.removeBoardWithClub(clubId);
            console.log(clubId + '번 클럽 삭제');
            window.alert('성공적으로 삭제되었습니다.');
        }
    }

    ///////////////////////////////////게시판
    onAddBoard() {
        let { board } = this.boardStore;
        let { memberships } = this.membershipStore;
        let { members } = this.memberStore;
        let { club } = this.clubStore;

        if (!board.name) {
            window.alert('게시판 이름을 입력하세요.');
            throw new Error('게시판 이름을 입력하세요.');
        }
        if (!board.adminEmail) {
            window.alert('게시판 관리자 이메일을 입력하세요.');
            throw new Error('게시판 관리자 이메일을 입력하세요.');
        }
        //이메일 형식 검사
        if (!this.memberStore.isValidEmailAddress(board.adminEmail)) {
            window.alert('이메일 형식이 올바르지 않습니다. 다시 시도해주세요.');
            throw new Error('이메일 형식이 올바르지 않습니다. 다시 시도해주세요.');
        }
        if (!members.find( (target: IMember) => target.email.toLowerCase() === board.adminEmail.toLowerCase())) {
            window.alert('존재하지 않는 회원입니다. 다시 시도해주세요.');
            throw new Error('존재하지 않는 회원입니다. 다시 시도해주세요.');
        }
        if (!memberships.find( (target: IMembership) => target.clubId === club.usid
            && target.email.toLowerCase() === board.adminEmail.toLowerCase())) {
            window.alert('존재하지 않는 멤버십입니다. 다시 시도해주세요.');
            throw new Error('존재하지 않는 멤버십입니다. 다시 시도해주세요.');
        }
        board = {...board, boardId: club.usid, createDate: DateUtil.today()}
        this.boardStore.addBoard(board);
        window.alert(board.name + '이(가) 생성되었습니다.');
    }

    onSetBoardProps(name: string, value: string) {
        this.boardStore.setBoardProps(name, value);
    }

    onRemoveBoard(boardId: number, clubId: number) {
        if (window.confirm('게시판을 삭제하시겠습니까?')) {
            //게시판 삭제
            this.boardStore.removeBoard(boardId);
            //게시판 삭제 시 Posting도 함께 삭제
            this.postingStore.removeWithBoard(boardId, clubId);
            window.alert('성공적으로 삭제되었습니다.');
        }
    }

    onUpdateBoard(boardId: number) {
        let { club } = this.clubStore;
        let { board } = this.boardStore;
        let { members } = this.memberStore;
        let { memberships } = this.membershipStore;
        if (!board.name) {
            window.alert('게시판 이름을 입력해주세요.');
            throw new Error('게시판 이름을 입력해주세요.');
        }
        if (!board.adminEmail) {
            window.alert('게시판 관리자 이메일을 입력해주세요.');
            throw new Error('게시판 관리자 이메일을 입력해주세요.');
        }
        //이메일 형식 검사
        if (!this.memberStore.isValidEmailAddress(board.adminEmail)) {
            window.alert('이메일 형식이 올바르지 않습니다. 다시 시도해주세요.');
            throw new Error('이메일 형식이 올바르지 않습니다. 다시 시도해주세요.');
        }
        if (!members.find( (target: IMember) => target.email.toLowerCase() === board.adminEmail.toLowerCase())) {
            window.alert('존재하지 않는 회원입니다. 다시 시도해주세요.');
            throw new Error('존재하지 않는 회원입니다. 다시 시도해주세요.');
        }
        if (!memberships.find( (target: IMembership) => target.clubId === club.usid && target.email.toLowerCase() === board.adminEmail.toLowerCase())) {
            window.alert('존재하지 않는 멤버십입니다. 다시 시도해주세요.');
            throw new Error('존재하지 않는 멤버십입니다. 다시 시도해주세요.');
        }
        if(window.confirm('수정 하시겠습니까?')) {
            this.boardStore.updateBoard(boardId);
            console.log('업데이트 완료');
            window.alert('성공적으로 수정되었습니다.');
        }
    }

    onSelectedBoard(board: IBoard) {
        this.boardStore.selectedBoard(board);
    }

    render() {

        let { club, clubs, searchText } = this.clubStore;
        let { boards, board } = this.boardStore;
        let { boardDetailModalOpen, boardCreateModalOpen, boardUpdateModalOpen } = this.modalStore;
        
        //게시판 필터링
        boards = boards.filter((target: IBoard) => target.boardId === club.usid);

        //searctText 필터링 한 Clubs를 View로 보내주기!
        clubs = clubs.filter((club: IClub) => club.name.toLowerCase().search(searchText.toLowerCase()) !== -1)

        return (
            <ClubListView
                clubs={clubs}
                club={club}
                board={board}
                boards={boards}
                /////모달
                boardDetailModalOpen={boardDetailModalOpen}
                boardCreateModalOpen={boardCreateModalOpen}
                boardUpdateModalOpen={boardUpdateModalOpen}
                onOpenBoardDetailModal = { this.onOpenBoardDetailModal.bind(this) }
                onOpenBoardCreateModal = { this.onOpenBoardCreateModal.bind(this) }
                onOpenBoardUpdateModal = { this.onOpenBoardUpdateModal.bind(this) }
                onCloseBoardDetailModal = { this.onCloseBoardDetailModal.bind(this) }
                onCloseBoardCreateModal = { this.onCloseBoardCreateModal.bind(this) }
                onCloseBoardUpdateModal = { this.onCloseBoardUpdateModal.bind(this) }
                ////////////
                onSelectedClub = { this.onSelectedClub.bind(this) }
                onRemoveClub = { this.onRemoveClub.bind(this) }
                onAddBoard = { this.onAddBoard.bind(this) }
                onSetBoardProps = { this.onSetBoardProps.bind(this) }
                onRemoveBoard = { this.onRemoveBoard.bind(this) }
                onUpdateBoard = { this.onUpdateBoard.bind(this) }
                onSelectedBoard = { this.onSelectedBoard.bind(this) }
            />
        );
    }
}

export default ClubListContainer;