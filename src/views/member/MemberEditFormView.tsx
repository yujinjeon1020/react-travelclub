import {PureComponent} from "react";
import {Button, Grid, TextField} from "@material-ui/core";
import UpdateRoundedIcon from "@material-ui/icons/UpdateRounded";
import {observer} from "mobx-react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AddBoxIcon from '@mui/icons-material/AddBox';

@observer
class MemberEditFormView extends PureComponent<any, any> {

    render() {

        const { member, onAddMember, onSetMemberProps, onUpdateMember } = this.props;

        return (
            <form noValidate>
                <Grid container style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <Grid item xs={2}>
                        <TextField
                            variant='standard'
                            margin='normal'
                            label='Email'
                            placeholder='email@email.com'
                            value={member && member.email ? member.email : ''}
                            onChange={ (event) => onSetMemberProps('email', event.target.value) }
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            variant='standard'
                            margin='normal'
                            label='Name'
                            placeholder='Name'
                            value={member && member.name ? member.name : ''}
                            onChange={(event) => onSetMemberProps('name', event.target.value) }
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            variant='standard'
                            margin='normal'
                            label='Nickname'
                            placeholder='NickName'
                            value={member && member.nickName ? member.nickName : ''}
                            onChange={(event) => onSetMemberProps('nickName', event.target.value) }
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            variant='standard'
                            margin='normal'
                            label='PhoneNumber'
                            placeholder='010-1234-5678'
                            value={member && member.phoneNumber ? member.phoneNumber : ''}
                            onChange={(event) => onSetMemberProps('phoneNumber', event.target.value) }
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="BirthDay"
                                format="yyyy-MM-dd"
                                value={member && member.birthDay ? member.birthDay : null}
                                onChange={ (birthDay) => onSetMemberProps('birthDay', birthDay?.valueOf()) }
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
                <br />
                <Grid item>
                    <Button
                        onClick={() => {
                            onAddMember(member);
                        }}
                        variant='contained' color='primary' startIcon={<AddBoxIcon />}>Register</Button>
                    &nbsp;&nbsp;
                    <Button
                        onClick={ () => {
                            onUpdateMember();
                        }}
                        variant='contained' color='default' startIcon={<UpdateRoundedIcon />}>Update</Button>
                    &nbsp;&nbsp;
                    <Button
                        onClick={ () => {
                            member.email = '';
                            member.name = '';
                            member.nickName = '';
                            member.phoneNumber = '';
                            member.birthDay = '';
                        }}
                        variant='outlined' color='default' startIcon={<AutoAwesomeIcon />}>Clear</Button>
                </Grid>
            </form>
        );
    }
}

export default MemberEditFormView;