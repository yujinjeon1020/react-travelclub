import {Component} from "react";
import {inject, observer} from "mobx-react";
import DateUtil from "../../util/DateUtil";
import MembershipEditFormView from "../../views/membership/MembershipEditFormView";
import {IMember} from "../../stores/member/MemberStore";
import {IMembership} from "../../stores/membership/MembershipStore";
import {toJS} from "mobx";
import {IProps} from "../../stores/IProps";

@inject('clubStore', 'memberStore', 'membershipStore')
@observer
class MembershipEditFromContainer extends Component<IProps> {

    clubStore = this.props.clubStore!;
    memberStore = this.props.memberStore!;
    membershipStore = this.props.membershipStore!;

    onAddMembership() {
        let { members } = this.memberStore;
        let { membership, memberships } = this.membershipStore;
        let { club } = this.clubStore;
        if (!club.name || !membership.email || !membership.role) {
            window.alert('등록하실 멤버십 회원의 정보를 모두 입력해주세요.');
            return;
        }
        //이메일 형식 검사
        if (!this.memberStore.isValidEmailAddress(membership.email)) {
            window.alert('이메일 형식이 올바르지 않습니다. 다시 시도해주세요.');
            return;
        }
        if (!members.find( (target: IMember) => target.email.toLowerCase() === membership.email.toLowerCase())) {
            window.alert('존재하지 않는 회원입니다.');
            return;
        }
        if (memberships.find( (target: IMembership) => target.clubId === club.usid && target.email.toLowerCase() === membership.email.toLowerCase())) {
            window.alert('이미 존재하는 멤버십입니다.');
            return;
        }
        membership = {...membership, clubId: club.usid, clubName: club.name, joinDate: DateUtil.today()}
        this.membershipStore.addMembership(membership);
        window.alert(membership.email + ' 회원이 ' + club.name + ' 클럽 멤버십에 추가되었습니다.');
        console.log(membership);
        console.log(toJS(memberships));
    }

    onSetMembershipProps(name: string, value: string) {
        this.membershipStore.setMembershipProps(name, value);
    }

    onUpdateMembership() {
        let { membership } = this.membershipStore;
        let { club } = this.clubStore;
        if (!club.name || !membership.email || !membership.role) {
            window.alert('수정할 멤버십 정보를 모두 입력해주세요.');
            return;
        }
        if (window.confirm('수정 하시겠습니까?')) {
            this.membershipStore.updateMembership()                                                                                                    ;
            console.log('멤버십 수정 완료');
            window.alert('성공적으로 수정되었습니다. (이메일은 수정되지 않습니다.)');
        }
    }

    render() {

        const { club } = this.clubStore;
        const { membership, memberships } = this.membershipStore;

        return (
            <MembershipEditFormView
                club = { club }
                membership = { membership }
                memberships = { memberships }
                onAddMembership = {this.onAddMembership.bind(this)}
                onSetMembershipProps = {this.onSetMembershipProps.bind(this)}
                onUpdateMembership = {this.onUpdateMembership.bind(this)}
            />
        )
    }
}

export default MembershipEditFromContainer;