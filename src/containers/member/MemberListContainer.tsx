import {Component} from "react";
import {inject, observer} from "mobx-react";
import {IMember} from "../../stores/member/MemberStore";
import MemberListView from "../../views/member/MemberListView";
import {IProps} from "../../stores/IProps";

@inject('memberStore', 'clubStore', 'membershipStore', 'modalStore')
@observer
class MemberListContainer extends Component<IProps> {

    clubStore = this.props.clubStore!;
    memberStore = this.props.memberStore!;
    membershipStore= this.props.membershipStore!;

    modalStore = this.props.modalStore!;

    onOpenMembershipModal() {
        this.modalStore.openMembershipModal();
    }

    onCloseMembershipModal() {
        this.modalStore.closeMembershipModal();
    }

    onSelectedMember(member: IMember) {
        this.memberStore.selectedMember(member);
        console.log(member.email + ': 선택');
    }

    onRemoveMember(email: string) {
        if (window.confirm(email + ' 회원을 삭제하시겠습니까?')) {
            this.memberStore.removeMember(email);
            //멤버의 멤버십도 함께 삭제
            this.membershipStore.removeWithMember(email);
            console.log(email + ' 삭제');
            window.alert('성공적으로 삭제되었습니다.');
        }
    }

    onRemoveMembership(email: string, clubId: number, clubName: string) {
        if (window.confirm(clubName + '에서 탈퇴하시겠습니까?')) {
            this.membershipStore.removeMembership(email, clubId);
            console.log(email + ' 회원을 ' + clubId + '번 클럽에서 삭제');
            window.alert('성공적으로 탈퇴되었습니다.');
        }
    }

    render() {

        let {member, members, searchMember} = this.memberStore;
        let {club, clubs} = this.clubStore;
        let {memberships} = this.membershipStore;
        let {membershipModalOpen} = this.modalStore;

        //searchMember 이메일 필터링
        members = members.filter((member: IMember) => member.email.toLowerCase().search(searchMember.toLowerCase()) !== -1)

        return (
            <MemberListView
                member={member}
                members={members}
                club={club}
                clubs={clubs}
                memberships={memberships}
                membershipModalOpen={membershipModalOpen}
                onSelectedMember={this.onSelectedMember.bind(this)}
                onRemoveMember={this.onRemoveMember.bind(this)}
                onRemoveMembership={this.onRemoveMembership.bind(this)}
                onOpenMembershipModal={this.onOpenMembershipModal.bind(this)}
                onCloseMembershipModal={this.onCloseMembershipModal.bind(this)}
            />
        );
    }
}

export default MemberListContainer;