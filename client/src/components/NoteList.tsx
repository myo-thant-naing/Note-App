import { useEffect, useState, type FormEvent } from "react"
import { createNote, deleteNote, getNotes, updateNote } from "../services/note";
import type { Note } from "../types/note";


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
        <div>
            <h2>Note Lists</h2>
            {loading && <p>Loading</p>}
            <ul>
                {
                    notes.map(note => (
                        <li key={note._id}>{note.title}
                            <button type="button" onClick={() => handleDeleteNote(note._id)}>delete</button>
                            <button type="button" onClick={() => changeMode(note._id, note.title)}>edit</button>
                        </li>
                    ))
                }
            </ul>
            <form action="" onSubmit={submitHandler}>
                <input type="text" onChange={(e) => setText(e.target.value)} value={text} />
                <button type="submit">{editMode ? "Update" : "Save"}</button>
            </form>

        </div>
    )
}
