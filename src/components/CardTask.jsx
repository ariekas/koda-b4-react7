import { Timer, Search, BellDot, CircleUser, ChevronDown, Trash, Pencil, Plus, X } from 'lucide-react';

export function CardTask({ index, projectName, author, description, date, status, onClickEdit, onClickDelete }) {
    return (
        <>
            <div className='p-5 border border-gray-300 rounded-md relative flex flex-col justify-between h-60' key={index}>
                <div className='flex flex-col gap-5'>
                    <div className='grid grid-cols-3 gap-5 border-b pb-2 border-gray-300'>
                        <div className='flex flex-col gap-2 items-start col-span-2'>
                            <p className='text-lg font-semibold'>{projectName}</p>
                            <p className='text-xs opacity-50'>Author: {author}</p>
                        </div>
                        <div className='flex flex-col items-end gap-2 col-span-1'>
                            <button
                                onClick={onClickDelete}
                                className='hover:border rounded-lg p-0.5 hover:border-orange-300'
                            >
                                <Trash className='w-6 h-6' />
                            </button>
                            <button
                                onClick={onClickEdit}
                                className="hover:border rounded-lg p-1 hover:border-orange-300"
                            >
                                <Pencil className="w-5" />
                            </button>
                        </div>
                    </div>
                    <p className='text-sm opacity-70'>{description}</p>
                </div>
                <div className='flex items-center justify-between '>
                    <p className='text-sm opacity-50'>{date}</p>
                    <div className='px-2 text-sm bg-pink-300 rounded-l-full absolute right-0'>
                        <p className='text-XS opacity-50 p-0.5'>{status}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
