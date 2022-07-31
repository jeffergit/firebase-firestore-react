/**hook */
import useSearch from "../../hook/useSearch";

/**util */
import { sortAlpha } from "../../util/sort";

/**antd */
import { Button, Table, Space, Tooltip, Popconfirm } from "antd";
/**antd-icon */
import { EditFilled, EyeOutlined, DeleteOutlined } from "@ant-design/icons";

function MenuTable({
  menus,
  categories,
  tableLoad,
  edit,
  view,
  destroy,
}: {
  menus: Array<any>;
  categories: Array<any>;
  tableLoad: boolean;
  edit: Function;
  view: Function;
  destroy: Function;
}) {
  /**hook-var */
  const { searchColumn } = useSearch();
  return (
    <div className="table__wrap">
      <Table
        dataSource={menus}
        rowKey={({ id }) => id}
        loading={tableLoad}
        bordered
        pagination={{ hideOnSinglePage: false }}
        columns={[
          {
            title: "Actions",
            key: "enabled",
            dataIndex: "enabled",
            render: (dataIndex, data, index) => {
              return (
                <Space align="center" direction="horizontal" size={10}>
                  <Tooltip title="Edit" placement="bottom">
                    <Button
                      className="btn--edit"
                      onClick={() => {
                        edit(data?.id);
                      }}
                      type="primary"
                      icon={<EditFilled />}
                    />
                  </Tooltip>
                  <Tooltip title="View" placement="bottom">
                    <Button
                      data-testid="view"
                      className="btn--view"
                      onClick={() => {
                        view(data?.id);
                      }}
                      type="primary"
                      icon={<EyeOutlined />}
                    />
                  </Tooltip>
                  <Tooltip title="Delete" placement="bottom">
                    <Popconfirm
                      placement="top"
                      title="Are you sure to delete this data?"
                      onConfirm={() => {
                        destroy(data?.id);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        data-testid="delete"
                        className="btn--delete"
                        type="primary"
                        icon={<DeleteOutlined />}
                        danger={true}
                      />
                    </Popconfirm>
                  </Tooltip>
                </Space>
              );
            },
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => sortAlpha(a, b, "name"),
            ...searchColumn("name"),
          },
          {
            title: "Category",
            dataIndex: "category",
            key: "category",
            filters: categories?.map((cat: any) => {
              return {
                text: cat?.name,
                value: cat?.id,
              };
            }),
            onFilter: (value: any, record: any) => {
              return value === record?.category?.id;
            },
            render: (dataIndex) => <>{dataIndex?.name}</>,
          },
          {
            title: "Options",
            dataIndex: "options",
            key: "options",
            ellipsis: true,
            render: (dataIndex) => {
              const optionTotal = dataIndex?.length;
              if (optionTotal <= 0) return <span>None</span>;
              return dataIndex?.map((opt: any, index: any) => {
                return optionTotal - 1 === index ? (
                  <span key={index}>{opt?.name}</span>
                ) : (
                  <span key={index}>{opt?.name}, </span>
                );
              });
            },
          },
          {
            title: "Cost",
            dataIndex: "cost",
            key: "cost",
          },
          {
            title: "Price",
            dataIndex: "price",
            key: "price",
            ellipsis: true,
          },
          {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
            ellipsis: true,
          },
        ]}
      />
    </div>
  );
}

export default MenuTable;
