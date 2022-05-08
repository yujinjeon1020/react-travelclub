import {PureComponent} from "react";
import {observer} from "mobx-react";
import {InputAdornment, TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

@observer
class MembershipSearchbarView extends PureComponent<any, any> {
    render() {

        const { onChangeSearchMembership } = this.props;

        return (
            <TextField
                placeholder='Search Membership Email'
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                 }}
                onChange={ (event) => onChangeSearchMembership(event.target.value) }
            />
        )
    }
}

export default MembershipSearchbarView;