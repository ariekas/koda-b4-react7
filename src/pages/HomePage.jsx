
import { Timer, Search, BellDot, CircleUser, ChevronDown, Trash, Pencil, Plus, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { CardTask } from '../components/CardTask';
import { FormCreate } from '../components/FormCreate';

export default function HomePage() {
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
                        tasks.map((tasks, index) => (
                            <CardTask index={index} projectName={tasks.projectName} author={tasks.author} description={tasks.description} date={tasks.date} status={tasks.status} onClickEdit={() => {
                                handleEdit(index)
                            }} onClickDelete={() => {
                                openConfirm(index)
                            }} />
                        ))
                    }

                    <button className='p-5 border border-gray-300 rounded-md relative flex justify-center items-center h-60 cursor-pointer' onClick={toggleShow}>
                        <Plus className="w-20 h-20 opacity-30" strokeWidth={1} />
                    </button>

                    {showCreateForm && (
                        <>
                          <FormCreate handleChange={handleChange} projectName={input.projectName} author={input.author} onclick={() => {setShowCreateForm(!showCreateForm)}} handleSubmit={handleSubmit} description={input.description}/>
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