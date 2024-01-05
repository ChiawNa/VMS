const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;
const dbName = 'VMS';
const collection1 = "User"
const collection2 = "Visitor" 
//const mongoURI = process.env.MONGODB_URI
app.use(express.json());

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cybercafe Visitor Management System',
      description: 'API for managing visitors in a cybercafe',
      version: '1.0.0',
    },
  },
  apis: ['./Cybercafe.js'], //files containing annotations as above
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/group23', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//connect to mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kang:kangcn2001@cluster0.qsrp4df.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    app.use(express.json());
    app.listen(port, () => {
      console.log('Server listening at http://localhost:${port}');
    });
    

//user login configuration
app.post('/login', async (req, res) => {
  try{
    const result =  await login(req.body.username, req.body.password)
    if (result.message == 'Correct password') {
      const user1 = await client.db(dbName).collection(collection1).findOne({username: req.body.username});
      const token = await generateToken({ username: req.body.username , role: user1.role});
      res.send({ message: 'Successful login', token });
    } else {
      res.send('Login unsuccessful');
    }
  }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    };
});


//admin register user configuration
app.post('/register/admin', authenticateAdmin, async (req, res) => {
  let result = await registeradmin(
  req.body.username,
  req.body.password,
  req.body.email
  ); 
  res.send(result);
});

//admin register user configuration
app.post('/register/security', authenticateSecurity, async (req, res) => {
  let result = await registersecurity(
  req.body.username,
  req.body.password,
  req.body.email
  ); 
  res.send(result);
});
    

//user create visitor
    app.post('/create/visitor/admin', authenticateAdmin, async (req, res) => {
      const from = req.User.username;
      let result = createvisitor(
      req.body.visitorname,
      req.body.timespend,
      req.body.age,
      req.body.phonenumber,
      from
      ); 
      res.send(result);
  });

