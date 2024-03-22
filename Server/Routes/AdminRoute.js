import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/adminlogin', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    
    // Get a connection from the pool
    req.pool.getConnection((err, connection) => {
        if (err) {
            console.error("Connection error:", err);
            return res.json({ loginStatus: false, error: "Database Connection Error" });
        }
        
        // Execute the query
        connection.query(sql, [email, password], (err, result) => {
            // Release the connection back to the pool
            connection.release();
            
            if (err) {
                console.error("Query error:", err);
                return res.json({ loginStatus: false, error: "Query Error" });
            }
            
            if (result.length > 0) {
                const email = result[0].email;
                const token = jwt.sign(
                    { role: "admin", email: email }, 
                    "JWT_SECRET_KEY",
                    { expiresIn: '1d' }
                );
                res.cookie('token', token);
                return res.json({ loginStatus: true, token: token });
            } else {
                return res.json({ loginStatus: false, error: "Wrong email or password" });
            }
        });
    });
});

// New route for adding a new log entry
router.post('/addNewLog', (req, res) => {
    const { logId, dateTimeOfVisit, detailsOfPerson, reasonForAttendance, protectiveClothingWorn, officerCompletingLog, leaveTime } = req.body;
    const sql = "INSERT INTO incidentlogs (logId, dateTimeOfVisit, detailsOfPerson, reasonForAttendance, protectiveClothingWorn, officerCompletingLog, leaveTime) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    // Get a connection from the pool
    req.pool.getConnection((err, connection) => {
        if (err) {
            console.error("Connection error:", err);
            return res.status(500).json({ error: "Database Connection Error" });
        }
        
        // Execute the query
        connection.query(sql, [logId, dateTimeOfVisit, detailsOfPerson, reasonForAttendance, protectiveClothingWorn, officerCompletingLog, leaveTime], (err, result) => {
            // Release the connection back to the pool
            connection.release();
            
            if (err) {
                console.error("Query error:", err);
                return res.status(500).json({ error: "Query Error" });
            }
            
            return res.json({ success: true });
        });
    });
});

export { router as adminRouter };





