import nextConnect from 'next-connect';
import middleware from '../../middleware/database';


const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

    let signup_data = req.query.signup_data;
    let temp = JSON.parse(signup_data)
    let collectionName = 'Users';
    let doc = await req.db.collection(collectionName).countDocuments({email: temp.email}, { limit: 1 })
    
    console.log(doc);

    
    let message = '';
    if(doc==0) {
        message = "No account found";
        // var ret = await req.db.counters.findAndModify({
        //     query: { _id: collectionName },
        //     update: { $inc: { seq: 1 } },
        //     new: true,
        //     upsert: true
        //   });

        //   temp["_id"] = ret.seq
        let insert = await req.db.collection(collectionName).insertOne(temp)
        if(insert.acknowledged) {
            message = 'User Registered'
        } else {
            message = 'User Registeration Failed'
        }
    } else {
        message = "User Already Exists";
    }
    res.json({message:message});
});
export default handler;