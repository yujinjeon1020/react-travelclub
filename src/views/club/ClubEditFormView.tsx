import {PureComponent} from "react";
import {Button, Grid,  TextField} from "@material-ui/core";
import {observer} from "mobx-react";
import UpdateRoundedIcon from "@material-ui/icons/UpdateRounded";
import AddBoxIcon from '@mui/icons-material/AddBox';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

@observer
class ClubEditFormView extends PureComponent<any, any> {

    render() {

        const { club, onAddClub, onSetClubProps, onUpdateClub } = this.props;

        return (
            <form noValidate>
                <Grid container style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <Grid item xs={2}>
                        <TextField
                            id='nameField'
                            variant='standard'
                            margin='normal'
                            label='Club Name'
                            placeholder='최소 3글자'
                            value={club && club.name ? club.name : ''}
                            onChange={ (event) => onSetClubProps('name', event.target.value) }
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant='standard'
                            margin='normal'
                            label='Club Intro'
                            placeholder='최소 10글자'
                            value={club && club.intro ? club.intro : ''}
                            onChange={(event) => onSetClubProps('intro', event.target.value) }
                        />
                    </Grid>
                </Grid>
                <br />
                <Grid item>
                    <Button
                        onClick={() => {
                            club.name = club.name.trimEnd();
                            onAddClub(club);
                        }}
                        variant='contained' color='primary' startIcon={<AddBoxIcon />}>Create</Button>
                    &nbsp;&nbsp;
                    <Button
                        onClick={ () => {
                            club.name = club.name.trimEnd();
                            onUpdateClub();
                        }}
                        variant='contained' color='default' startIcon={<UpdateRoundedIcon />}>Update</Button>
                    &nbsp;&nbsp;
                    <Button
                        onClick={ () => {
                            club.name = '';
                            club.intro = '';
                        }}
                        variant='outlined' color='default' startIcon={<AutoAwesomeIcon />}>Clear</Button>
                </Grid>
            </form>
        );
    }
}

export default ClubEditFormView;