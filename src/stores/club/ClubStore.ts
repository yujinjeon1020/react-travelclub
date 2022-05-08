import {action, computed, makeObservable, observable, toJS} from "mobx";

export interface IClub {
    usid: number;
    name: string;
    intro: string;
    createDate: string;
}

class ClubStore {

    constructor() {
        makeObservable(this);
    }

    @observable
    _searchText: string = '';

    @observable
    _clubs: IClub[] =
        [
        // {
        //     usid: 1,
        //     name: 'Test Club',
        //     intro: 'Test Intro',
        //     createDate: '2022-04-30',
        //     // membershipList: [{
        //     //     email: 'test@test.com',
        //     //     name: 'Tester',
        //     //     nickName: 'Tester',
        //     //     phoneNumber: '01234567890',
        //     //     birthDay: '2022-04-30',
        //     //     role: RoleInClub.President,
        //     // }],
        //     // posting: [{
        //     //     clubId: 1,
        //     //     postId: 1,
        //     //     title: 'Test Title',
        //     //     writerEmail: 'test@test.com',
        //     //     contents: 'Test Contents',
        //     //     writtenDate: '2022-05-01',
        //     //     readCount: 0,
        //     // }],
        // },
        // {
        //     usid: 2,
        //     name: 'Test Club2',
        //     intro: 'Test Intro2',
        //     createDate: '2022-05-01',
        //     // membershipList: [],
        //     // posting: [],
        // }
        ];

    @observable
    _club: IClub = {
        usid: 0,
        name: '',
        intro: '',
        createDate: '',
        // membershipList: [],
        // posting: [],
    };

    get searchText() {
        return this._searchText;
    }

    @computed
    get clubs() {
        return toJS(this._clubs);
    }

    get club() {
        return this._club;
    }

    @action
    setSearchText(searchText: string) {
        this._searchText = searchText;
    }

    //clubs 배열에 데이터 추가
    @action
    public addClub = (club: IClub): void => {
        this._clubs.push(club);
        console.log('클럽 현황', this.clubs);

        this._club.name = '';
        this._club.intro = '';
    }

    //view에서 입력한 값을 state에 셋팅!
    @action
    setClubProps(name:string, value:string) {
        this._club = {
            ...this._club,
            [name]: value,
        }
    }

    //Membership때 쓸까?
    @action
    public selectedClub({...club}: IClub) {
        this._club = club;
        console.log(toJS(this._club));
    }

    get currentClub() {
        return this.selectedClub;
    }

    //클럽 삭제
    @action
    removeClub(clubId: number) {
        let index: number = this._clubs.findIndex( club => club.usid === clubId);
        if (index > -1) {
            this._clubs.splice(index, 1);
            console.log(this.clubs);
        }
    }

    //클럽 수정
    @action
    updateClub() {
        let foundClub: IClub | undefined = this._clubs.find( (club) => club.usid === this._club.usid);
        if (foundClub) {
            foundClub.name = this._club.name;
            foundClub.intro = this._club.intro;
            console.log(this.clubs);
            this._club.name = '';
            this._club.intro = '';
        }
    }
}

export default new ClubStore();