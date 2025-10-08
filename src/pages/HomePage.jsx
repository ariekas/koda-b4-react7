import { Timer, Search, BellDot, CircleUser, ChevronDown, Plus, X } from 'lucide-react';
import { CardTask } from '../components/CardTask';
import { FormCreate } from '../components/FormCreate';
import { TaskContext } from '../context/TaskContext';
import { useContext } from 'react';

export default function HomePage() {
  const {
    showCreateForm,
    input,
    tasks,
    confirmRef,
    toggleShow,
    handleChange,
    handleSubmit,
    openConfirm,
    confirmDelete,
    cancelDelete,
    handleEdit,
    setShowCreateForm
  } = useContext(TaskContext)

  return (
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
        <button className='py-2 px-5 bg-orange-500 text-white rounded-full' onClick={toggleShow}>
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
        {tasks.map((task, index) => (
          <CardTask
            key={index} 
            index={index}
            projectName={task.projectName}
            author={task.author}
            description={task.description}
            date={task.date}
            status={task.status}
            onClickEdit={() => handleEdit(index)}
            onClickDelete={() => openConfirm(index)}
          />
        ))}

        <button className='p-5 border border-gray-300 rounded-md relative flex justify-center items-center h-60 cursor-pointer' onClick={toggleShow}>
          <Plus className="w-20 h-20 opacity-30" strokeWidth={1} />
        </button>

        {showCreateForm && (
          <FormCreate 
            handleChange={handleChange} 
            projectName={input.projectName} 
            author={input.author} 
            onclick={() => setShowCreateForm(false)} 
            handleSubmit={handleSubmit} 
            description={input.description}
            status={input.status}
          />
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
  );
}