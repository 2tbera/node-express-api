const {getConnection} = require('../core/databaseConfig');
const connection = getConnection();

function User(user) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.age = user?.age;
    this.avatar = user.avatar;
    this.bio = user.bio;
    this.status = true;
}

User.create = (user) => {
    return new Promise((resolve, reject) => {
        // useri shevqmeni, cavshale, shevqmeni meorejer da kide registracias vshvebi
        // res daabrunebs 2 users, erts status false meoreze true, da radgan qvemot res[0].status amocmeb
        // chaainsertebs da ertidaigive email it 2 roja gaichiteba romelsac status true aq
        // SELECT * FROM user WHERE email=? AND status = true query shi es ro gacero da qvemot prosta length ze sheamocmo moagvarebs
        connection.query(`SELECT * FROM user WHERE email=?`, user.email, (err, res) => {
            if (err || (res.length && !!res[0].status)) {
                reject(err || 'User Not Found');
                return
            }
            connection.query("INSERT INTO user set ?", user, (err, res) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(res);
            });
        });
    });
};

User.getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        // statusis where i daamate da if idan statusis check amoige
        connection.query(`SELECT * FROM user WHERE email=?`, email, (err, res) => {
            if (err || res.length && !res[0].status) {
                reject(err || 'User Not Found');
            }
            resolve(res);
        });
    })
};

User.getById = (id) => {
    return new Promise((resolve, reject) => {
        // aq radgan where shi ceria status = true qvemot kide gadamocmeba !res[0].status agaraa sachiro 
        connection.query("SELECT * FROM user WHERE id=? AND status=true", id , (err, res) => {
            if (err || res.length && !res[0].status) {
                reject(err || 'User Not Found');
            }
            resolve(res[0] || null);
        });
    })
};

module.exports = User;
