import {PureComponent} from "react";
import {Button, Grid, InputLabel, NativeSelect, TextField} from "@material-ui/core";
import {observer} from "mobx-react";
import UpdateRoundedIcon from "@material-ui/icons/UpdateRounded";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {RoleInClub} from "../../stores/membership/MembershipStore";

@observer
class MembershipEditFormView extends PureComponent<any, any> {

    render() {

        const { membership, club, onAddMembership, onSetMembershipProps, onUpdateMembership } = this.props;

        return (
            <form noValidate>
                <Grid container style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <Grid item xs={2}>
                        <TextField
                            disabled
                            id='nameField'
                            variant='standard'
                            margin='normal'
                            label='Club Name'
                            value={club && club.name ? club.name : ''}
                            onChange={ (event) => onSetMembershipProps('clubId', event.target.value) }
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            variant='standard'
                            margin='normal'
                            label='Member Email'
                            placeholder='email@email.com'
                            value={membership && membership.email ? membership.email : ''}
                            onChange={(event) => onSetMembershipProps('email', event.target.value) }
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Role
                        </InputLabel>
                        <NativeSelect
                            value={membership && membership.role ? membership.role : RoleInClub.Member}
                            inputProps={{
                                name: 'role',
                                id: 'uncontrolled-native',
                            }}
                            onChange={(event) => onSetMembershipProps('role', event.target.value) }

                        >
                            <option value={RoleInClub.Member}>Member</option>
                            <option value={RoleInClub.President}>President</option>
                        </NativeSelect>
                    </Grid>
                </Grid>
                <br />
                <Grid item>
                    <Button
                        onClick={() => {
                            membership.email = membership.email.replace(/(\s*)/g, "");
                            onAddMembership(membership);
                        }}
                        variant='contained' color='primary' startIcon={<AddBoxIcon />}>Add Membership</Button>
                    &nbsp;&nbsp;
                    <Button
                        onClick={() => {
                            onUpdateMembership();
                        }}
                        variant='contained' color='default' startIcon={<UpdateRoundedIcon />}>Update Role</Button>
                    &nbsp;&nbsp;
                </Grid>
            </form>
        );
    }
}

export default MembershipEditFormView;