import { Timer, Search, BellDot, CircleUser, ChevronDown, Trash, Pencil, Plus, X } from 'lucide-react';

export function FormCreate({handleChange, projectName, author, onclick, handleSubmit, description}) {
    return (
        <>
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
                                    value={projectName}
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
                                    value={author}
                                    className="w-full border rounded-md px-2 py-1 text-sm focus:outline-none border-gray-300"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 justify-start col-span-1">
                            <button className="hover:border rounded-lg p-1 hover:border-orange-300" onClick={onclick}>
                                <Trash className="w-5" />
                            </button>
                            {/* <button className="hover:border rounded-lg p-1 hover:border-orange-300" onClick={() => {
                                setShowCreateForm(!showCreateForm)
                            }}>
                                <Trash className="w-5" />
                            </button> */}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold opacity-80">Description</label>
                        <textarea
                            placeholder="Describe your project..."
                            value={description}
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
                            value={status}
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
        </>
    )
}