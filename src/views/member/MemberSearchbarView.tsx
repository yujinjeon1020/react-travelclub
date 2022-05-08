import {PureComponent} from "react";
import {observer} from "mobx-react";
import {InputAdornment, TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

@observer
class MemberSearchbarView extends PureComponent<any, any> {
    render() {

        const { onChangeSearchMember } = this.props;

        return (
            <TextField
                placeholder='Search Member Email'
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                 }}
                onChange={ (event) => onChangeSearchMember(event.target.value) }
            />
        )
    }
}

export default MemberSearchbarView;