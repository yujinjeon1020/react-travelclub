import {Component} from "react";
import {inject, observer} from "mobx-react";

@inject('clubStore', 'memberStore', 'membershipStore')
@observer
class MembershipContainer extends Component<any, any> {


// const MembershipContainer = () => {
    // const [name, setName] = useState("");
    // const [age, setAge] = useState(0);
    // const [phoneNumber, setPhoneNumber] = useState("");
    //
    // const onChangeName = (e: any) => {
    //     setName(e.target.value);
    // };
    //
    // const onChangeAge = (e: any) => {
    //     setAge(e.target.value);
    // };
    //
    // const onChangePhoneNumber = (e: any) => {
    //     setPhoneNumber(e.target.value);
    // };

    // onSelectedClub(club: IClub) {
    //     this.props.clubStore.selectedClub(club);
    //     console.log(club.usid + '선택');
    //     console.log('클럽 이름: ' + club.name);
    //     console.log('클럽 소개: ' + club.intro);
    // }

    render() {

        let { clubs, club, onSelectedClub } = this.props.clubStore;

        return (
            // <MembershipListView
            //     clubs = {clubs}
            //     club = {club}
            //     onSelectedClub = { onSelectedClub.bind(this) }
            //     // setVisible = { setVisible }
            //     // setInvisible = { setInvisible }
            // />
            <div>

            </div>
        )
    }
}

export default MembershipContainer;