//Admin accepting the visitor pass
app.put('/retrieving/pass/:visitorname/:idproof', verifyAdminToken, async (req, res) => {
  const visitorname = req.params.visitorname;
  const idproof = req.params.idproof;

  try {
      const updateaccessResult = await client
          .db('VMS')
          .collection('Visitor')
          .updateOne({ visitorname,idproof },
              { $set: { entrytime,cabinno,computername,access } });

      if (updateaccessResult.modifiedCount === 0) {
          return res.status(404).send('visitor not found or unauthorized');
      }

      res.send('access updated successfully');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

/*    //start sini

    //see created user
    app.get('/view/user/admin', verifyToken, async (req, res) => {
      try {
      const result = await client
          .db('VMS')
          .collection('User')
          .find()
          .toArray();
    
      res.send(result);
      } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
      }
  });

    
    //create visitor
    app.post('/create/visitor', async (req, res) => {
      try {
        let result = await createvisitor(
          req.body.visitorname,
          req.body.idproof,
          req.body.entrytime
          ); 
          res.send(result);
      }
      catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        }
    });

    //create visitor (test)
    app.post('/create/test/visitor', async (req, res) => {
      try {
        let result = await createtestvisitor(
          req.body.visitorname,
          req.body.idproof,
          req.body.entrytime,
          req.body.approval
          ); 
          res.send(result);
      }
      catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        }
    });
    
    //see created visitor
    app.get('/view/visitor/admin', verifyToken, async (req, res) => {
        try {
        const result = await client
            .db('Cybercafe')
            .collection('Visitor')
            .find()
            .toArray();
    
        res.send(result);
        } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        }
    });

      //see created visitor (test)
      app.get('/view/test/visitor/admin', verifyToken, async (req, res) => {
        try {
        const result = await client
            .db('Cybercafe')
            .collection('Test')
            .find()
            .toArray();
    
        res.send(result);
        } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        }
    });
    

    //delete visitor
    app.delete('/delete/visitor/:idproof', verifyToken, async (req, res) => {
      const idproof = req.params.idproof;
    
      try {
        const deletevisitorResult = await client
          .db('Cybercafe')
          .collection('Visitor')
          .deleteOne({ idproof: idproof});
    
        if (deletevisitorResult.deletedCount === 0) {
          return res.status(404).send('Visitor not found or unauthorized');
        }
    
        res.send('Visitor deleted successfully');
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });


    
    //create visitor log
    app.post('/create/visitorlog/admin', verifyToken, async (req, res) => {
        let result = createvisitorlog(
        req.body.visitorname,
        req.body.idproof,
        req.body.timespend,
        req.body.payment
        ); 
        res.send(result);
    });
    

    //see created visitor log
    app.get('/view/visitorlog/admin', verifyToken, async (req, res) => {
        try {
        const result = await client
            .db('Cybercafe')
            .collection('Visitor Log')
            .find()
            .toArray();
    
        res.send(result);
        } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        }
    });

    //create computer
    app.post('/create/computer', async (req, res) => {
      let result = createcomputer(
        req.body.idproof,
        req.body.lanportno,
        req.body.available
        ); 
        res.send(result);
      });
      

    //see created computer  
    app.get('/view/computer/admin', verifyToken, async (req, res) => {
      try {
        const result = await client
        .db('Cybercafe').collection('Computer').find().toArray();
        
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });*/
    
        
  }catch (e) {
    console.error(e);

  }  
  finally {
    // Ensures that the client will close when you finish/error
    
  }
}

run().catch(console.dir);




//function 放下面

async function login(requsername, reqpassword) {
  let matchUser = await client.db('VMS').collection('User').findOne({ username:requsername });

  if (!matchUser)
    return { message: "User not found!" };
  const isPasswordValid = await bcrypt.compare(reqpassword, matchUser.password);
  console.log("run");
  if (isPasswordValid)
    return { message: "Correct password", user: matchUser };
  else
   return { message: "Invalid password" };
}

  async function registeradmin(requsername, reqpassword, reqemail) {
    try{
      const hash = await bcrypt.hash(reqpassword, 10);
      await client.db(dbName).collection(collection1).insertOne({
          "username": requsername,
          "password": hash,
          "email":reqemail,
          role: "admin",
          visitors: []
        });
        return "User is created.";
    }catch(error){
      console.error(error);
      return "Error creating user. ";
    }
  }



  /*async function registersecurity(requsername, reqpassword, reqemail) {
    try{
      const hash = await bcrypt.hash(reqpassword, 10);
      await client.db(dbName).collection(collection1).insertOne({
          "username": requsername,
          "password": hash,
          "email":reqemail,
          role: "security",
          visitors: []
        });
        return "User is created.";
    }catch(error){
      console.error(error);
      return "Error creating user. ";
    }
  }




  /*async function createvisitor(reqvisitorname, reqtimespend = "0", reqage, reqphonenumber = "0"){
    try{
      await client.db(dbName).collection(collection2).insertOne({
        "name": reqvisitorname,
        "timespend":reqtimespend,
        "age":reqage,
        "phonenumber":reqphonenumber,
        "from":from
      });
      return "Visitor is added.";
    }catch(error){
      console.error(error);
      return "Error creating user. ";
    }
  }


//user create visitor function
function createvisitor(reqvisitorname, reqtimespend = "0", reqage, reqphonenumber = "0") {
    client.db('VMS').collection('Visitor').insertOne({
        "visitorname": reqvisitorname,
        "timespend":reqtimespend,
        "age":reqage,
        "phonenumber":reqphonenumber,
        from: username
      });
      return "Visitor is added.";
    }



//create visitor function (test)
function createtestvisitor(reqvisitorname, reqidproof, reqentrytime = "0", reqapproval) {
  client.db('Cybercafe').collection('Test').insertOne({
      "visitorname": reqvisitorname,
      "idproof": reqidproof,
      "entrytime":reqentrytime,
      "approval":reqapproval
    });
    return "Visitor is added";
  }

//create visitorlog function
function createvisitorlog(reqvisitorname, reqidproof, reqtimespend = 0, reqpayment = 0) {
    client.db('Cybercafe').collection('Visitor Log').insertOne({
        "visitorname": reqvisitorname,
        "idproof": reqidproof,
        "timespend": reqtimespend,
        "payment": reqpayment,
      });
      return "Visitor log is recorded";
    }

//create computer function
function createcomputer(reqidproof, reqLanportno, reqAvailable) {
  client.db('Cybercafe').collection('Computer').insertOne({

      "idproof": reqidproof,
      "lanportno": reqLanportno,
      "available": reqAvailable
    });
    return "Computer is added";
  }*/

  //token function
const jwt = require('jsonwebtoken');

function generateToken(userData) {
  const token = jwt.sign(
    userData,
    'password',
    {expiresIn: 600}
  );

  console.log(token);
  return token;
}

function verifyToken(req, res, next) {
  let header = req.headers.authorization;
  if (!header) {
    res.status(401).send('Unauthorized');
    return;
  }

  let token = header.split(' ')[1];

  jwt.verify(token, 'password', function (err, decoded) {
    if (err) {
      res.status(401).send('Unauthorized');
      return;
    }
    req.admin = decoded;
    next();
  });
}


//new add
function authenticateAdmin(req, res, next) {
  let header = req.headers.authorization;
  if (!header) {
    res.status(401).send('Unauthorized, missing token');
    return;
  }

  let token = header.split(' ')[1];

  jwt.verify(token, 'password', function (err, decoded) {
    if (err) {
      res.status(403).send('Invalid token');
      return;
    }else{
      if(decoded.role !== 'admin'){
        res.status(403).send("Forbidden: Insufficient permissions")
      }
      //add this in case your response is in another route, therefore you can retrieve the token at the terminal
      console.log('Decoded token:',decoded);
      return next();
    }
  });
}


function authenticateSecurity(req, res, next) {
  let header = req.headers.authorization;
  if (!header) {
    res.status(401).send('Unauthorized, missing token');
    return;
  }

  let token = header.split(' ')[1];

  jwt.verify(token, 'password', function (err, decoded) {
    if (err) {
      res.status(403).send('Invalid token');
      return;
    }else{
      if(decoded.role !== 'admin'){
        res.status(403).send("Forbidden: Insufficient permissions")
      }
      //add this in case your response is in another route, therefore you can retrieve the token at the terminal
      console.log('Decoded token:',decoded);
      return next();
    }
  });
}