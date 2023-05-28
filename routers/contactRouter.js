const express = require ('express')
const { getContact, createContact, getContactUseId ,updateContact , deleteContact } = require('../controllers/contactController')
const validatToken = require('../middleware/validateTokenhandelar')
const router = express.Router()


router.use(validatToken)
router.route('/').get(getContact).post(createContact)
router.route('/:id').get(getContactUseId).put(updateContact).delete(deleteContact)


module.exports = router;