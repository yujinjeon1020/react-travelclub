import {action, computed, makeObservable, observable, toJS} from "mobx";

export interface IMember {
    email: string;
    name: string;
    nickName: string;
    phoneNumber: string;
    birthDay: string;
    // membershipList: IMMembership[];
}

class MemberStore {

    constructor() {
        makeObservable(this);
    }

    @observable
    _members: IMember[] =
    [
        // {
        //     email: 'test@test.com',
        //     name: 'Tester',
        //     nickName: 'Tester',
        //     phoneNumber: '01234567890',
        //     birthDay: '2022-04-30',
        //     // membershipList: [{
        //     //     usid: 1,
        //     //     name: 'Test Club',
        //     //     intro: 'Test Intro',
        //     //     createDate: '2022-04-30',
        //     // }]
        // },
        // {
        //     email: 'yujin@gmail.com',
        //     name: 'Yujin Jeon',
        //     nickName: 'Yujin',
        //     phoneNumber: '01097788773',
        //     birthDay: '1993-10-20',
        //     // membershipList: [],
        // }
    ];

    @observable
    _member: IMember = {
        email: '',
        name: '',
        nickName: '',
        phoneNumber: '',
        birthDay: '',
    };

    @observable
    _searchMember: string = '';

    get searchMember() {
        return this._searchMember;
    }

    @computed
    get members() {
        return toJS(this._members);
    }

    get member() {
        return this._member;
    }

    @action
    setSearchMember(searchMember: string) {
        this._searchMember = searchMember;
    }

    //members 배열에 데이터 추가
    @action
    addMember = (member: IMember): void => {
        this._members.push(member);

        this._member = <IMember>{};
    }

    //view에서 입력한 값을 state에 셋팅!
    @action
    setMemberProps(name:string, value:string) {
        this._member = {
            ...this._member,
            [name]: value,
        }
    }

    @action
    selectedMember(member: IMember) {
        this._member = member;
        console.log(toJS(this._member));
    }

    //회원 삭제
    @action
    removeMember(email: string) {
        let index: number = this._members.findIndex( member => member.email === email);
        if (index > -1) {
            this._members.splice(index, 1);
            console.log(this._member.email + ': 회원 삭제');
        }
    }

    //회원 수정
    @action
    updateMember() {
        let foundMember: IMember | undefined = this._members.find( (member) => member.email === this._member.email);
        if (foundMember) {
                foundMember.name = this._member.name;
                foundMember.nickName = this._member.nickName;
                foundMember.phoneNumber = this._member.phoneNumber;
                foundMember.birthDay = this._member.birthDay;

                this._member = <IMember>{};
        }
    }

    //이메일 형식 검사
    isValidEmailAddress(email: string): boolean {
        const ePattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_'{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";

        return !!email.match(ePattern);
    }
}

export default new MemberStore();