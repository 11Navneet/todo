import React, { useEffect, useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdAssignmentAdd } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axiosInstance from "../../utils/axiosInstance";

function Todo() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [listInput, setListInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const response = await axiosInstance.get("/todo");
        setTodo(response.data.data);
      } catch (error) {
        console.error("Error fetching todos:", error.message);
      }
    };
    getAllTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      const newTodo = { content: input };
      console.log(newTodo);
      const response = await axiosInstance.post("/todo/create", newTodo);
      setTodo([...todo, response.data.data]);
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
    setInput("");
  };

  const handleEditClick = (itemId) => {
    setIsEditing(true);
    setSelectedItemId(itemId);
    const existingTodo = todo.find((item) => item._id === itemId);
    setListInput(existingTodo.content);
  };

  const handleSaveEdit = async () => {
    if (!selectedItemId || !listInput.trim()) return;
    try {
      const updatedTodo = { content: listInput };
      const response = await axiosInstance.put("/todo/edit/${selectedItemId}",
        updatedTodo
      );
      const updatedTodos = todo.map((item) =>
        item._id === selectedItemId ? response.data.data : item
      );
      setTodo(updatedTodos);
      setIsEditing(false);
      setSelectedItemId(null);
    } catch (error) {
      console.error("Error editing todo:", error.message);
    }
  };

  const handleCompleted = async (id) => {
    if (!window.confirm("Are you sure this todo is completed?")) return;
    try {
      const updatedTodo = { completed: true };
      const response = await axiosInstance.put("/todo/edit/${id}",
        updatedTodo
      );
      const updatedTodos = todo.map((item) =>
        item._id === id ? response.data.data : item
      );
      setTodo(updatedTodos);
    } catch (error) {
      console.error("Error marking completed:", error.message);
    }
  };

  const handleDeleteClick = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    try {
      await axiosInstance.delete("/todo/delete/${itemId}");
      const filteredTodos = todo.filter((item) => item._id !== itemId);
      setTodo(filteredTodos);
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="todo-wrapper">
        <div className="todo-container">
          <h2 className="todo-header">YOUR TODO LIST</h2>
          <div className="todo-input">
            <form onSubmit={handleAddTodo}>
              <input
                type="text"
                name="todo"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
          {todo.length > 0 ? (
            <div className="todo-list">
              <ol>
                {todo.map((item, index) => (
                  <li key={index}>
                    {isEditing && selectedItemId === item._id ? (
                      <input
                        type="text"
                        value={listInput}
                        className="list-input"
                        onChange={(e) => setListInput(e.target.value)}
                        onBlur={handleSaveEdit}
                      />
                    ) : (
                      <span
                        style={{
                          textDecoration: item.completed
                            ? "line-through"
                            : "none",
                        }}
                        className="list"
                      >
                        {item.content}
                      </span>
                    )}
                    <div className="buttons-div">
                      {!item.completed && (
                        <>
                          {selectedItemId === item._id ? (
                            <Tooltip title="Update">
                              <IconButton>
                                <GrDocumentUpdate
                                  style={{ fontSize: "14px" }}
                                  onClick={() => handleEditClick(item._id)}
                                />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Edit">
                              <IconButton>
                                <LiaEdit
                                  style={{ fontSize: "17px" }}
                                  onClick={() => handleEditClick(item._id)}
                                />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Completed">
                            <IconButton>
                              <IoCheckmarkCircleOutline
                                style={{ fontSize: "17px" }}
                                onClick={() => handleCompleted(item._id)}
                                disabled={item.completed}
                              />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      <Tooltip title="Delete">
                        <IconButton>
                          <HiOutlineTrash
                            style={{ fontSize: "16px" }}
                            onClick={() => handleDeleteClick(item._id)}
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="no-item">
              <MdAssignmentAdd style={{ fontSize: "60px" }} />
              ADD TODO
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
