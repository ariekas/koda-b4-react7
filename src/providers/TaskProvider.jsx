import { useState, useEffect, useRef } from 'react';
import { TaskContext } from '../context/TaskContext';

export function TaskProvider({ children }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [input, setInput] = useState({
    projectName: "",
    author: "",
    description: "",
    status: "RESEARCH",
    date: new Date().toISOString().split("T")[0],
  });
  const [tasks, setTasks] = useState([]);
  const deleteIndexRef = useRef(null);
  const confirmRef = useRef(null);
  const [editIndex, setEditIndex] = useState(null);

  // Load tasks from memory on mount
  useEffect(() => {
    const savedTasks = window.task || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to memory on change
  useEffect(() => {
    window.task = tasks;
  }, [tasks]);

  function toggleShow() {
    setShowCreateForm(!showCreateForm);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editIndex !== null) {
      // Edit existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { ...input };
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      // Create new task
      const newTask = {
        ...input,
        date: new Date().toISOString().split("T")[0],
      };
      setTasks((prev) => [...prev, newTask]);
    }

    // Reset form
    setInput({
      projectName: "",
      author: "",
      description: "",
      status: "RESEARCH",
      date: new Date().toISOString().split("T")[0],
    });
    setShowCreateForm(false);
  }

  function openConfirm(index) {
    deleteIndexRef.current = index;
    confirmRef.current.showModal();
  }

  function confirmDelete() {
    const index = deleteIndexRef.current;
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    confirmRef.current.close();
  }

  function cancelDelete() {
    deleteIndexRef.current = null;
    confirmRef.current.close();
  }

  function handleEdit(index) {
    const task = tasks[index];
    setInput(task);
    setEditIndex(index);
    setShowCreateForm(true);
  }

  const value = {
    // State
    showCreateForm,
    input,
    tasks,
    editIndex,
    deleteIndexRef,
    confirmRef,
    
    // Functions
    toggleShow,
    handleChange,
    handleSubmit,
    openConfirm,
    confirmDelete,
    cancelDelete,
    handleEdit,
    setShowCreateForm
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}