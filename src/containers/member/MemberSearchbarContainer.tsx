import {Component} from "react";
import {inject, observer} from "mobx-react";
import MemberSearchbarView from "../../views/member/MemberSearchbarView";
import memberStore from "../../stores/member/MemberStore";
import {IProps} from "../../stores/IProps";

@inject('memberStore')
@observer
class MemberSearchbarContainer extends Component<IProps> {

    memberStore = this.props.memberStore!;

    onChangeSearchMember(searchMember: string) {
        this.memberStore.setSearchMember(searchMember);
    }

    render() {
        return (
            <MemberSearchbarView
                onChangeSearchMember = {this.onChangeSearchMember.bind(this)}
            />
        )
    }
}

export default MemberSearchbarContainer;