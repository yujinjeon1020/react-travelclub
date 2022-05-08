import {PureComponent} from "react";
import {observer} from "mobx-react";
import {InputAdornment, TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

@observer
class PostingSearchbarView extends PureComponent<any, any> {
    render() {

        const { onChangeSearchPosting } = this.props;

        return (
            <TextField
                placeholder='Search Posting Title'
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                 }}
                onChange={ (event) => onChangeSearchPosting(event.target.value) }
            />
        )
    }
}

export default PostingSearchbarView;