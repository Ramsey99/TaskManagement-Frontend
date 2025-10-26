import React, { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "../api/axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletetasks, setDeleteTask] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.warn("You must log in first ot add task");
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first to add task.");
      setForm({ title: "", description: "" });
      return;
    }

    try {
      if (editingTask) {
        await updateTask(editingTask._id, form);
        alert("Task updated successfully!");
      } else {
        await addTask(form);
        alert("Task added successfully!");
      }

      setForm({ title: "", description: "" });
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      alert("Something went wrong. Please login again");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setForm({ title: task.title, description: task.description });
  };

  const cancelUpdate = () => {
    setEditingTask(null);
    setForm({ title: "", description: "" });
  };

  const handleDelete = async (task) => {
    await deleteTask(task._id);
    alert("Task deleted successfully!");
    fetchTasks();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const filterTask = tasks.filter((task) =>
    task.title.toLowerCase().includes(filters.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Tasks</h4>

          <input
            type="search"
            className="form-control w-100 w-md-50"
            placeholder="Search..."
            value={filters}
            onChange={(e) => setFilters(e.target.value)}
            style={{ maxWidth: "300px" }}
          />
        </div>
        
        <div className="card-body">
          {user?.role !== "admin" && (
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-row">
                <div className="col-md-4 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-2 mb-2">
                  <button type="submit" className="btn btn-success w-100">
                    {editingTask ? "Update" : "Add"}
                  </button>

                  {editingTask && (
                    <button
                      type="button"
                      className="btn btn-danger w-100 mt-2"
                      onClick={cancelUpdate}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}

          <ul className="list-group">
            {filterTask.map((task) => {
              const isUpdated =
                task.updatedAt && task.updatedAt !== task.createdAt;

              return (
                <li
                  key={task._id}
                  className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row"
                >
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{task.title}</strong>
                        <p className="mb-1 text-muted small">
                          {task.description}
                        </p>
                        {user?.role === "admin" && task.user_id && (
                          <p className="mb-1 text-info small">
                            👤 Created by: <strong>{task.user_id.name}</strong>
                          </p>
                        )}
                      </div>

                      {user?.role !== "admin" && (
                        <div>
                          <button
                            className="btn btn-sm btn-outline-primary mr-2"
                            onClick={() => handleEdit(task)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                              setDeleteTask(task);
                              setDeleteModal(true);
                            }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      )}
                    </div>

                    <small className="text-secondary">
                      {isUpdated
                        ? `🕒 Updated: ${formatDate(task.updatedAt)}`
                        : `📅 Created: ${formatDate(task.createdAt)}`}
                    </small>
                  </div>
                </li>
              );
            })}
          </ul>

          {deleteModal && (
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content shadow-lg">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Delete</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setDeleteModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to delete this task?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setDeleteModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={async () => {
                        await handleDelete(deletetasks);
                        setDeleteModal(false);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!token ? (
            <p className="text-center text-muted mt-3">
              You must <strong>login or sign up</strong> to add or view tasks.
            </p>
          ) : filterTask.length === 0 ? (
            <p className="text-center text-muted mt-3">No tasks found.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
