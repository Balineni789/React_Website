
import "./employees.css";
import { Button, Table, Modal, Input, Form, message, Space, Row, Col, Select } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined, UserAddOutlined, SearchOutlined } from "@ant-design/icons";

function Employees() {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "Harsha",
      email: "Harsha@gmail.com",
      address: "Ongole Mm-Road",
      role: "Admin"
    },
    {
      id: 2,
      name: "Kiran",
      email: "Kiran@gmail.com",
      address: "Ongole S-Nagar",
      role: "Student"
    },
    {
      id: 3,
      name: "Rajeev",
      email: "Rajeev@gmail.com",
      address: "Ongole Gandhi-Rd",
      role: "Student"
    }
  ]);
  
  const getNewId = () => {
    if (dataSource.length === 0) return 1;
    return Math.max(...dataSource.map(student => student.id)) + 1;
  };

  const getNewUserId = () => {
    if (dataSource.length === 0) return "USR001";
    const maxId = Math.max(...dataSource.map(student => parseInt(student.userId.substring(3))));
    return `USR${(maxId + 1).toString().padStart(3, '0')}`;
  };

  const isEmailDuplicate = (email) => {
    return dataSource.some(student => student.email.toLowerCase() === email.toLowerCase());
  };

  const filteredData = dataSource.filter(student => 
    student.name.toLowerCase().includes(searchText.toLowerCase()) ||
    student.email.toLowerCase().includes(searchText.toLowerCase()) ||
    student.address.toLowerCase().includes(searchText.toLowerCase()) ||
    student.userId.toLowerCase().includes(searchText.toLowerCase()) ||
    student.role.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
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
      title: "Address",
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
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };
  
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  
  const onAddStudent = () => {
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
        
        const newStudent = {
          id: getNewId(),
          userId: getNewUserId(),
          name: values.name,
          email: values.email,
          address: values.address,
          role: values.role
        };
        
        setDataSource(prev => [...prev, newStudent]);
        message.success("Student added successfully!");
        resetAdding();
      })
      .catch(errorInfo => {
        console.log('Validation Failed:', errorInfo);
      });
  };
  
  const onEditFormSubmit = () => {
    
    if (editingStudent.email !== dataSource.find(student => student.id === editingStudent.id).email && 
        isEmailDuplicate(editingStudent.email)) {
      message.error("Email already exists. Please use a different email address.");
      return;
    }
    
    setDataSource((pre) => {
      return pre.map((student) => {
        if (student.id === editingStudent.id) {
          return editingStudent;
        } else {
          return student;
        }
      });
    });
    message.success("Student updated successfully!");
    resetEditing();
  };
  
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  
  const roleOptions = [
    { value: "Student", label: "Student" },
    { value: "Teacher", label: "Teacher" },
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
                onClick={onAddStudent}
                className="add-button"
              >
                Add a new Student
              </Button>
            </Col>
            <Col>
              <Input
                placeholder="Search students..."
                prefix={<SearchOutlined />}
                onChange={handleSearch}
                value={searchText}
                className="search-input"
                allowClear
                style={{ width: "200px" }}
              />
            </Col>
          </Row>
          
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
        </div>
        
        <Modal
          title="Edit Student"
          open={isEditing}
          okText="Save"
          onCancel={resetEditing}
          onOk={onEditFormSubmit}
        >
          <Form layout="vertical">
          
            <Form.Item label="Name">
              <Input
                value={editingStudent?.name}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                value={editingStudent?.email}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, email: e.target.value };
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="Address">
              <Input
                value={editingStudent?.address}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, address: e.target.value };
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="Role">
              <Select
                value={editingStudent?.role}
                onChange={(value) => {
                  setEditingStudent((pre) => {
                    return { ...pre, role: value };
                  });
                }}
                options={roleOptions}
              />
            </Form.Item>
          </Form>
        </Modal>
        
        <Modal
          title="Add New Student"
          open={isAdding}
          okText="Submit"
          onCancel={resetAdding}
          onOk={onAddFormSubmit}
        >
          <Form form={form} layout="vertical">
            <Form.Item 
              name="name" 
              label="Name" 
              rules={[{ required: true, message: 'Please enter name' }]}
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
              label="Address" 
              rules={[{ required: true, message: 'Please enter address' }]}
            >
              <Input placeholder="Enter address" />
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



