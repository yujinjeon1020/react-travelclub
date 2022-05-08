import {action, computed, makeObservable, observable, toJS} from "mobx";

export interface IMembership {
    clubId: number;
    clubName: string;
    email: string;
    role: RoleInClub;
    joinDate: string;
}

export enum RoleInClub {
    Member = 'Member',              //Default
    President = 'President'
}

class MembershipStore {

    constructor() {
        makeObservable(this);
    }

    @observable
    _memberships: IMembership[] =
    [
        // {
        // clubId: 1,
        // clubName: 'Test Club',
        // email: 'test@test.com',
        // role: RoleInClub.Member,
        // joinDate: '2022-05-03',
        // },
    ];

    @observable
    _membership : IMembership = {
        clubId: 0,
        clubName: '',
        email: '',
        role: RoleInClub.Member,                //Default
        joinDate: '',
    };

    @observable
    _searchMembership: string = '';

    get membership() {
        return this._membership;
    }

    @computed
    get memberships() {
        return this._memberships;
    }

    get searchMembership() {
        return this._searchMembership;
    }

    @action
    setSearchMembership(searchMembership: string) {
        this._searchMembership = searchMembership;
    }

    @action
    addMembership(membership: IMembership) {
        this._memberships.push(membership);
        console.log(membership);
        console.log(toJS(this._memberships));

        this._membership.email = '';
        this._membership.role = RoleInClub.Member;  //초기화
    }

    @action
    setMembershipProps(name: string, value: string) {
        this._membership = {
            ...this._membership,
            [name]: value,
        }
    }

    @action
    selectedMembership(membership: IMembership) {
        this._membership = membership;
    }

    @action
    removeMembership(email: string, clubId: number) {
        //이메일이랑 클럽아이디가 모두 동일한 데이터만 삭제
        let index: number = this._memberships.findIndex(membership => membership.clubId === clubId && membership.email === email );
        if (index > -1) {
            this._memberships.splice(index, 1);
            console.log(this._membership.email + ' 회원을 ' + this._membership.clubId + ' 번 클럽에서 삭제');
            console.log(toJS(this._memberships));
            this._membership.email = '';
        } else {
            console.log('멤버십 삭제 실패');
        }
    }

    //사용X
    // @action
    // removeMemberMembership(email: string, clubId: number) {
    //     let index: number = this._memberships.filter(target => target.email = email).findIndex(target => target.clubId === clubId );
    //     if (index > -1) {
    //         this._memberships.splice(index, 1);
    //         console.log('탈퇴 성공');
    //
    //         this._membership.email = '';
    //     } else {
    //         console.log('탈퇴 실패');
    //     }
    // }

    @action
    updateMembership() {
        let foundMembership: IMembership | undefined = this._memberships.find( (membership) =>
            membership.clubId === this._membership.clubId && membership.email === this._membership.email );
        if (foundMembership) {
            foundMembership.role = this._membership.role;

            this._membership.email = '';
            this._membership.role = RoleInClub.Member;  //default
        }
    }

    //클럽 삭제 시 해당 클럽의 멤버십도 함께 삭제
    @action
    removeWithClub(clubId: number) {
        console.log('삭제 전 memberships', toJS(this._memberships));
        for (let i: number = 0; i < this._memberships.length; i++) {
            if (this._memberships[i].clubId === clubId) {
                this._memberships.splice(i, 1);
                console.log(clubId + '의 멤버십 회원도 함께 삭제');
                i--;
            }
        }
        console.log('삭제 후 memberships', toJS(this._memberships));
    }

    //멤버 삭제 시 해당 멤버의 멤버십도 함께 삭제
    @action
    removeWithMember(email: string) {
        console.log('삭제 전 memberships', toJS(this._memberships));
        for (let i: number = 0; i < this._memberships.length; i++) {
            if (this._memberships[i].email.toLowerCase() === email.toLowerCase()) {
                this._memberships.splice(i, 1);
                console.log(email + '이 가입한 클럽 멤버십도 함께 삭제');
                i--;
            }
        }
        console.log('삭제 후 memberships', toJS(this._memberships));
    }
}

export default new MembershipStore();