import {PureComponent} from "react";
import {observer} from "mobx-react";
import {InputAdornment, TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

@observer
class SearchbarView extends PureComponent<any, any> {
    render() {

        const { onChangeSearchText } = this.props;

        return (
            <TextField
                placeholder='Search Club Name'
                InputProps={{
                //장신구 - TextField 시작 위치에 컴포넌트를 달아준다.
                startAdornment: (
                    //InputAdornment - <TextField/> 앞뒤에 아이콘을 삽입
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                }}
                onChange={ (event) => onChangeSearchText(event.target.value) }
            />
        )
    }
}

export default SearchbarView;