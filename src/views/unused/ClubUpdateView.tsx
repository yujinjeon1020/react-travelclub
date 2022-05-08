import {Component, PureComponent} from "react";
import {Button, Card, CardContent, CardHeader, Grid, TextField, Typography, withStyles} from "@material-ui/core";
import {observer} from "mobx-react";

const styles = {
    root: {
        maxWidth: 450,
    },
    media: {
        width: '70%',
        height: '70%',
    }
}

@observer
class ClubUpdateView extends PureComponent<any, any> {
    render() {

            //let { currentClub } = this.props;
            const { currentClub, classes, onUpdateClub, onSetClubProps, club } = this.props;

        return (
            currentClub ?
            <div>
            <form noValidate >
                <h2>Update Club for {club.name}</h2>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            label='clubName'
                            className='input'
                            placeholder='Club Name'
                            value={club && club.name ? club.name : ''}
                            onChange={ (event) => onSetClubProps('name', event.target.value) }
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label='clubIntro'
                            className='input'
                            placeholder='Club Intro'
                            value={club && club.intro ? club.intro : ''}
                            onChange={ (event) => onSetClubProps('intro', event.target.value) }
                        />
                    </Grid>
                </Grid>
                <br />
                <Grid item>
                    <Button
                        onClick={ () => {
                            onUpdateClub();
                            currentClub.name = '';
                            currentClub.intro = '';
                        }}
                        color='primary' variant='contained'>Submit</Button> &nbsp;&nbsp;
                    <Button
                        onClick={ () => {
                            console.log('수정 취소');
                            currentClub.name = '';
                            currentClub.intro = '';
                        }}
                        color='default' variant='outlined'>Cancel</Button>
                </Grid>
            </form>
            </div>
                :
                <div>
                    <h2>Empty</h2>
                </div>
        );
    }
}

export default withStyles(styles)(ClubUpdateView);