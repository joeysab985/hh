const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// ประกาศใช้งาน cors และ express
app.use(cors());
app.use(express.json());

//การสร้าง object เพื่อเชื่อมต่อฐานข้อมูลโดยระบุ user,host,passwrd,database
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "employeeSystem",
});
//สร้าง api เพื่อดึวข้อมูลจากตาราง employees
app.get("/employees", (req, res) => {
    //เมื่อเชื่อมตต่อ api ได้ถูกต้องจะทำการ run คำสั่ง sql
    db.query("SELECT * FROM employees", (err, result) => {
      if (err) {
        //ถ้ามี error จะทำการแจ้ง error ผ่าน console
        console.log(err);
      } else {
        //ถ้าไม่มี error จะส่งผลลัพธ์กลับไป
        res.send(result);
      }
    });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});
