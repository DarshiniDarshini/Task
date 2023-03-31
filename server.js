const  express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const { error } = require("console");
const { request } = require("http");
const { response } = require("express");


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    Credential: true,
    origin:"*"
}));  

const http = require("http").createServer(app);
const Connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    PORT:"8080",
    database:"backendserver"
})
Connection.connect((error)=>{
    if (error){
        throw error;
    }
    else{
        console.log("mysql database is connected successfully");
    }
});
const tableName = "loginPage";
const serverError = "something went wrong pls try again later";
//get 
app.get("/user",(request,response)=>{
    const sqlQuery = `select * from ${tableName}`;
    Connection.query(sqlQuery,(error,result)=>{
        if (error){
            response.status(500).send({
                message: serverError,
                actualError : error
            })
        }
        else{
            response.status(200).send(result);
        }
    })

})
//post
app.post("/submit",(request,response)=>{
    const name = request.body.name;
    if(name ==""|| name== undefined){
        response.status(400).send({
            message: "Invalid Name"
        });
        return;
         }
         const email = request.body.email;
    if(name ==""|| name== undefined){
        response.status(400).send({
            message: "Invalid email"
        });
        return;
    }
    const subject= request.body.subject;
    if(name ==""|| name== undefined){
        response.status(400).send({
            message: "Invalid subject"
        });
        return;
    }
    const message = request.body.message;
    if(name ==""|| name== undefined){
        response.status(400).send({
            message: "Invalid message"
        });
        return;
    }
    const sqlQuery= `INSERT INTO ${tableName}(name,email,subject,message) VALUES('${name}','${email}', '${subject}','${message}')`;

    Connection.query(sqlQuery,(error,result)=>{
        if (error){
            response.status(500).send({
            actualError: error,
            message: serverError
            })
        }
        else{
            response.status(200).send({
                actualResult: result,
                message:"successfully submittted!!"
            })
        }
    })
})



const port = process.env.PORT|| 4000;
http.listen(port,()=>{
    console.log("node js server is running on port 4000");
})