let fs = require("fs");

class Employee {
    constructor(username, password, position) {
        this.username = username;
        this.password = password;
        this.position = position;
        this.login = false;
    }

    // Menampilkan semua employee dari JSON
    static findAll(cb) {
        fs.readFile("./employee.json", "utf8", (err, data) => {
            if (err) {
                cb(err, []);
            } else {
                cb(null, JSON.parse(data));
            }
        });
    }

    // Mendaftarkan karyawan baru
    static register(name, password, role, cb) {
        this.findAll((err, employees) => {
            if (err) {
                cb(err, null);
            } else {
                // Cek apakah username sudah terdaftar
                let existingUser = employees.find(emp => emp.username === name);
                if (existingUser) {
                    return cb("Username sudah terdaftar!", null);
                }

                let newEmployee = new Employee(name, password, role);
                employees.push(newEmployee);

                fs.writeFile("./employee.json", JSON.stringify(employees, null, 2), (err) => {
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, { employee: newEmployee, total: employees.length });
                    }
                });
            }
        });
    }

    // Login karyawan
    static login(username, password, cb) {
        this.findAll((err, employees) => {
            if (err) {
                cb(err, null);
            } else {
                let user = employees.find(emp => emp.username === username && emp.password === password);
                
                if (!user) {
                    return cb("Username atau password salah!", null);
                }

                // Cek apakah sudah ada yang login
                let loggedInUser = employees.find(emp => emp.login === true);
                if (loggedInUser) {
                    return cb("Sudah ada user yang login. Logout dulu sebelum login yang lain.", null);
                }

                // Set login status
                user.login = true;
                fs.writeFile("./employee.json", JSON.stringify(employees, null, 2), (err) => {
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, user);
                    }
                });
            }
        });
    }

    // Logout karyawan yang sedang login
    static logout(cb) {
        this.findAll((err, employees) => {
            if (err) {
                cb(err, null);
            } else {
                let loggedInUser = employees.find(emp => emp.login === true);
                
                if (!loggedInUser) {
                    return cb("Tidak ada user yang sedang login!", null);
                }

                // Logout user
                loggedInUser.login = false;
                fs.writeFile("./employee.json", JSON.stringify(employees, null, 2), (err) => {
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, "Logout berhasil.");
                    }
                });
            }
        });
    }

    // Menampilkan semua karyawan (Hanya bisa dilakukan oleh Admin)
    static getAllEmployees(cb) {
        this.findAll((err, employees) => {
            if (err) {
                cb(err, null);
            } else {
                // Cek apakah user yang login adalah Admin
                let loggedInUser = employees.find(emp => emp.login === true);
                if (!loggedInUser || loggedInUser.position !== "admin") {
                    return cb("Hanya admin yang dapat melihat data semua karyawan!", null);
                }

                cb(null, employees);
            }
        });
    }

    // Mengecek apakah user yang login adalah dokter
    static checkDoctorPermission(cb) {
        this.findAll((err, employees) => {
            if (err) {
                cb(err, false);
            } else {
                let loggedInUser = employees.find(emp => emp.login === true);
                if (!loggedInUser || loggedInUser.position !== "dokter") {
                    return cb(null, false);
                }
                cb(null, true);
            }
        });
    }
}

module.exports = Employee;
