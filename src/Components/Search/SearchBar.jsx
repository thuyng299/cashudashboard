import { Input } from "antd";
const { Search } = Input;

const onSearch = (value) => console.log(value);
const SearchBar = () => (
  <Search
    placeholder="input search text"
    allowClear
    onSearch={onSearch}
    size="large"
    style={{
      width: 350,
    }}
  />
);
export default SearchBar;
