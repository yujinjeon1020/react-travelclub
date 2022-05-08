import {action, computed, makeObservable, observable, toJS} from "mobx";

export interface IComment {
    boardId: number;              //= clubId
    postId: number;               //게시글 id
    commentId: number;
    writerEmail: string;
    contents: string;
    writtenDate: string;
}

class CommentStore {

    constructor() {
        makeObservable(this);
    }

    @observable
    _comments: IComment[] =
    [
        // {
        //  boardId: 1,
        //  postId: 1,
        //  commentId: 1,
        //  writerEmail: 'test@test.com',
        //  contents: '댓글입니다.',
        //  writtenDate: '2022-05-04',
        // },
        // {
        // boardId: 1,
        // postId: 1,
        // commentId: 2,
        // writerEmail: 'test@test.com',
        // contents: '댓글입니다댓글입니다댓글입니다댓글입니다댓글입니다댓글입니다댓글입니다댓글입니다댓글입니다댓글입니다.',
        // writtenDate: '2022-05-04',
        // },
    ];

    @observable
    _comment: IComment = {
        boardId: 0,
        postId: 0,
        commentId: 0,
        writerEmail: '',
        contents: '',
        writtenDate: '',
    };

    @computed
    get comments() {
        return toJS(this._comments);
    }

    get comment() {
        return this._comment;
    }

    // get boardId() {
    //     return this._comment.boardId;
    // }
    //
    // get postId() {
    //     return this._comment.postId;
    // }
    //
    // get commentId() {
    //     return this._comment.commentId;
    // }

    @action
    addComment(comment: IComment) {
        this._comments.push(comment);
        console.log(toJS(this._comments));

        // this._comment.commentId = 0;
        this._comment.boardId = 0;
        this._comment.postId = 0;
        this._comment.writerEmail = '';
        this._comment.contents = '';
        this._comment.writtenDate = '';
    }

    @action
    setCommentProps(name: string, value: string) {
        this._comment = {
            ...this._comment,
            [name]: value,
        }
    }

    @action
    selectedComment(comment: IComment) {
        this._comment = comment;
        console.log(toJS(this._comment));
    }

    @action
    removeComment(boardId: number, postId: number, commentId: number) {
        let index: number = this._comments.findIndex( comment => comment.boardId === boardId
            && comment.postId === postId && comment.commentId === commentId);
        if (index > -1) {
            this._comments.splice(index, 1);
        }
    }

    @action
    updateComment(boardId: number, postId: number, commentId: number) {
        let foundComment: IComment | undefined = this._comments.find( (comment) => comment.boardId === boardId && comment.postId === postId && comment.commentId === commentId);
        if (foundComment) {
            foundComment.contents = this._comment.contents;

            // this._comment.commentId = 0;
            this._comment.boardId = 0;
            this._comment.postId = 0;
            this._comment.writerEmail = '';
            this._comment.contents = '';
            this._comment.writtenDate = '';
        }
    }

    @action
    removeWithPosting(postId: number) {
        console.log('삭제 전 comments', toJS(this._comments));
        for (let i: number = 0; i < this._comments.length; i++) {
            if (this._comments[i].postId === postId) {
                this._comments.splice(i, 1);
                console.log(postId + '의 댓글도 함께 삭제');
                i--;
            }
        }
        console.log('삭제 후 comments', toJS(this._comments));
    }
}

export default new CommentStore();