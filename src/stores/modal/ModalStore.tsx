import {action, makeObservable, observable} from "mobx";
import {IClub} from "../club/ClubStore";

export interface IState {
    boardDetailModalOpen: boolean;
    boardCreateModalOpen: boolean;
    boardUpdateModalOpen: boolean;

    postingCreateModalOpen: boolean;
    postingDetailModalOpen: boolean;
    postingUpdateModalOpen: boolean;

    commentCreateModalOpen: boolean;
    commentUpdateModalOpen: boolean;

    membershipModalOpen: boolean;
}

class ModalStore {

    constructor() {
        makeObservable(this);
    }

    @observable
    _boardDetailModalOpen: boolean = false;

    @observable
    _boardCreateModalOpen: boolean = false;

    @observable
    _boardUpdateModalOpen: boolean = false;

    @observable
    _postingCreateModalOpen: boolean = false;

    @observable
    _postingDetailModalOpen: boolean = false;

    @observable
    _postingUpdateModalOpen: boolean = false;

    @observable
    _commentCreateModalOpen: boolean = false;

    @observable
    _commentUpdateModalOpen: boolean = false;

    @observable
    _membershipModalOpen: boolean = false;

    get membershipModalOpen() {
        return this._membershipModalOpen;
    }

    get boardDetailModalOpen() {
        return this._boardDetailModalOpen;
    }

    get boardCreateModalOpen() {
        return this._boardCreateModalOpen;
    }

    get boardUpdateModalOpen() {
        return this._boardUpdateModalOpen;
    }

    get postingCreateModalOpen() {
        return this._postingCreateModalOpen;
    }

    get postingDetailModalOpen() {
        return this._postingDetailModalOpen;
    }

    get postingUpdateModalOpen() {
        return this._postingUpdateModalOpen;
    }

    get commentCreateModalOpen() {
        return this._commentCreateModalOpen;
    }

    get commentUpdateModalOpen() {
        return this._commentUpdateModalOpen;
    }

    @action
    openMembershipModal() {
        this._membershipModalOpen = true;
    }

    @action
    closeMembershipModal() {
        this._membershipModalOpen = false;
    }

    @action
    openBoardDetailModal(club: IClub) {
        this._boardDetailModalOpen = true;
    }

    @action
    closeBoardDetailModal() {
        this._boardDetailModalOpen = false;
    }

    @action
    openBoardCreateModal() {
        this._boardCreateModalOpen = true;
    }

    @action
    closeBoardCreateModal() {
        this._boardCreateModalOpen = false;
    }

    @action
    openBoardUpdateModal() {
        this._boardUpdateModalOpen = true;
    }

    @action
    closeBoardUpdateModal() {
        this._boardUpdateModalOpen = false;
    }

    @action
    openPostingCreateModal() {
        this._postingCreateModalOpen = true;
    }

    @action
    closePostingCreateModal() {
        this._postingCreateModalOpen = false;
    }

    @action
    openPostingDetailModal() {
        this._postingDetailModalOpen = true;
    }

    @action
    closePostingDetailModal() {
        this._postingDetailModalOpen = false;
    }

    @action
    openPostingUpdateModal() {
        this._postingUpdateModalOpen = true;
    }

    @action
    closePostingUpdateModal() {
        this._postingUpdateModalOpen = false;
    }

    @action
    openCommentCreateModal() {
        this._commentCreateModalOpen = true;
    }

    @action
    closeCommentCreateModal() {
        this._commentCreateModalOpen = false;
    }

    @action
    openCommentUpdateModal() {
        this._commentUpdateModalOpen = true;
    }

    @action
    closeCommentUpdateModal() {
        this._commentUpdateModalOpen = false;
    }
}

export default new ModalStore();
