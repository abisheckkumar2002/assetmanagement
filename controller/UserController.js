const Employee = require("../model/user.js");

exports.create = async (req, res) => {
  console.log(req.body, "reqbody");
  try {
    await Employee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNo: req.body.phoneNo,
      EmpId:req.body.EmpId,
      email: req.body.email,
      address: req.body.address,
      status: "Active",
    });
   res.redirect('/users');
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while creating the employee.",
      details: err.message,
    });
  }
};

exports.findOne = async (req, res) => {
  const condition = {
    id: req.params.id,
    status: "Active",
  };
  try {
    const data = await Employee.findOne({ where: condition });

    if (!data) {
      
      res.status(404).json({
        error: "Employee is not found",
        status: 404,
      });
    }
    res.render('view/user/view.pug',{data})

   
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while creating the employee.",
      details: err.message,
    });
  }
};


exports.addUserPage =async(req,res)=>{

  res.render('view/user/add.pug')
}


exports.editUserPage =async(req,res)=>{

  const condition = {
    id: req.params.id,
    status: "Active",
  };
  const {dataValues}= await Employee.findOne({ where: condition });
  

  res.render('view/user/edit.pug',{dataValues})
}


exports.index = async (req, res) => {
  const condition = { status: "Active" };
  const data = await Employee.findAll(condition);

  try {
    if (data.length > 0) {
      res.render('view/user/index.pug',{data});
   
    } else {
      res.status(404).json({
        status: 404,
        error: "No Employee Record Found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while creating the employee.",
      details: err.message,
    });
  }
};

exports.updateOne = async (req, res) => {
  const condition = {
    id: req.params.id,
    status: "Active",
  };

  try {

  console.log("ddddddddddddddddddddddddddddddddddd")
    const data = await Employee.findOne({ where: condition });

    if (!data) {
      res.status(404).json({
        error: "No Employee Record Found",
      });
    } else {
      const updatedData = await Employee.update(req.body, { where: condition });

      if (updatedData) {
        res.redirect('/users/')
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while creating the employee.",
      details: err.message,
    });
  }
};

exports.deleteOne = async (req, res) => {
  console.log("hiiiiiiiiiiii");

  const condition = {
    id: req.params.id,
    status: "Active",
  };

  try {
    // Find the active employee by ID
    const employee = await Employee.findOne({ where: condition });

    if (!employee) {
      return res.status(404).json({
        error: "No Employee Record Found",
      });
    } 
    
    // Update the status to "InActive"
    const updatedData = await Employee.update(
      { status: "InActive" },  
      { where: condition }      
    );

    if (updatedData[0] === 1)
       { 
      return res.redirect('/users');
    } else {
      return res.status(400).json({
        error: "Failed to update the employee status.",
      });
    }
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while updating the employee status.",
      details: err.message,
    });
  }
};
