const Employee = require('../models/employee.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
 // Validate request
 if(!req.body.firstName) {
    return res.status(400).send({
        message: "Employee firstName can not be empty"
    });
}

// Create a Note
const employee = new Employee({
    firstName: req.body.firstName || "Untitled firstName", 
    lastName: req.body.lastName,
    emailId: req.body.emailId
});

// Save Note in the database
employee.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the Employee."
    });
});
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Employee.find()
    .then(employees => {
        res.send(employees);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving employees."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Employee.findById(req.params.id)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "employee not found with id " + req.params.id
            });            
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "employee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving employee with id " + req.params.id
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
 // Validate Request
 if(!req.body.firstName) {
    return res.status(400).send({
        message: "Employee firstName can not be empty"
    });
}

Employee.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName || "Untitled Employee",
    lastName: req.body.lastName,
    emailId: req.body.emailId
}, {new: true})
.then(employee => {
    if(!employee) {
        return res.status(404).send({
            message: "Employee not found with id " + req.params.id
        });
    }
    res.send(note);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Employee not found with id " + req.params.id
        });                
    }
    return res.status(500).send({
        message: "Error updating Employee with id " + req.params.id
    });
});
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Employee.findByIdAndRemove(req.params.id)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.send({message: "Employee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Employee with id " + req.params.id
        });
    });
};