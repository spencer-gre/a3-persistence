const { connect, database } = require("../db/connection");

const getNextID = async function(username) {
	const db = database();
	const userColl = db.collection("user-data");
	const userQuery = { user: username }
	let nextID = -1;

	await userColl.findOne(userQuery).then(async (doc) => {
		if (!doc) {
			await userColl.insertOne({user: username, idLast: 0})
			nextID = 0;
		} else {
			nextID = (doc.idLast) + 1;
			const original = {_id: doc._id};
			const newVals = { $set: { idLast: nextID }};
		 	await userColl.updateOne(original, newVals);
		}
	});
	
	return nextID;
}

module.exports = { getNextID }


