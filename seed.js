const collection1 = "User"
const collection2 = "Visitor"
const collection3 = "visitorpass"
const bcrypt = require('bcrypt');
const dbName = "VMS";
const saltRounds = 10;


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

async function seedData(){
    try{
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);

        await db.collection(collection1).deleteMany({});
        await db.collection(collection2).deleteMany({});
        await db.collection(collection3).deleteMany({});

        //1st set 
        const hash = await encryptPassword('1234_abcd');
        const user1 = {
            username: "Kang2001",
            password: hash,
            email: "chiawnak0390@gmail.com",
            role: "admin"
        }

        await db.collection(collection1).insertOne(user1);
        //find user1 from mongodb to get its _id, to store the id into the visitor 1
        const user1_mongo = await db.collection(collection1).findOne({username: user1.username});
        const visitor1 = {
            name: "Khoo",
            timespend: "2",
            age: "14",
            phoneNumber: "0124586531"
        }
        await db.collection(collection2).insertOne(visitor1);
        await db.collection(collection1).updateOne({username: user1.username}, {$push: {visitors: visitor1 }});

        // Sample data for visitor pass
        const visitorPass1 = {
            visitorname: 'Khoo',
            idproof: 'ID12345',
            timespend: '2',
            payment: '50',
        };
        await db.collection(collection3).insertOne(visitorPass1);
        

        //2nd set
        const hash2 = await encryptPassword("b022124");
        const user2 = {
            username: "Siti",
            password: hash2,
            email: "siti123@gmail.com",
            role: "security"
        }

        await db.collection(collection1).insertOne(user2);
        const user2_mongo = await db.collection(collection1).findOne({username: user2.username});
        const visitor2 = {
            name: "Tan",
            timespend: "3",
            age: "15",
            phoneNumber: "0126531789"
        }
        await db.collection(collection2).insertOne(visitor2);
        await db.collection(collection1).updateOne({username: user2.username}, {$push: {visitors: visitor2}})

        // Sample data for visitor pass
        const visitorPass2 = {
            visitorname: 'Tan',
            idproof: 'ID67890',
            timespend: '3',
            payment: '70',
        };
        await db.collection(collection3).insertOne(visitorPass2);
    


        //output this message if all data successfully added to database
        console.log('Data seeded successfully');
    }catch (error) {
        console.error('Error seeding data:', error);
    } finally {
    // Disconnect from the database after seeding
        await client.close();
    }
}

async function encryptPassword(password) {
    const hash = await bcrypt.hash(password, saltRounds); 
    return hash; 
}


seedData()