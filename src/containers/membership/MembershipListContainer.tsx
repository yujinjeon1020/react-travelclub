import {Component} from "react";
import {inject, observer} from "mobx-react";
import {IClub} from "../../stores/club/ClubStore";
import MembershipListView from "../../views/membership/MembershipListView";
import {IMembership} from "../../stores/membership/MembershipStore";
import {IProps} from "../../stores/IProps";

@inject('clubStore', 'membershipStore')
@observer
class MembershipListContainer extends Component<IProps> {

    clubStore = this.props.clubStore!;
    membershipStore = this.props.membershipStore!;


    onSelectedMembership(membership: IMembership) {
        this.membershipStore.selectedMembership(membership);
        console.log(membership.email + ' >> 선택');
    }

    onRemoveMembership(email: string, club: IClub) {
        if (window.confirm(email + ' 회원을 멤버십에서 삭제하시겠습니까?')) {
            this.membershipStore.removeMembership(email, club.usid);
            console.log(email + ' 회원 삭제');
            window.alert('성공적으로 삭제되었습니다.');
        }
    }

    render() {

        let { club } = this.clubStore;
        let { memberships, searchMembership } = this.membershipStore;

        //클럽별 멤버십을 미리 필터링해서 보내주자! -> 클럽별로 View가 다르게 뿌려지니까
        //로직을 미리 진행하고 뷰에 보내주자!
        //+ 서치바 쓰기 위해 필터링!
        memberships = memberships.filter( (target: IMembership) => target.clubId === club.usid
            && target.email.toLowerCase().search(searchMembership.toLowerCase()) !== -1);

        return (
            <MembershipListView
                club={club}
                memberships = {memberships}
                onSelectedMembership = { this.onSelectedMembership.bind(this) }
                onRemoveMembership = { this.onRemoveMembership.bind(this) }
            />
        );
    }
}

export default MembershipListContainer;