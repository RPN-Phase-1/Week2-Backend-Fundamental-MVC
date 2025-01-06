let fs = require("fs");

class Employee {
    constructor(username, password, position) {
        this.username = username;
        this.password = password;
        this.position = position;
        this.login = false;
    }

    static register(name, password, role, cb) {
        this.findAll((err, data) => {
            if (err) {
                return cb(err);
            }

            const employee = this.findOne(data, name);
            if (employee) {
                return cb(`${employee.username} is already registered`);
            }

            const newEmployee = new Employee(name, password, role);
            data.push(newEmployee);

            this.writeData(data, (writeErr) => {
                if (writeErr) {
                    return cb(writeErr);
                }
                cb(null, [newEmployee, data.length]);
            });
        });
    }

    static login(name, password, cb) {
        this.findAll((err, data) => {
            if (err) {
                return cb(err);
            }

            const loggedInEmployee = this.loggedIn(data);
            if (loggedInEmployee) {
                return cb(`${loggedInEmployee.username} is already logged in. Please log out before logging in again`);
            }

            const employee = this.findOne(data, name);
            if (!employee || employee.password !== password) {
                return cb(`Invalid username or password`);
            }

            employee.login = true;

            this.writeData(data, (writeErr) => {
                if (writeErr) {
                    return cb(writeErr);
                }
                cb(null, employee);
            });
        });
    }

    static logout(cb) {
        this.findAll((err, data) => {
            if (err) {
                return cb(err);
            }

            const loggedInEmployee = this.loggedIn(data);
            if (!loggedInEmployee) {
                return cb("No employee is currently logged in");
            }

            loggedInEmployee.login = false;

            this.writeData(data, (writeErr) => {
                if (writeErr) {
                    return cb(writeErr);
                }
                cb(null, loggedInEmployee);
            });
        });
    }

    static show() {
        return 1;
    }

    static authorize(data, role, cb) {
        const loggedInEmployee = this.loggedIn(data);
        if (!loggedInEmployee) {
            return cb("No employee is currently logged in");
        }

        if (loggedInEmployee.position !== role) {
            return cb(`Unauthorized: This action requires a ${role} role`);
        }

        cb(null);
    }

    static loggedIn(data) {
        return data.find((e) => e.login === true);
    }

    static findOne(data, name) {
        return data.find((e) => e.username === name);
    }

    static findAll(cb) {
        fs.readFile("./employee.json", "utf8", (err, data) => {
            if (err) {
                cb(err);
            }
            cb(err, JSON.parse(data));
        });
    }

    static writeData(data, cb) {
        fs.writeFile("./employee.json", JSON.stringify(data, null, 2), (err) => {
            if (err) {
                return cb(err);
            }
            cb(null);
        });
    }
}

module.exports = Employee;
