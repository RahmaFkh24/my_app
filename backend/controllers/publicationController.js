const asyncHandler = require('express-async-handler')
const Publication = require('../models/publicationModel')
const User = require('../models/userModel')
//@description     Get publications
//@route           GET /api/publications
//@access          private

const getPublications = asyncHandler(async (req, res) => {
    const publications = await Publication.find({ user: req.user.id })
    res.status(200).json(publications)
})
//@description     set publications
//@route           put /api/publications
//@access          private

const setPublications = asyncHandler(async (req, res) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')

    }

    const publication = await Publication.create({
        // title: req.body.title,
        text: req.body.text,
        user: req.user.id,
        //image: req.body.image,
    });
    res.status(200).json(publication)
})

//@description     update publications
//@route           PUT /api/publications/
//@access          private


const updatePublications = asyncHandler(async (req, res) => {
    const publication = await Publication.find({ user: req.params.id })
    if (!publication) {
        res.status(400)
        throw new Error('Publication not found')
    }
    const user = await User.findById(req.params.id)
    //check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the publication user
    if (publication.user.toString() !== req.user.id) {

        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedpub = await Publication.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    res.status(200).json(updatedpub)
})

//@description     delete publications
//@route           delete /api/publications/:id
//@access          private


const deletePublications = asyncHandler(async (req, res) => {
    const publication = await Publication.find(req.params.id)


    if (!publication) {
        res.status(400)
        throw new Error('Publication not found')
    }
    const user = await User.findById(req.user.id)
    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the publication user
    if (publication.user.toString() !== req.user.id) {

        res.status(401)
        throw new Error('User not authorized')
    }
    await publication.remove()


    res.status(200).json({ id: req.params.id })
}
)



module.exports = {
    getPublications,
    setPublications,
    updatePublications,
    deletePublications
}