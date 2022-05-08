import {Component, PureComponent} from "react";
import {inject, observer} from "mobx-react";
import autobind from "autobind-decorator";
import {IClub} from "../../stores/club/ClubStore";
import BoardListItem from "./BoardListItem";
import {List} from "@material-ui/core";
import {makeClassComponentObserver} from "mobx-react/dist/observerClass";

@inject('clubStore')
@observer
class BoardList extends PureComponent<any, any> {

    onSelectedClub(club: IClub) {
        this.props.clubStore.selectedClub(club);
    }

    render() {

        const { clubs } = this.props.clubStore;

        const clubItems = clubs.map( (club: IClub) => {
            return (
                <BoardListItem
                    club = { club }
                    key = { club.usid }
                    onSelectedClub = { this.onSelectedClub }
                />
            )
        })
        return (
            <List>
                {clubItems}
            </List>
        )
    }
}

export default BoardList;