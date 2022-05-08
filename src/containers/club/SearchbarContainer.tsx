import {Component} from "react";
import {inject, observer} from "mobx-react";
import autobind from "autobind-decorator";
import SearchbarView from "../../views/club/SearchbarView";
import clubStore from "../../stores/club/ClubStore";
import {IProps} from "../../stores/IProps";

@inject('clubStore')
@observer
class SearchbarContainer extends Component<IProps> {

    clubStore = this.props.clubStore!;

    onChangeSearchText(searchText: string) {
        this.clubStore.setSearchText(searchText);
    }

    render() {
        return (
             <SearchbarView
                 onChangeSearchText = {this.onChangeSearchText.bind(this)}
             />
        )
    }
}

export default SearchbarContainer;