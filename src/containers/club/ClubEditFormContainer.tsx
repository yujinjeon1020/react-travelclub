import {Component} from "react";
import {inject, observer} from "mobx-react";
import ClubEditFormView from "../../views/club/ClubEditFormView";
import DateUtil from "../../util/DateUtil";
import {IClub} from "../../stores/club/ClubStore";
import {IProps} from "../../stores/IProps";

@inject('clubStore')
@observer
class ClubEditFormContainer extends Component<IProps> {

    clubStore = this.props.clubStore!;

    onAddClub() {
        let { club } = this.clubStore;
        let { clubs } = this.clubStore;
        if (!club.name || !club.intro) {
            window.alert('클럽의 이름과 소개를 입력하세요.');
            return;
        }
        if (clubs.find( (target: IClub) => target.name.toLowerCase() === club.name.toLowerCase())) {
            window.alert('동일한 이름의 클럽이 이미 존재합니다. 다시 시도해주세요.');
            return;
        }
        if (club.name.length < 3 || club.intro.length < 10) {
            window.alert('클럽 이름 혹은 소개의 글자 수가 너무 짧습니다. 다시 시도해주세요.');
            return;
        }
        club = {...club, usid: ++club.usid, createDate: DateUtil.today()}
        this.clubStore.addClub(club);
        window.alert(club.name + '이(가) 생성되었습니다.');
    }

    onSetClubProps(name: string, value: string) {
        this.clubStore.setClubProps(name, value);
    }

    onUpdateClub() {
        let { club } = this.clubStore;
        let { clubs } = this.clubStore;
        if (!club.name || !club.intro) {
            window.alert('클럽의 이름과 소개를 입력하세요.');
            //throw new Error('클럽의 이름과 소개를 입력하세요.');
            return;
        }
        if (club.name.length < 3 || club.intro.length < 10) {
            window.alert('클럽 이름 혹은 소개의 글자 수가 너무 짧습니다. 다시 시도해주세요.');
            return;
        }
        //클럽 이름 중복 확인
        let index  = clubs.findIndex( (target: IClub) => target.usid === club.usid);
        let prevName: string = clubs[index].name.toLowerCase();
        let newName: string = club.name.toLowerCase();
        //클럽 이름 변경 시도
        if(prevName !== newName) {
            let findClub = clubs.find( (target: IClub) => target.name.toLowerCase() === newName );
            if(findClub) {
                window.alert('동일한 이름의 클럽이 이미 존재합니다. 다시 시도해주세요.');
                return;
            }
        }
        if(window.confirm('수정 하시겠습니까?')) {
            this.clubStore.updateClub();
            console.log('업데이트 완료');
            window.alert('성공적으로 수정되었습니다.');
        }
    }

    render() {

        const { club } = this.clubStore;

        return (
            <ClubEditFormView
                club = { club }
                onAddClub = { this.onAddClub.bind(this) }
                onSetClubProps = { this.onSetClubProps.bind(this) }
                onUpdateClub = {this.onUpdateClub.bind(this)}
            />
        )
    }
}

export default ClubEditFormContainer;