
import React, { useState } from 'react';
import './about.css';

const About = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { text: newTask, completed: false },
      ]);
      setNewTask('');
    }
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditedText(tasks[index].text);
  };

  const handleSaveEdit = () => {
    if (editedText.trim()) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = editedText;
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditedText('');
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditedText('');
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      padding: '20px',
    }}>
      <h3 className='head'>This Is About Page</h3>

      <div style={{
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center', 
      }} id="Tod">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            marginRight: '10px',
            borderRadius: '5px',
            width: '300px', 
          }}
        />
        <button
          onClick={handleAddTask}
          style={{
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add Task
        </button>
      </div>

      <ul style={{
        listStyle: 'none',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        width: '100%',
        maxWidth: '600px', 
      }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              maxWidth: '450px', 
            }}
          >
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  style={{
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    marginRight: '10px',
                    borderRadius: '5px',
                    width: '250px', 
                  }}
                />
                <button
                  onClick={handleSaveEdit}
                  style={{
                    padding: '10px 10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  style={{
                    padding: '10px 10px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <div>
                  <button
                    onClick={() => handleEditTask(index)}
                    style={{
                      padding: '10px 10px',
                      backgroundColor: '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginRight: '10px',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(index)}
                    style={{
                      padding: '10px 10px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default About;