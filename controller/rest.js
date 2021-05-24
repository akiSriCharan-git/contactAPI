const User = require('./../models/user');
const Contact = require('./../models/contact')

//getAll
exports.getAll = async (req, res)=>{
  try{
    const contact = await Contact.find({ownedBy: req.userData._id})
    return res.status(200).json(contact)
  }catch(err){
    console.log(err)
    return res.status(500).json({
      error: true
    })
  }
}

//getOne
exports.getOne = async (req, res)=>{
  try{
    const contact = await Contact.findOne({_id: req.params.contactId, ownedBy: req.userData._id})
    if(contact){
      return res.status(200).json(contact)
    }else{
      return res.status(400).json({
        message: 'No contact with that provided contactId in your contact list'
      })
    }
  }catch(err){
    console.log(err)
    return res.status(400).json({
      error: true,
      message: err.message
    })
  }
}

//create
exports.create = async (req, res)=>{
  try{
    const already_name = await Contact.findOne({name: req.body.name, ownedBy: req.userData._id})
    if(already_name){
      return res.status(200).json({
        message: 'There is already a contact with that name, use another name'
      })
    }
    const already_email = await Contact.findOne({email: req.body.email, ownedBy: req.userData._id})
    if(already_email){
      return res.status(200).json({
        message: 'There is already a contact with that email'
      })
    }
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      company: req.body.company,
      ownedBy: req.userData._id
    })
    contact.save()
    return res.status(201).json({
      message: 'Contact created successfully'
    })

  }catch(err){
    console.log(err)
    return res.status(500).json({
      error: true
    })
  }
}

//put
exports.put = async (req, res)=>{
  try{
    const contact = await Contact.findOne({_id: req.params.contactId, ownedBy: req.userData._id})
    if(contact){
      const update = await Contact.updateOne(
        {_id: req.params.contactId, ownedBy: req.userData._id},
        {name: req.body.name, email: req.body.email, phone: req.body.phone, company: req.body.company},
      )
      .then(()=>{
        return res.status(200).json({
          message: "updated successfully"
        })
      })
      .catch((err)=>{
        return res.status(500).json({
          error: true,
          message: "update failed"
        })
      })
      }else{
        return res.status(400).json({
          error: true,
          message: "No contact with that provided contactId in your contact list"
        })
      }
    }catch(err){
    console.log(err)
    return res.status(500).json({
      error: true,
      message: "update failed"
    })
  }
}

//patch
exports.patch = async (req, res)=>{
  try{
    const contact = await Contact.findOne({_id: req.params.contactId, ownedBy: req.userData._id})
    if(contact){
      const update = await Contact.updateOne(
        {_id: req.params.contactId, ownedBy: req.userData._id},
        {$set: req.body},
      )
      .then(()=>{
        return res.status(200).json({
          message: "updated successfully"
        })
      })
      .catch((err)=>{
        return res.status(500).json({
          error: true,
          message: "update failed"
        })
      })
      }else{
        return res.status(400).json({
          error: true,
          message: "No contact with that provided contactId in your contact list"
        })
      }
    }catch(err){
    console.log(err)
    return res.status(500).json({
      error: true,
      message: "update failed"
    })
  }
}

//delete all
exports.deleteAll = async (req, res)=>{
  try{
    const del = await Contact.deleteMany({ownedBy: req.userData._id});
    return res.status(200).json({
      message: "All contacts deleted"
    })
  }catch(err){
    console.log(err)
    return res.status(500).json({
      error: true,
      message: "deletion failed"
    })
  }
}

//delete one
exports.deleteOne = async (req, res)=>{
  try{
    const contact = await Contact.findOne({_id: req.params.contactId, ownedBy: req.userData._id})
    if(contact){
      const del = await Contact.deleteOne({_id: req.params.contactId, ownedBy: req.userData._id})
      .then(()=>{
        return res.status(200).json({
          message: "deleted successfully"
        })
      })
      .catch((err)=>{
        return res.status(500).json({
          error: true,
          message: "deletion failed"
        })
      })
      }else{
        return res.status(400).json({
          error: true,
          message: "No contact with that provided contactId in your contact list"
        })
      }
    }catch(err){
    console.log(err)
    return res.status(500).json({
      error: true,
      message: "deletion failed"
    })
  }
}
