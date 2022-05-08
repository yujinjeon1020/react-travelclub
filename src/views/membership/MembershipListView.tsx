import {observer} from "mobx-react";
import {PureComponent} from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {toJS} from "mobx";
import moment from "moment";

@observer
class MembershipListView extends PureComponent<any, any> {

    render() {

        const { memberships, club, onSelectedMembership, onRemoveMembership } = this.props;

        return (
            <div>
            <TableContainer component={Paper} >
                <h2>Membership List for {club.name}</h2>
                <Table>
                    <TableHead>
                       <TableRow>
                           <TableCell align='center'><b>Email</b></TableCell>
                           <TableCell align='center'><b>Role</b></TableCell>
                           <TableCell align='center'><b>Join Date</b></TableCell>
                           <TableCell align='center'><b>Menu</b></TableCell>
                       </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(memberships) && memberships.length
                            ?
                            memberships.
                            //filter( (membership) => membership.clubId === club.usid).
                            map( (membership) => (
                                <TableRow key={membership.email} hover
                                            onClick={() => {
                                                onSelectedMembership(membership);
                                            }}
                                >
                                    <TableCell align='center'>{membership.email}</TableCell>
                                    <TableCell align='center'>{membership.role}</TableCell>
                                    <TableCell align='center'>{moment(membership.joinDate).format('YYYY-MM-DD')}</TableCell>
                                    <TableCell align='center'>
                                        <Button
                                            onClick={() => {
                                                onRemoveMembership(membership.email, club);
                                                console.log(toJS(memberships));
                                            }}
                                            variant='contained' color='secondary' size='small' startIcon={<DeleteIcon/>}>Delete this member</Button>
                                    </TableCell>
                            </TableRow>
                        ))
                        :
                            <TableRow>
                                <TableCell><b>No Membership exists</b></TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
                </div>

        )
    }
}

export default MembershipListView;