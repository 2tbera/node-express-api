const tableQuery = {
    user_table :  "CREATE TABLE IF NOT EXISTS `" + process.env.NODE_PROJECT + "`.`users` (`id` VARCHAR(36) NOT NULL , `firstname` VARCHAR(100) NULL , `lastname` VARCHAR(100) NULL , `email` VARCHAR(100) NOT NULL ,  `password` VARCHAR(100) NOT NULL , `age` TINYINT(100) NULL , `avatar` BLOB NULL , `bio` TEXT NULL , `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`), INDEX `lastname_ind` (`lastname`), INDEX `firstname_ind` (`firstname`), UNIQUE (`email_unk`)) ENGINE = InnoDB;",
    album_table : "CREATE TABLE IF NOT EXISTS  `" + process.env.NODE_PROJECT + "`.`album` (`id` VARCHAR(36) NOT NULL , `user_id` VARCHAR(36) NULL, `name` VARCHAR(100) NOT NULL , `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `updatedAt` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`, `user_id`), FOREIGN KEY (`user_id`) REFERENCES users(id)) ENGINE = InnoDB;",
    music_table : "CREATE TABLE IF NOT EXISTS  `" + process.env.NODE_PROJECT + "`.`music` (`id` VARCHAR(36) NOT NULL , `user_id` VARCHAR(36) NULL, `file` BLOB NULL , `name` VARCHAR(100) NOT NULL , `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `updatedAt` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`, `user_id`), FOREIGN KEY (`user_id`) REFERENCES users(id)) ENGINE = InnoDB;",
}

createDB = async (connection) =>  {
    await connection.query(tableQuery.user_table, async  (err) =>  {
        if (err) {
            throw {status: 500 , message: "Server Is Down "}
        }
        console.log("Table `user_table` created");
        await  connection.query(tableQuery.album_table,  (err) =>  {
            if (err) {
                throw {status: 500 , message: err}
            }
            console.log("Table `album_table` created");
        });
        await connection.query(tableQuery.music_table,  (err) =>  {
            if (err) {
                throw {status: 500 , message: err}
            }
            console.log("Table `music_table` created");
        });
    });
}


module.exports = createDB;
