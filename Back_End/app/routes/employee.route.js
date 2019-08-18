module.exports = (app) => {
    const employees = require('../controllers/employee.controller.js');

    // Create a new Note
    app.post('/api/v1/employees', employees.create);

    // Retrieve all Notes
    app.get('/api/v1/employees', employees.findAll);

    // Retrieve a single Note with noteId
    app.get('/api/v1/employees/:id', employees.findOne);

    // Update a Note with noteId
    app.put('/api/v1/employees/:id', employees.update);

    // Delete a Note with noteId
    app.delete('/api/v1/employees/:id', employees.delete);
}