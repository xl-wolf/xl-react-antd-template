import React, { Component } from "react";
import {
  Table,
  Tag,
  Form,
  Button,
  Input,
  Collapse,
  Pagination,
  Divider,
  message,
  Select,
  Modal,
} from "antd";
import { tableList, deleteItem, editItem } from "@/api/table";
import { setStateSync } from "@/utils/index";
import EditForm from "./forms/editForm";
import "./index.less";
const { Column } = Table;
const { Panel } = Collapse;
const { confirm } = Modal;
class TableComponent extends Component {
  state = {
    list: [],
    loading: false,
    total: 0,
    listQuery: {
      pageNumber: 1,
      pageSize: 10,
      title: "",
      star: "",
      status: "",
    },
    editModalVisible: false,
    editModalLoading: false,
    columns: [
      {
        title: "序号",
        id: "id",
        dataIndex: "id",
        key: "id",
        width: 100,
        sorter: (a, b) => a.id - b.id,
        align: "center",
      },
      {
        title: "标题",
        dataIndex: "title",
        key: "title",
        width: 180,
        align: "center",
      },
      {
        title: "作者",
        dataIndex: "author",
        key: "author",
        width: 80,
        align: "center",
      },
      {
        title: "阅读量",
        dataIndex: "readings",
        key: "readings",
        width: 100,
        align: "center",
      },
      {
        title: "推荐指数",
        dataIndex: "star",
        key: "star",
        width: 100,
        align: "center",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        width: 120,
        align: "center",
        render: (status) => {
          let color =
            status === "published"
              ? "green"
              : status === "deleted"
              ? "red"
              : "";
          return (
            <Tag color={color} key={status}>
              {status}
            </Tag>
          );
        },
      },
      {
        title: "时间",
        dataIndex: "date",
        key: "date",
        align: "center",
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "center",
        width: 180,
        render: (text, row) => (
          <span>
            {/* 两种方案处理函数传参  1、箭头函数，2、bind创建并返回一个新函数 */}
            <Button
              type="primary"
              shape="circle"
              icon="edit"
              title="编辑"
              onClick={this.handleEdit.bind(null, row)}
            />
            <Divider type="vertical" />
            <Button
              type="primary"
              shape="circle"
              icon="delete"
              title="删除"
              onClick={() => this.handleDelete(row)}
            />
          </span>
        ),
      },
    ],
    currentRowData: {
      id: 0,
      author: "",
      date: "",
      readings: 0,
      star: "★",
      status: "published",
      title: "",
    },
  };
  fetchData = () => {
    this.setState({ loading: true });
    tableList(this.state.listQuery).then((response) => {
      console.log(response);
      this.setState({ loading: false });
      const { list, total } = response.data.data;
      this.setState({ list, total });
    });
  };
  componentDidMount() {
    this.fetchData();
  }
  filterTitleChange = (e) => {
    const title = e.target.value;
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        title,
      },
    }));
  };
  filterStatusChange = (value) => {
    const status = value;
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        status,
      },
    }));
  };
  filterStarChange = (value) => {
    const star = value;
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        star,
      },
    }));
  };
  changePage = async (pageNumber, pageSize) => {
    const listQuery = {
      ...this.state.listQuery,
      pageNumber,
    };
    await setStateSync(this, { listQuery });
    this.fetchData();
  };
  changePageSize = async (current, pageSize) => {
    const listQuery = {
      ...this.state.listQuery,
      pageSize,
    };
    await setStateSync(this, { listQuery });
    this.fetchData();
  };
  handleDelete = (row) => {
    const vm = this;
    confirm({
      title: "确认删除当前项？",
      onOk() {
        deleteItem({ id: row.id }).then(() => {
          message.success("删除成功");
          vm.fetchData();
        });
      },
      onCancel() {},
    });
  };
  handleEdit = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editModalVisible: true,
    });
  };

  handleOk = (_) => {
    const { form } = this.formRef.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
        star: "".padStart(fieldsValue["star"], "★"),
        date: fieldsValue["date"].format("YYYY-MM-DD HH:mm:ss"),
      };
      this.setState({ editModalLoading: true });
      editItem(values)
        .then((response) => {
          form.resetFields();
          this.setState({ editModalVisible: false, editModalLoading: false });
          message.success("编辑成功!");
          this.fetchData();
        })
        .catch((e) => {
          message.success("编辑失败,请重试!");
        });
    });
  };

  handleCancel = (_) => {
    this.setState({
      editModalVisible: false,
    });
  };
  render() {
    return (
      <div className="app-container" id="table-module">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="筛选" key="1">
            <Form layout="inline">
              <Form.Item label="标题:">
                <Input onChange={this.filterTitleChange} allowClear />
              </Form.Item>
              <Form.Item label="类型:">
                <Select
                  style={{ width: 120 }}
                  onChange={this.filterStatusChange}
                  allowClear
                >
                  <Select.Option value="published">published</Select.Option>
                  <Select.Option value="draft">draft</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="推荐指数:">
                <Select
                  style={{ width: 120 }}
                  onChange={this.filterStarChange}
                  allowClear
                >
                  <Select.Option value={1}>★</Select.Option>
                  <Select.Option value={2}>★★</Select.Option>
                  <Select.Option value={3}>★★★</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="search" onClick={this.fetchData}>
                  搜索
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
        <br />
        <Table
          bordered
          rowKey={(record) => record.id}
          dataSource={this.state.list}
          loading={this.state.loading}
          pagination={false}
        >
          {this.state.columns.map((col) => {
            return (
              <Column
                title={col.title}
                dataIndex={col.dataIndex}
                key={col.id}
                width={col.width}
                align={col.align}
                sorter={col.sorter}
                render={col.render}
              />
            );
          })}
        </Table>
        <br />
        <Pagination
          total={this.state.total}
          pageSizeOptions={["10", "20", "40"]}
          showTotal={(total) => `共${total}条数据`}
          onChange={this.changePage}
          current={this.state.listQuery.pageNumber}
          onShowSizeChange={this.changePageSize}
          showSizeChanger
          showQuickJumper
          hideOnSinglePage={true}
        />
        <EditForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={(formRef) => (this.formRef = formRef)}
          visible={this.state.editModalVisible}
          confirmLoading={this.state.editModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        />
      </div>
    );
  }
}

export default TableComponent;
