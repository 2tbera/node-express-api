
const userData = async (req, res) => {
    res.json({...res.user})
};

module.exports ={
    userData
}
