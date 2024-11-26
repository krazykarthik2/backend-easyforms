const fs = require("fs")
// Submit a response for a form
exports.adminHelp = async (req, res) => {
    try {
        fs.readFile('help/admin-help.md','utf-8',(err,data)=>{
            res.status(201).json({
                data:data
            });
        })
    } catch (error) {
        console.log("respondToForm", error);
        res.status(500).json({ message: error.message });
    }
};
exports.userHelp = async (req, res) => {
    try {
        fs.readFile('help/user-help.md','utf-8',(err,data)=>{
            res.status(201).json({
                data:data
            });
        })
    } catch (error) {
        console.log("respondToForm", error);
        res.status(500).json({ message: error.message });
    }
};
exports.notLoggedInHelp = async (req, res) => {
    try {
        fs.readFile('help/not-logged-in-help.md','utf-8',(err,data)=>{
            if (err) {
                if (err.code === "ENOENT") {
                    console.error("File not found:", err.path);
                } else {
                    console.error("Error reading file:", err);
                }
                return;
            }
            res.status(201).json({
                data:data
            });
            console.log(data)
        })
        console.log('hey')
    } catch (error) {
        console.log("respondToForm", error);
        res.status(500).json({ message: error.message });
    }
};
        
