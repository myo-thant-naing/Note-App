import { useEffect, useState, type FormEvent } from "react"
import { createNote, deleteNote, getNotes, updateNote } from "../services/note";
import type { Note } from "../types/note";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"


export default function NoteList() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [text, setText] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState("");


    const makeRefresh = () => {
        setRefresh(!refresh)
    }

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await getNotes();
                setNotes(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                throw new Error("Failed to fetch.")

            }

        }
        fetchNotes()
    }, [refresh])

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (text.trim().length === 0) {
            return
        }
        try {
            if (editMode) {
                await updateNote(editId, text);
                setEditMode(false)
            } else {
                await createNote(text)
            }
            setText("")
            makeRefresh()
        } catch (error) {
            throw new Error("Failed to add note.")
        }


    }
    const handleDeleteNote = async (id: string) => {
        try {
            await deleteNote(id)
            makeRefresh()
        } catch (error) {
            throw new Error("Failed to delete note.")
        }
    }
    const changeMode = (id: string, title: string) => {
        setEditId(id);
        setText(title);
        setEditMode(true)
    }

    return (
        <div className="p-2">
            <h2 className="text-xl font-bold mb-2">Note List</h2>
            {loading && <p>Loading</p>}
            <ul className="">
                {
                    notes.map((note, index) => (
                        <li key={index} className={` hover:bg-gray-200 border-b border-gray-300 flex justify-between py-1 px-6 `}>
                            <p className="max-w-[80%]"><span className="font-bold">{index + 1}.</span> {" " + note.title}</p>
                            <div className="space-x-2">
                                <button type="button" onClick={() => changeMode(note._id, note.title)}>
                                    <PencilIcon className="w-5 cursor-pointer" />
                                </button>
                                <button type="button" onClick={() => handleDeleteNote(note._id)}>
                                    <TrashIcon className="w-5 cursor-pointer text-red-400" />
                                </button>

                            </div>
                        </li>
                    ))
                }
                {
                    notes.length === 0 && (
                        <p className="text-sm text-gray-400 text-center ">There is no note.</p>
                    )
                }
            </ul>
            <form action="" onSubmit={submitHandler} className="mt-10">

                <div className="flex space-x-2">
                    <input
                        type="text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        className="border text-sm py-1 px-4 rounded-full w-full"
                    />
                    <button className="cursor-pointer text-white text-sm bg-black py-1 px-4 border rounded-2xl" type="submit">{editMode ? "Update" : "Save"}</button>
                </div>

            </form>

        </div>
    )
}
