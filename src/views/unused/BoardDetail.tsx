import {Component, PureComponent} from "react";
import {inject, observer} from "mobx-react";
import autobind from "autobind-decorator";
import {Card, CardContent, CardHeader, Typography, withStyles} from "@material-ui/core";
import {IClub} from "../../stores/club/ClubStore";
import ClubBoard from "./ClubBoard";

const styles = {
    root: {
        width: 700,
    }
}

@inject('clubStore')
@observer
class BoardDetail extends PureComponent<any, any> {

    render() {

        const { club, clubs } = this.props.clubStore;
        const { classes } = this.props;

        return (
            <Card className={classes.root}>
                <CardHeader title={club.name} subheader={club.intro}/>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        <ClubBoard
                            club = {club}
                            clubs = {clubs}
                        />
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(BoardDetail);