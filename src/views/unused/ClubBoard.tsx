import {Component, PureComponent} from "react";
import {inject, observer} from "mobx-react";
import autobind from "autobind-decorator";
import {
    Button,
    Input,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PostingModal from "../../components/modal/PostingModal";
import {toJS} from "mobx";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import {IMember} from "../../stores/member/MemberStore";
import {IClub} from "../../stores/club/ClubStore";

@inject('postingStore','memberStore')
@observer
class ClubBoard extends PureComponent<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            modalOpen: false
        }
    }

    openModal = (member: IMember) => {
        this.setState({modalOpen: true})
        return <PostingModal />
    }

    closeModal = (member: IMember) => {
        this.setState({modelOpen: false})
    }

    checkMembership() {
        let memberEmail = window.prompt('이메일을 입력해주세요.');
        let foundMember = this.props.memberStore.members.find( (target: IMember) => target.email === memberEmail);
        let foundMembership = this.props.club.membershipList.find( (target: IMember) => target.email === memberEmail);
        let foundClub = this.props.club;
        if (memberEmail === null) {
            return;
        }
        if (!foundMember) {
            window.alert('존재하지 않는 회원입니다.');
        } else if (!foundMembership) {
            window.alert('존재하지 않는 멤버십입니다.');
        } else {
            console.log('클럽 정보', toJS(foundClub));
            console.log(memberEmail + ': 존재하는 멤버십');
            this.openModal(foundMember);
        }
    }

    render() {

        //const { board } = this.props.postingStore;
        const { clubs, club } = this.props;
        const { members, member } = this.props.memberStore;

        return (
            <div>
            <TableContainer>
                <h2>{club && club.name ? 'Board of '+ club.name : ''}</h2>
                <Table style={{alignItems:'center'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Title</TableCell>
                            <TableCell align='center'>Writer</TableCell>
                            <TableCell align='center'>WrittenDate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                {Array.isArray(club.posting) && club.posting.length
                    ?
                    club.posting.map( (posting: any) => (
                        <><TableRow style={{alignItems: 'center'}} key={posting.usid} hover>
                            <TableCell align='center'>{posting.title}</TableCell>
                            <TableCell align='center'>{posting.writerEmail}</TableCell>
                            <TableCell align='center'>{posting.writtenDate}</TableCell>
                        </TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align='center'>
                                <Button
                                    onClick={ () => {
                                        console.log(club.usid, club.name + ': 선택');
                                        this.checkMembership();
                                    }}
                                    variant='contained' size='small' color='primary'
                                    startIcon={<BorderColorIcon/>}>Write</Button>
                                </TableCell>
                                <TableCell></TableCell>
                        </TableRow></>
                    ))
                    :
                    <h6> Please Select Club first </h6>
                }
                {/*<Button*/}
                {/*    onClick={this.clickMe}*/}
                {/*    variant='outlined' size='small' color='primary' startIcon={<AccountCircleRoundedIcon />}>Add Membership</Button>*/}
                {/*<br /><br />*/}
                    </TableBody>
                </Table>
            </TableContainer>

        {this.state.modalOpen &&
                    <PostingModal open={ this.state.modalOpen } close={ this.closeModal } header="Write a post" member={member} members={members} club={club} clubs={clubs}>

                            클럽명: <Input value={club.name} />
                            <br />
                            Writer: <Input value={member.email} />
                        {/*<Button*/}
                        {/*    onClick={ () => {*/}
                        {/*        //this.clickMe();*/}
                        {/*        //this.closeModal(club);*/}
                        {/*    }}*/}
                        {/*    variant='outlined' size='small' color='primary' startIcon={<AccountCircleRoundedIcon />}>Add Membership</Button>*/}
                        <br /><br />
                    </PostingModal>}
            </div>
        )
    }
}

export default ClubBoard;