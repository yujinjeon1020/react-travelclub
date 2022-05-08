import {PureComponent} from "react";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";

@observer
class ClubDetailListView extends PureComponent<any, any> {
    render() {

        const { club, clubs } = this.props;

        return (
            <div>
                {/*{club.usid}*/}
                {/*<br />*/}
                클럽 이름 : {club.name}
                <br />
                클럽 소개 : {club.intro}
                <br />
                클럽 생성일 : {club.createDate}
                <br />
                <Link to={`/board/${club.usid}`} >
                    <Button
                        variant='outlined' size='small' color='primary' startIcon={<BorderColorIcon />}>Board</Button>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to={`/membership/${club.usid}`} >
                    <Button
                        variant='outlined' size='small' color='default' startIcon={<AccountCircleRoundedIcon />}>Membership</Button>
                </Link>
            </div>
        )
    }
}

export default ClubDetailListView;