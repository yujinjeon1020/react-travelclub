import {Component} from "react";
import {inject, observer} from "mobx-react";
import MemberEditFormView from "../../views/member/MemberEditFormView";
import {IMember} from "../../stores/member/MemberStore";
import {IProps} from "../../stores/IProps";

@inject('memberStore')
@observer
class MemberEditFormContainer extends Component<IProps> {

    memberStore = this.props.memberStore!;

    onAddMember() {
        let { member } = this.memberStore;
        let { members } = this.memberStore;
        if (!member.email || !member.name || !member.nickName || !member.phoneNumber || !member.birthDay) {
            window.alert('등록하실 회원의 정보를 모두 입력해주세요.');
            return;
        }
        //이메일 형식 검사
        if (!this.memberStore.isValidEmailAddress(member.email)) {
            window.alert('이메일 형식이 올바르지 않습니다. 다시 시도해주세요.');
            return;
        }
        if (members.find((target: IMember) => target.email === member.email)) {
            window.alert('동일한 이메일이 이미 존재합니다. 다시 시도해주세요.');
            return;
        }
        this.memberStore.addMember(member);
        window.alert(member.email + ' 회원이 생성되었습니다.');
    }

    onSetMemberProps(name: string, value: string) {
        this.memberStore.setMemberProps(name, value);
    }

    onUpdateMember() {
        let { member } = this.memberStore;
        if (!member.email || !member.name || !member.nickName || !member.phoneNumber || !member.birthDay) {
            window.alert('수정할 회원의 정보를 모두 입력해주세요.');
            return;
        }
        if(window.confirm('수정 하시겠습니까?')) {
            this.memberStore.updateMember();
            console.log('업데이트 완료');
            window.alert('성공적으로 수정되었습니다. (이메일은 변경되지 않습니다.)');
        }
    }

    render() {

        const {member} = this.memberStore;

        return (
            <MemberEditFormView
                member={member}
                onAddMember={this.onAddMember.bind(this)}
                onSetMemberProps={this.onSetMemberProps.bind(this)}
                onUpdateMember={this.onUpdateMember.bind(this)}
            />
        )
    }
}

export default MemberEditFormContainer;