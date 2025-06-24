import { useState } from "react";
import { Table, Button, Modal, Form, Input, notification } from "antd";
import "./index.scss";

function NotificationList(props) {
  const { title, dataSource, setDataSource } = props;

  const [currentId, setCurrentId] = useState(null);

  const modalTitle = currentId ? "編輯" : "新增";

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteTipOpen, setIsDeleteTipOpen] = useState(false);

  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    if (currentId) {
      let findItem = dataSource.find((item) => item.id === currentId);
      findItem.name = values.name;
      findItem.email = values.email;
      setDataSource((prev) =>
        prev.map((item) => (item.id === currentId ? findItem : item))
      );
      notification.success({
        message: "更新成功",
      });
    } else {
      const newData = {
        key: dataSource.length + 1,
        ...values,
      };
      setDataSource((prev) => [...prev, newData]);
      notification.success({
        message: "新增成功",
      });
    }
    setIsFormOpen(false);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
  };

  const handleDeleteTipOk = () => {
    if (!currentId) {
      notification.error({
        message: "刪除失敗",
      });
    } else {
      setDataSource((prev) => prev.filter((item) => item.id !== currentId));
      setIsDeleteTipOpen(false);
      notification.success({
        message: "刪除成功",
      });
    }
  };

  const handleDeleteTipCancel = () => {
    setIsDeleteTipOpen(false);
  };

  const handleAdd = () => {
    setCurrentId(null);
    form.resetFields();
    form.setFieldsValue({
      id: `nl${Number(dataSource.at(-1).id.split("nl").pop()) + 1}`,
    });
    setIsFormOpen(true);
  };

  const handleEdit = (id) => {
    setCurrentId(id);
    const record = dataSource.find((item) => item.id === id);
    form.setFieldsValue(record);
    setIsFormOpen(true);
  };

  const handleRemove = (id) => {
    setCurrentId(id);
    setIsDeleteTipOpen(true);
  };

  const columns = [
    {
      title: "編號",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "收件者姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "功能",
      dataIndex: "feature",
      key: "feature",
      render: (_, record) => {
        return (
          <div>
            <Button
              color="primary"
              variant="solid"
              onClick={() => handleEdit(record.id)}
            >
              編輯
            </Button>
            <Button
              color="danger"
              variant="solid"
              onClick={() => handleRemove(record.id)}
            >
              刪除
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="notificationList">
      <h1>{title}</h1>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        新增
      </Button>
      <Table dataSource={dataSource} columns={columns} />;
      <Modal
        title={modalTitle}
        closable={false}
        open={isFormOpen}
        footer={null}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={handleFormSubmit}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="id" label="編號" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="name"
            label="收件者姓名"
            rules={[{ required: true, message: "請輸入收件者姓名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "請輸入Email地址" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5, span: 18 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <Button type="default" onClick={handleFormCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="刪除提示"
        open={isDeleteTipOpen}
        onOk={handleDeleteTipOk}
        onCancel={handleDeleteTipCancel}
      >
        <p>確定要刪除嗎?</p>
      </Modal>
    </div>
  );
}

export default NotificationList;
