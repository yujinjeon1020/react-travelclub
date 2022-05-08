import {PureComponent} from "react";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import {observer} from "mobx-react";
import moment from "moment";
import Modal from "../../components/modal/Modal";
import {IMembership} from "../../stores/membership/MembershipStore";
import {IState} from "../../stores/modal/ModalStore";

@observer
class MemberListView extends PureComponent<any, IState> {

    render() {

        const { membershipModalOpen, memberships, club, clubs, member, members, onSelectedMember, onRemoveMember, onRemoveMembership, onOpenMembershipModal, onCloseMembershipModal } = this.props;

        return (
            <div>
            <TableContainer component={Paper} >
                <h2>Member List</h2>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'><b>Email</b></TableCell>
                            <TableCell align='center'><b>Name</b></TableCell>
                            <TableCell align='center'><b>NickName</b></TableCell>
                            <TableCell align='center'><b>PhoneNumber</b></TableCell>
                            <TableCell align='center'><b>Birthday</b></TableCell>
                            <TableCell align='center'><b>Menu</b></TableCell>
                         </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(members) && members.length
                        ?
                        members.map( (member) => (
                        <TableRow key={member.email} hover onClick={ () => onSelectedMember(member)}>
                            <TableCell align='center'>{member.email}</TableCell>
                            <TableCell align='center'>{member.name}</TableCell>
                            <TableCell align='center'>{member.nickName}</TableCell>
                            <TableCell align='center'>{member.phoneNumber}</TableCell>
                            <TableCell align='center'>{moment(member.birthDay).format('YYYY-MM-DD')}</TableCell>
                            <TableCell align='center'>
                            <Button
                                onClick={ () => {
                                    onOpenMembershipModal();
                                }}
                                variant='outlined' size='small' color='primary' startIcon={<AccountCircleRoundedIcon />}>Member's Clubs</Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button
                                onClick={ () => {
                                    onRemoveMember(member.email);
                                    member.email = '';
                                    member.name = '';
                                    member.nickName = '';
                                    member.phoneNumber = '';
                                    member.birthDay = '';
                                }}
                                variant='contained' size='small' color='secondary' startIcon={<DeleteIcon />}>Delete This Member</Button>
                            </TableCell>
                        </TableRow>
                        ))
                        :
                        <TableRow>
                           <TableCell>No Member exists</TableCell>
                        </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        {/*멤버의 멤버십 조회 - 가입한 클럽 보기*/}
        {membershipModalOpen &&
            <Modal open = {membershipModalOpen} close={onCloseMembershipModal} header="Club List" member={member} members={members} club={club} clubs={clubs}>
                <Table>
                    <TableHead>
                    </TableHead>
                    <TableBody>
                {Array.isArray(memberships) && memberships.length
                    ?
                    memberships.
                    filter( (membership) => membership.email.toLowerCase() === member.email.toLowerCase()).
                    map((membership: IMembership) => (
                        <TableRow style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                                  key={membership.clubId}>
                            <TableCell align="center">
                                {membership.clubName} ({membership.role})
                            </TableCell>
                            <TableCell>
                                <Button
                                    onClick={ () => {
                                        onRemoveMembership(membership.email, membership.clubId, membership.clubName);
                                    }}
                                    variant='contained' size='small' color='secondary' startIcon={<DeleteIcon/>}>Leave</Button>
                            </TableCell>
                        </TableRow>
                    ))
                    :
                    <TableRow>
                        <TableCell style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            No Club Exists
                        </TableCell>
                    </TableRow>
                    }
                    </TableBody>
                </Table>
            </Modal>}
            </div>
        )
    }
}

export default MemberListView;