
import { Timer, Search, BellDot, CircleUser, ChevronDown, Trash, Pencil, Plus, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [input, setInput] = useState({
    projectName: "",
    author: "",
    description: "",
    status: "RESEARCH",
    date: new Date().toISOString().split("T")[0],
  })
  const [tasks, setTasks] = useState([]);
  const deleteIndexRef = useRef(null);
  const confirmRef = useRef(null);
  const [editIndex, setEditIndex] = useState(null);

  function toggleShow() {
    setShowCreateForm(!showCreateForm)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setInput((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    const oldData = localStorage.getItem("data")
    if (oldData) {
      try {
        const task = JSON.parse(oldData)
        setTasks(Array.isArray(task) ? task : [task])
      } catch (error) {
        console.log("error geting data", error)
      }

    }
  }, [])

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(tasks))
  }, [tasks])

  function handleSubmit(e) {
    e.preventDefault()

    if (editIndex !== null) {
      // edit
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { ...input };
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      // create
      const newTask = {
        ...input,
        date: new Date().toISOString().split("T")[0],
      };
      setTasks((prev) => [...prev, newTask]);
    }


    setInput({
      projectName: "",
      author: "",
      description: "",
      status: "RESEARCH",
      date: new Date().toISOString().split("T")[0],
    });
    setShowCreateForm(!showCreateForm)
  }


  function openConfirm(index) {
    deleteIndexRef.current = index;
    confirmRef.current.showModal();
  }

  function confirmDelete() {
    const index = deleteIndexRef.current;
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("data", JSON.stringify(updatedTasks));
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
  return (
    <>

      <div className='container mx-auto mt-5 gap-10 flex flex-col'>
        <div className='flex items-center justify-between'>
          <h1 className="text-orange-700 text-3xl font-semibold">Projects</h1>
          <div className='flex items-center gap-10'>
            <Timer />
            <Search />
            <BellDot />
            <CircleUser />
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <button className='py-2 px-5 bg-orange-500  text-white rounded-full' onClick={toggleShow}>
            Create Task
          </button>
          <div className='flex items-center gap-5'>
            <div className='flex items-center gap-2 border border-gray-500 py-1 px-3 rounded-full'>
              Active
              <ChevronDown />
            </div>
            <div className='flex items-center gap-2 border border-gray-500 py-1 px-3 rounded-full'>
              By Time
              <ChevronDown />
            </div>
            <div className='flex items-center gap-2 border border-gray-500 py-1 px-3 rounded-full'>
              Category
              <ChevronDown />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-4 gap-5'>
          {
            tasks.map((tasks, index) => {
              return (
                <>
                  <div className='p-5 border border-gray-300 rounded-md relative flex flex-col justify-between h-60' key={index}>
                    <div className='flex flex-col gap-5'>
                      <div className='grid grid-cols-3 gap-5 border-b pb-2 border-gray-300'>
                        <div className='flex flex-col gap-2 items-start col-span-2'>
                          <p className='text-lg font-semibold'>{tasks.projectName}</p>
                          <p className='text-xs opacity-50'>Author: {tasks.author}</p>
                        </div>
                        <div className='flex flex-col items-end gap-2 col-span-1'>
                          <button
                            onClick={() => openConfirm(index)}
                            className='hover:border rounded-lg p-0.5 hover:border-orange-300'
                          >
                            <Trash className='w-6 h-6' />
                          </button>
                          <button
                            onClick={() => handleEdit(index)}
                            className="hover:border rounded-lg p-1 hover:border-orange-300"
                          >
                            <Pencil className="w-5" />
                          </button>
                        </div>
                      </div>
                      <p className='text-sm opacity-70'>{tasks.description}</p>
                    </div>
                    <div className='flex items-center justify-between '>
                      <p className='text-sm opacity-50'>{tasks.date}</p>
                      <div className='px-2 text-sm bg-pink-300 rounded-l-full absolute right-0'>
                        <p className='text-XS opacity-50 p-0.5'>{tasks.status}</p>
                      </div>
                    </div>
                  </div>
                </>
              )
            })
          }

          <button className='p-5 border border-gray-300 rounded-md relative flex justify-center items-center h-60 cursor-pointer' onClick={toggleShow}>
            <Plus className="w-20 h-20 opacity-30" strokeWidth={1} />
          </button>

          {showCreateForm && (
            <>
              {/* Create Task */}
              <form className="p-5 border border-gray-300 rounded-md relative flex flex-col justify-between h-auto" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-3">
                    <div className="flex flex-col gap-3 items-start w-full col-span-2">
                      <input type="date" name='date' onChange={handleChange} className='hidden' />
                      <div>
                        <label className="text-sm font-semibold opacity-80">Project Name</label>
                        <input
                          type="text"
                          placeholder="Masukan project"
                          value={input.projectName}
                          name="projectName"
                          className="w-full border rounded-md px-2 py-1 text-sm focus:outline-none border-gray-300"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold opacity-80">Author</label>
                        <input
                          type="text"
                          name="author"
                          placeholder="Masukan Author"
                          value={input.author}
                          className="w-full border rounded-md px-2 py-1 text-sm focus:outline-none border-gray-300"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 justify-start col-span-1">
                      <button className="hover:border rounded-lg p-1 hover:border-orange-300" onClick={()=> {
                        setShowCreateForm(!showCreateForm)
                      }}>
                        <Trash className="w-5" />
                      </button>
                    
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-semibold opacity-80">Description</label>
                    <textarea
                      placeholder="Describe your project..."
                      value={input.description}
                      name="description"
                      className="border rounded-md p-2 text-sm h-20 resize-none focus:outline-none border-gray-300"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-7">
                  <p className='text-sm opacity-70 text-black'>Status</p>
                  <div className="px-2 text-sm bg-pink-300 rounded-l-full absolute right-0">
                    <select className="bg-pink-300 text-xs opacity-70 p-0.5 rounded-l-full focus:outline-none"
                      onChange={handleChange}
                      value={input.status}
                      name="status">
                      <option>RESEARCH</option>
                      <option>DESIGN</option>
                      <option>DEVELOPMENT</option>
                    </select>
                  </div>
                </div>

                <button className="mt-5 bg-orange-500/80 hover:bg-orange-500 text-white py-2 rounded-md text-sm " type='submit'>
                  Save Project
                </button>
              </form>
              {/*  */}
            </>
          )}
        </div>
        <dialog
          ref={confirmRef}
          className="rounded-lg p-5 w-80 backdrop:bg-black/40 shadow-xl m-auto"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Hapus Task?</h3>
            <button onClick={cancelDelete}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-5">
            Apakah kamu yakin ingin menghapus task ini?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={cancelDelete}
              className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
            >
              Batal
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
            >
              Hapus
            </button>
          </div>
        </dialog>
      </div>
    </>
  )
}