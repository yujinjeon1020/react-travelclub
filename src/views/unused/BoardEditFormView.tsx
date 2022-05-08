import {Component} from "react";
import {Box, Button, Grid, InputLabel, NativeSelect, TextareaAutosize, TextField} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import DateUtil from "../../util/DateUtil";
import BorderColorIcon from "@mui/icons-material/BorderColor";

@inject('clubStore', 'memberStore', 'membershipStore')
@observer
class BoardEditFormView extends Component<any, any> {

    render() {

        const { membership, memberships, clubs, club, members, member, board, boards, onSelectedPosting, onAddPosting, onSetPostingProps, onRemovePosting } = this.props;

        return (
            <form noValidate>
                <Box>
                    <Box>
                        Club : &nbsp;
                        <TextField
                            disabled
                            defaultValue={club.name}
                        />
                        <br /><br />
                        Writer : &nbsp;
                        <TextField
                            focused
                            required
                            onChange={ (event) => onSetPostingProps('writerEmail', event.target.value) }
                        />
                        <br /><br />
                        Title : &nbsp;
                        <TextField
                            required
                            onChange={ (event) => onSetPostingProps('title', event.target.value) }
                        />
                        <br /><br />
                        Content : &nbsp;
                        <TextareaAutosize
                            aria-label="empty textarea"
                            style={{ width: 200 }}
                            minRows={10}
                            onChange={ (event) => onSetPostingProps('contents', event.target.value) }
                        />
                        <br /><br />
                        Date : &nbsp;
                        <TextField
                            disabled
                            defaultValue={DateUtil.today()}
                            onChange={ (event) => onSetPostingProps('writtenDate', event.target.value) }
                        />
                        <br /><br />
                        <Button
                            onClick={ () => {
                                onAddPosting(board);
                                //this.closeModal();
                            }}
                            variant='contained' size='small' color='primary' startIcon={<BorderColorIcon />}>Write</Button>
                    </Box>
            {/*/!*<Grid container style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>*!/*/}
            {/*/!*    <Grid item xs={2}>*!/*/}
            {/*    <TextField*/}
            {/*            disabled*/}
            {/*    id='nameField'*/}
            {/*    variant='standard'*/}
            {/*    margin='normal'*/}
            {/*    label='Club Name'*/}
            {/*    value={club && club.name ? club.name : ''}*/}
            {/*    onChange={ (event) => onSetMembershipProps('clubId', event.target.value) }*/}
            {/*    />*/}
            {/*    /!*</Grid>*!/*/}
            {/*    <br />*/}
            {/*    /!*<Grid item xs={2}>*!/*/}
            {/*    <TextField*/}
            {/*        variant='standard'*/}
            {/*    margin='normal'*/}
            {/*    label='Member Email'*/}
            {/*    placeholder='email@email.com'*/}
            {/*    value={membership && membership.email ? membership.email : ''}*/}
            {/*    onChange={(event) => onSetMembershipProps('email', event.target.value) }*/}
            {/*    />*/}
            {/*    /!*</Grid>*!/*/}
            {/*    <br /><br />*/}
            {/*    /!*<Grid item xs={2}>*!/*/}
            {/*    <InputLabel variant="standard" htmlFor="uncontrolled-native">*/}
            {/*        Role*/}
            {/*        </InputLabel>*/}
            {/*        <NativeSelect*/}
            {/*    value={membership && membership.role ? membership.role : RoleInClub.Member}*/}
            {/*    inputProps={{*/}
            {/*        name: 'role',*/}
            {/*            id: 'uncontrolled-native',*/}
            {/*    }}*/}
            {/*    onChange={(event) => onSetMembershipProps('role', event.target.value) }*/}

            {/*>*/}
            {/*    <option value={RoleInClub.Member}>Member</option>*/}
            {/*        <option value={RoleInClub.President}>President</option>*/}
            {/*        </NativeSelect>*/}
            {/*    /!*<TextField*!/*/}
            {/*    /!*    variant='standard'*!/*/}
            {/*    /!*    margin='normal'*!/*/}
            {/*    /!*    label='President / Member'*!/*/}
            {/*    /!*    value={member && member.email ? member.email : ''}*!/*/}
            {/*    /!*    //onChange={(event) => onSetClubProps('intro', event.target.value) }*!/*/}
                {/*/>*/}
            {/*    /!*</Grid>*!/*/}
            {/*    /!*</Grid>*!/*/}
            {/*    <br /><br /><br /><br />*/}
            {/*    /!*<Grid item>*!/*/}
            {/*    <Button*/}
            {/*        onClick={() => {*/}
            {/*        onAddMembership(membership);*/}
            {/*    }}*/}
            {/*    variant='contained' color='primary' startIcon={<SaveIcon />}>Add Membership</Button>*/}
            {/*    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
            {/*    <Button*/}
            {/*        onClick={() => {*/}
            {/*        onUpdateMembership();*/}
            {/*    }}*/}
            {/*    variant='contained' color='default' startIcon={<UpdateRoundedIcon />}>Update</Button>*/}
            {/*    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
            {/*    /!*<Button*!/*/}
            {/*    /!*    onClick={() => {*!/*/}
            {/*    /!*        //onRemoveMembership(membership.email, club);*!/*/}
            {/*    /!*        // console.log(toJS(club.membershipList));*!/*/}
            {/*    /!*    }}*!/*/}
            {/*    /!*    variant='contained' color='secondary' startIcon={<DeleteIcon/>}>Delete</Button>*!/*/}
            {/*    /!*</Grid>*!/*/}
                </Box>
            </form>
        );
    }
}

export default BoardEditFormView;

