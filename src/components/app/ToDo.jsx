import React, { useState, useRef } from 'react';
import './todo.css';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ToDo() {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const taskTitle = useRef('');
    const taskSummary = useRef('');

    function createTask() {
        const newTask = {
            title: taskTitle.current.value,
            summary: taskSummary.current.value,
        };

        setTasks(prevTasks => [...prevTasks, newTask]);
        saveTasks([...tasks, newTask]);
        setShowModal(false);
    }

    function deleteTask(index) {
        const clonedTasks = [...tasks];
        clonedTasks.splice(index, 1);
        setTasks(clonedTasks);
        saveTasks(clonedTasks);
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="App">
            <header>
                <h1>TuDo</h1>
            </header>
            <div className="container">
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <div className="card" key={index}>
                            <div className="card-header">
                                <span className="title">{task.title}</span>
                                <Button
                                    className="delete-button"
                                    onClick={() => deleteTask(index)}
                                    variant='secondary'
                                >
                                    Delete
                                </Button>
                            </div>
                            <span className="summary">
                                {task.summary
                                    ? task.summary
                                    : 'No summary was provided for this task'}
                            </span>
                        </div>
                    ))
                ) : (
                    <span className="empty-tasks">You have no tasks</span>
                )}

                <div className="btn-new-task">
                    <Button onClick={handleOpenModal}>New Task</Button>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="taskTitle">
                            <Form.Label>Task title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task title here."
                                ref={taskTitle}
                            />
                        </Form.Group>
                        <Form.Group controlId="taskSummary">
                            <Form.Label>Task description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task description here."
                                ref={taskSummary}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={createTask}>
                        Create task
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ToDo;
