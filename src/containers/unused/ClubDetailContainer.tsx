import {Component} from "react";
import {inject, observer} from "mobx-react";
import ClubDetailListView from "../../views/unused/ClubDetailListView";

@inject('clubStore')
@observer
class ClubDetailContainer extends Component<any, any> {

    render() {

        let { club, clubs } = this.props.clubStore;

        return (
            <ClubDetailListView
                club = {club}
                clubs = {clubs}
            />
        )
    }
}

export default ClubDetailContainer;