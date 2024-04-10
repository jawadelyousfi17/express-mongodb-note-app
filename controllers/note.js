const Note = require('../models/note')
const User = require('../models/user')

const addNote = async (req, res) => {
    const { title, notebody } = req.body
    try {
        const user = res.locals.user
        console.log(user)
        if (user) {
            const note = await Note.create({ title, notebody })
            user.notes.push(note)
            await user.save()
            res.redirect('/notes')
        }
    } catch (error) {
        res.json(error)
    }
}

const getNotes = async (req, res) => {
    try {
        const user = await res.locals.user.populate('notes')
        if (!user) res.status(400).json({ message: "error no user found" })
        res.render('notes', {
            notes: user.notes
        })
    } catch (error) {
        res.status(500).json({ message: "error no user found" })
    }
}

const get_newNote = async (req, res) => {
    res.render('new-note', {
    })
}

const edit_get = async (req, res) => {

    try {
        const note = await Note.findById(req.params.id)
        res.render('edit', {
            note
        })
    } catch (error) {
        res.status(401).json(error)
    }

}
const edit_post = async (req, res) => {
    const {title , notebody} = req.body
    try {
        const note = await Note.findByIdAndUpdate(req.params.id , {title , notebody})
        console.log(note)
        res.redirect('/notes')
    } catch (error) {
        res.status(401).json(error)
    }

}

module.exports = { addNote, getNotes, get_newNote, edit_get , edit_post}