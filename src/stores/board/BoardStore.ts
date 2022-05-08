import {action, computed, makeObservable, observable, toJS} from "mobx";
import {IPosting} from "./PostingStore";

export interface IBoard {
    boardId: number;                //= clubId
    name: string;
    adminEmail: string;
    createDate: string;
}

class BoardStore {

    constructor() {
        makeObservable(this);
    }

    @observable
    _boards: IBoard[] =
    [
        // {
        //     boardId: 1,
        //     name: 'test',
        //     adminEmail: 'test@test.com',
        //     createDate: '2022-05-05',
        // }
    ];

    @observable
    _board: IBoard = {
        boardId: 0,
        name: '',
        adminEmail: '',
        createDate: '',
    };

    @computed
    get boards() {
        return toJS(this._boards);
    }

    get board() {
        return this._board;
    }

    // get boardId() {
    //     return this._board.boardId;
    // }
    //
    // get name() {
    //     return this._board.name;
    // }
    //
    // get adminEmail() {
    //     return this._board.adminEmail;
    // }
    //
    // get createDate() {
    //     return this._board.createDate;
    // }

    @action
    addBoard(board: IBoard) {
        this._boards.push(board);
    }

    @action
    setBoardProps(name: string, value: string) {
        this._board = {
            ...this._board,
            [name]: value,
        }
    }

    @action
    selectedBoard(board: IBoard) {
        this._board = board;
        console.log(toJS(this._board));
    }

    @action
    removeBoard(boardId: number) {
        let index: number = this._boards.findIndex( board => board.boardId === boardId);
        if (index >- 1) {
            this._boards.splice(index, 1);
        }
    }

    @action
    updateBoard(boardId: number) {
        let foundBoard: IBoard | undefined = this._boards.find( board => board.boardId === boardId);

        if (foundBoard) {
            foundBoard.name = this._board.name;
            foundBoard.adminEmail = this._board.adminEmail;
        }
    }

    //클럽 삭제 시 해당 클럽의 게시판도 함께 삭제
    @action
    removeBoardWithClub(clubId: number) {
        console.log('삭제 전 boards', toJS(this._boards));
        for (let i: number = 0; i < this._boards.length; i++) {
            if (this._boards[i].boardId === clubId) {
                this._boards.splice(i, 1);
                console.log(clubId + '의 게시판도 함께 삭제');
                i--;
            }
        }
        console.log('삭제 후 boards', toJS(this._boards));
    }
}

export default new BoardStore();