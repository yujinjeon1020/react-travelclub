import {action, computed, makeObservable, observable, toJS} from "mobx";

export interface IPosting {
    boardId: number;         //= clubId
    postId: number;         //게시글 id -> PK
    title: string;
    writerEmail: string;
    contents: string;
    writtenDate: string;
    readCount: number;
    force: number;
}

class PostingStore {

    constructor() {
        makeObservable(this);
    }

    @observable
    _postings: IPosting[] = [];

    @observable
    _posting: IPosting = {
        boardId: 0,
        postId: 0,
        title: '',
        writerEmail: '',
        contents: '',
        writtenDate: '',
        readCount: 0,
        force: 0,
    };

    @observable
    _searchPosting: string = '';

    get force() {
        return this._posting.force;
    }

    @computed
    get postings() {
        return toJS(this._postings);
    }

    get posting() {
        return this._posting;
    }

    get searchPosting() {
        return this._searchPosting;
    }

    @action
    setSearchPosting(searchPosting: string) {
        this._searchPosting = searchPosting;
    }

    //가짜 데이터 조작
    @action
    setForce() {
        let foundPosting: IPosting | undefined = this._postings.find( (posting) => posting.boardId === this._posting.boardId && posting.postId === this._posting.postId);
        if (foundPosting) {
            foundPosting.force++;
        }
    }

    @action
    addPosting(posting: IPosting) {
        this._postings.push(posting);
        //클럽에도 넣어주기! -> 멤버십 스토어를 별도로 생성하여 이 과정은 더이상 필요X
        // clubStore.club.posting.push(posting);

        //새글 작성시 조회수가 이전 글의 조회수와 같아져서... 새 글을 작성하면 조회수를 강제로 초기화하도록 해줌
        let foundPosting: IPosting | undefined = this._postings.find( (posting) => posting.boardId === this._posting.boardId && posting.postId === this._posting.postId);
        if (foundPosting) {
            foundPosting.readCount = 0;
        }
        this._posting.title = '';
        this._posting.contents = '';
        this._posting.readCount = 0;
        this._posting.writtenDate = '';
        this._posting.writerEmail = '';
    }

    @action
    setPostingProps(name: string, value: string) {
        this._posting = {
            ...this._posting,
            [name]: value,
        }
    }

    @action
    setReadCountUp() {
        let foundPosting: IPosting | undefined = this._postings.find( (posting) =>
            posting.boardId === this._posting.boardId && posting.postId === this._posting.postId);
        if (foundPosting) {
            foundPosting.readCount++;
        }
    }

    @action
    selectedPosting(posting: IPosting) {
        this._posting = posting;
        console.log(toJS(this._posting));
    }

    @action
    removePosting(postId: number) {
        let index: number = this._postings.findIndex( posting => posting.boardId === this._posting.boardId && posting.postId === postId);
        if (index > -1) {
            this._postings.splice(index, 1);
        }
    }

    @action
    updatePosting() {
        let foundPosting: IPosting | undefined = this._postings.find( (posting) => posting.boardId === this._posting.boardId && posting.postId === this._posting.postId);

        if (foundPosting) {
            foundPosting.title = this._posting.title;
            foundPosting.contents = this._posting.contents;

            this._posting.title = '';
            this._posting.contents = '';
            this._posting.readCount = 0;
            this._posting.writtenDate = '';
            this._posting.writerEmail = '';
        }
    }

    @action
    removeWithBoard(boardId: number, clubId: number) {
        console.log('삭제 전 postings', toJS(this._postings));
        for (let i: number = 0; i < this._postings.length; i++) {
            if (this._postings[i].boardId === clubId) {
                this._postings.splice(i, 1);
                console.log(boardId + '의 게시글도 함께 삭제');
                i--;            
                //배열에서 요소 삭제시 바로 뒤 요소의 index가 1 줄어들기 때문에 -1 해줘야 바로 뒤 요소를 확인할 수 있다.
                //안그러면 바로 뒤 요소를 1 건너뛰어 버림
            }
        }
        console.log('삭제 후 postings', toJS(this._postings))
    }
}

export default new PostingStore();