

import "./employees.css";
import { Button, Table, Modal, Input, Form, message, Space, Row, Col, Select, Spin } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined, UserAddOutlined, SearchOutlined } from "@ant-design/icons";

function Employees() {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        
        const transformedData = products.map((product, index) => ({
          id: product.id,
          userId: `EMP${(index + 1).toString().padStart(3, '0')}`,
          name: product.title.split(' ')[0], 
          email: `${product.title.split(' ')[0].toLowerCase()}@example.com`,
          address: `${product.category} department`, 
          role: product.price > 100 ? 'Admin' : 'Employee', 
          productData: product 
        }));
        
        setDataSource(transformedData);
        setLoading(false);
      } catch (error) {
        message.error('Failed to fetch product data');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const getNewId = () => {
    if (dataSource.length === 0) return 1;
    return Math.max(...dataSource.map(employee => employee.id)) + 1;
  };

  const getNewUserId = () => {
    if (dataSource.length === 0) return "EMP001";
    const maxId = Math.max(...dataSource.map(employee => parseInt(employee.userId.substring(3))));
    return `EMP${(maxId + 1).toString().padStart(3, '0')}`;
  };

  const isEmailDuplicate = (email) => {
    return dataSource.some(employee => employee.email.toLowerCase() === email.toLowerCase());
  };

  const filteredData = dataSource.filter(employee => 
    employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.address.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.userId.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      key: "2",
      title: "User ID",
      dataIndex: "userId",
      sorter: (a, b) => a.userId.localeCompare(b.userId),
    },
    {
      key: "3",
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      key: "4",
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      key: "5",
      title: "Department",
      dataIndex: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      key: "6",
      title: "Role",
      dataIndex: "role",
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      key: "7",
      title: "Product",
      render: (record) => (
        <span>{record.productData?.title.substring(0, 20)}...</span>
      ),
    },
    {
      key: "8",
      title: "Actions",
      render: (record) => {
        return (
          <Space>
            <EditOutlined
              onClick={() => onEditEmployee(record)}
              style={{ color: "#1890ff", cursor: "pointer" }}
            />
            <DeleteOutlined
              onClick={() => onDeleteEmployee(record)}
              style={{ color: "red", cursor: "pointer" }}
            />
          </Space>
        );
      },
    },
  ];

  const onDeleteEmployee = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this employee record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => pre.filter((employee) => employee.id !== record.id));
        message.success("Employee deleted successfully");
      },
    });
  };
  
  const onEditEmployee = (record) => {
    setIsEditing(true);
    setEditingEmployee({ ...record });
  };
  
  const resetEditing = () => {
    setIsEditing(false);
    setEditingEmployee(null);
  };
  
  const onAddEmployee = () => {
    setIsAdding(true);
    form.resetFields();
  };
  
  const resetAdding = () => {
    setIsAdding(false);
    form.resetFields();
  };
  
  const onAddFormSubmit = () => {
    form.validateFields()
      .then(values => {
        if (isEmailDuplicate(values.email)) {
          message.error("Email already exists. Please use a different email address.");
          return;
        }
        
        const newEmployee = {
          id: getNewId(),
          userId: getNewUserId(),
          name: values.name,
          email: values.email,
          address: values.address,
          role: values.role,
          productData: { title: "New Product" } 
        };
        
        setDataSource(prev => [...prev, newEmployee]);
        message.success("Employee added successfully!");
        resetAdding();
      })
      .catch(errorInfo => {
        console.log('Validation Failed:', errorInfo);
      });
  };
  
  const onEditFormSubmit = () => {
    if (editingEmployee.email !== dataSource.find(employee => employee.id === editingEmployee.id).email && 
        isEmailDuplicate(editingEmployee.email)) {
      message.error("Email already exists. Please use a different email address.");
      return;
    }
    
    setDataSource((pre) => pre.map((employee) => 
      employee.id === editingEmployee.id ? editingEmployee : employee
    ));
    message.success("Employee updated successfully!");
    resetEditing();
  };
  
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  
  const roleOptions = [
    { value: "Employee", label: "Employee" },
    { value: "Manager", label: "Manager" },
    { value: "Admin", label: "Admin" }
  ];
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="table-container">
          <Row className="table-header" align="middle" justify="space-between">
            <Col>
              <Button 
                type="primary" 
                icon={<UserAddOutlined />}
                onClick={onAddEmployee}
                className="add-button"
              >
                Add New Employee
              </Button>
            </Col>
            <Col>
              <Input
                placeholder="Search employees..."
                prefix={<SearchOutlined />}
                onChange={handleSearch}
                value={searchText}
                className="search-input"
                allowClear
                style={{ width: "200px" }}
              />
            </Col>
          </Row>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <Spin size="large" />
            </div>
          ) : (
            <Table 
              columns={columns} 
              dataSource={filteredData}
              pagination={{ 
                position: ['bottomCenter'],
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '15', '20'],
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
              }}
              rowKey="id"
            />
          )}
        </div>
        
        <Modal
          title="Edit Employee"
          open={isEditing}
          okText="Save"
          onCancel={resetEditing}
          onOk={onEditFormSubmit}
        >
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input
                value={editingEmployee?.name}
                onChange={(e) => {
                  setEditingEmployee((pre) => ({
                    ...pre,
                    name: e.target.value
                  }));
                }}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                value={editingEmployee?.email}
                onChange={(e) => {
                  setEditingEmployee((pre) => ({
                    ...pre,
                    email: e.target.value
                  }));
                }}
              />
            </Form.Item>
            <Form.Item label="Department">
              <Input
                value={editingEmployee?.address}
                onChange={(e) => {
                  setEditingEmployee((pre) => ({
                    ...pre,
                    address: e.target.value
                  }));
                }}
              />
            </Form.Item>
            <Form.Item label="Role">
              <Select
                value={editingEmployee?.role}
                onChange={(value) => {
                  setEditingEmployee((pre) => ({
                    ...pre,
                    role: value
                  }));
                }}
                options={roleOptions}
              />
            </Form.Item>
          </Form>
        </Modal>
        
        <Modal
          title="Add New Employee"
          open={isAdding}
          okText="Submit"
          onCancel={resetAdding}
          onOk={onAddFormSubmit}
        >
          <Form form={form} layout="vertical">
            <Form.Item 
              name="name" 
              label="Name" 
              rules={[
                { required: true, message: 'Please enter name' },
                { min: 2, message: 'Name must be at least 2 characters' }
              ]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
            <Form.Item 
              name="email" 
              label="Email" 
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter valid email' }
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            <Form.Item 
              name="address" 
              label="Department" 
              rules={[{ required: true, message: 'Please enter department' }]}
            >
              <Input placeholder="Enter department" />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select a role' }]}
            >
              <Select placeholder="Select role" options={roleOptions} />
            </Form.Item>
          </Form>
        </Modal>
      </header>
    </div>
  );
}

export default Employees;


