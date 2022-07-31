import React, {
  // useState,
  useRef,
} from "react";
/**misc */
// import Highlighter from "react-highlight-words";
/**antd */
import { Button, Input, Space } from "antd";
/**antd-icon */
import { SearchOutlined } from "@ant-design/icons";

export default function useSearch() {
  /**state */
  // const [searchText, _searchText] = useState<any>("");
  // const [searchedColumn, _searchedColumn] = useState<any>();

  const searchTableRef = useRef<any>();

  const searchColumn = (dataIndex: any, objKey?: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchTableRef}
          placeholder={`Search...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined
        style={{
          fontSize: "16px",
          //   padding: "10px",
          //   color: filtered ? "#fff" : undefined,
          //   backgroundColor: "#8dc63f",
        }}
      />
    ),
    onFilter: (value: any, record: any) => {
      const valueInitial = record[dataIndex];
      if (valueInitial && objKey && Array.isArray(objKey)) {
        const valueNew = objKey?.reduce((newData: any, data: any) => {
          if (newData[data]) {
            newData = newData[data];
          }
          return newData;
        }, valueInitial);

        return valueNew
          ? valueNew.toString().toLowerCase().includes(value.toLowerCase())
          : "";
      } else {
        return valueInitial
          ? valueInitial.toString().toLowerCase().includes(value.toLowerCase())
          : "";
      }
    },
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchTableRef?.current?.select(), 100);
      }
    },
    // render: (text: any) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: "transparent", padding: 0 }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ""}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    // _searchText(selectedKeys[0]);
    // _searchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    // _searchText("");
  };

  return {
    searchColumn,
  };
}
