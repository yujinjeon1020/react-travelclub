import {Component, PureComponent} from "react";
import {inject, observer} from "mobx-react";
import autobind from "autobind-decorator";
import {Grid, ListItem, Paper, Typography, withStyles} from "@material-ui/core";

const styles = {
    itemArea: {
        width: 400,
    }
}

@inject('clubStore')
@observer
class BoardListItem extends PureComponent<any, any> {
    render() {

        const { club, classes, onSelectedClub} = this.props;

        return (
            <ListItem onClick={ () => onSelectedClub(club) }>
                <Paper>
                    <Grid container spacing={2}>
                        <Grid item className={classes.itemArea}>
                            <Typography component='h5' variant='h5'>
                                {club.name}
                            </Typography>
                            <Typography>
                                {club.intro}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </ListItem>
        );
    }
}

export default withStyles(styles)(BoardListItem);