import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

const MyTaskComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("You must be logged in.");

      const res = await axios.get("https://e2425-wads-l4bcg3-haidar.csbihub.id/service/todo/get_all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      toast.error("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setSelectedTask(task);
    setUpdatedTitle(task.todo_name); // Assuming task field is `todo_name`
    setUpdatedDescription(task.todo_desc); // Assuming task field is `todo_desc`
    document.getElementById("update-modal").showModal();
  };

  const handleUpdateTask = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("You must be logged in.");

      await axios.patch(
        `https://e2425-wads-l4bcg3-haidar.csbihub.id/service/todo/update_todo/${selectedTask._id}`,
        {
          todo_name: updatedTitle,
          todo_desc: updatedDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task updated successfully.");
      fetchTasks();
      document.getElementById("update-modal").close();
    } catch (error) {
      console.error("Update task error:", error);
      toast.error("Failed to update task.");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("You must be logged in.");

      await axios.delete(`https://e2425-wads-l4bcg3-haidar.csbihub.id/service/todo/delete_todo/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Task deleted.");
      fetchTasks();
    } catch (error) {
      console.error("Delete task error:", error);
      toast.error("Failed to delete task.");
    }
  };

  return (
    <div>
      {loading && <p className="text-gray-600">Loading tasks...</p>}

      {!loading && tasks.length === 0 && (
        <p className="text-gray-500">No tasks available.</p>
      )}

      {!loading &&
        tasks.map((task) => (
          <div
            key={task._id}
            className="flex flex-col gap-2 mt-2 p-3 text-white bg-green-700 rounded-md shadow-md"
          >
            <h1 className="text-xl font-semibold mb-2">{task.todo_name}</h1>
            <p className="text-sm text-gray-100">{task.todo_desc}</p>

            <div className="flex w-full justify-end items-center gap-4 mt-4">
              <button
                className="btn btn-primary text-white flex gap-1 px-3"
                onClick={() => handleEdit(task)}
              >
                <FaRegEdit className="text-base" />
                Edit
              </button>

              <button
                className="btn btn-error bg-red-600 text-white flex gap-1 px-3"
                onClick={() => handleDelete(task._id)}
              >
                <MdDeleteOutline className="text-lg" />
                Delete
              </button>
            </div>
          </div>
        ))}

      {/* Update Task Modal */}
      <dialog id="update-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Task</h3>
          <div className="py-4">
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />

            <label className="block text-gray-700 font-medium mt-3">
              Description
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="modal-action">
            <button
              className="btn btn-primary text-white"
              onClick={handleUpdateTask}
            >
              Save Changes
            </button>
            <button
              className="btn"
              onClick={() => document.getElementById("update-modal").close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyTaskComponent;
