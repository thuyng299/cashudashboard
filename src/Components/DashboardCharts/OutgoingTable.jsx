import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Highlighter from "react-highlight-words";
import moment from "moment";

const OutgoingTable = () => {
  const [outgoingData, setOutgoingData] = useState([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/outgoingdetails/outnote-customer"
      );
      setOutgoingData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      width: "5%",
      align: "right",
      render: (text, record, index) => (page - 1) * 5 + index + 1,
    },
    {
      title: "Code",
      dataIndex: "gdnCode",
      key: "code",
      width: "10%",
      align: "left",
      ...getColumnSearchProps("code"),
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customer",
      width: "15%",
      align: "left",
      ...getColumnSearchProps("customer"),
    },
    {
      title: "Customer Email",
      dataIndex: "customerEmail",
      key: "email",
      width: "15%",
      align: "left",
      ...getColumnSearchProps("email"),
    },

    {
      title: "Total Amount (MTs)",
      dataIndex: "totalAmount",
      key: "amount",
      width: "10%",
      align: "right",
      ...getColumnSearchProps("amount"),
      render: (text) => <span>{text.toLocaleString()}</span>,
    },
    {
      title: "Delivery Date",
      dataIndex: "outgoingDate",
      key: "date",
      width: "10%",
      align: "center",
      ...getColumnSearchProps("date"),
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={outgoingData}
      pagination={{
        pageSize: 4,
        pageSizeOptions: ["4"],
        defaultPageSize: 4,
        onChange(current) {
          setPage(current);
        },
      }}
    />
  );
};

export default OutgoingTable;
