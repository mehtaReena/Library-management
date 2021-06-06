const Member = require('../models/member')



const printAllMember = async () => {

    try {
        let members = await Member.find();
        console.log("-----");
        if (members.length === 0) {
            console.log('No category found')
        }
        else {
            members.forEach((member) => {
                console.log("Name :   "+ member.name   + "MemberiD : " +member.memberID);
            })
        }
    }
    catch (e) {
        console.log('Error Occured', e)
    }

}

const addMember = async (id,name) => {
    console.log("addMember " , id  , name )
    try {
        const member = new Member({memberID: id, name:name });
        await member.save();
        console.log('Member saved successfuly')
    }
    catch (e) {
        console.log('Error Occured', e.message)
    }
}


const removeMember = async (id) => {
    try {
        const member = await Member.findOne({ memberID: id });
        if (member == null) {
            console.log("Member not found")
        }
        else {
            await member.remove();
            console.log("Removed Successfuly")

        }

    }
    catch (e) {
        console.log('Error Occured', e)
    }

}


module.exports = {
    printAllMember,
    addMember,
    removeMember


}