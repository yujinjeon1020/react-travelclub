import {Component} from "react";
import {inject, observer} from "mobx-react";
import MembershipSearchbarView from "../../views/membership/MembershipSearchbarView";
import membershipStore from "../../stores/membership/MembershipStore";
import {IProps} from "../../stores/IProps";

@inject('membershipStore')
@observer
class MembershipSearchbarContainer extends Component<IProps> {

    membershipStore = this.props.membershipStore!;

    onChangeSearchMembership(searchMembership: string) {
        this.membershipStore.setSearchMembership(searchMembership);
    }

    render() {
        return (
            <MembershipSearchbarView
                onChangeSearchMembership = {this.onChangeSearchMembership.bind(this)}
            />
        )
    }
}

export default MembershipSearchbarContainer;