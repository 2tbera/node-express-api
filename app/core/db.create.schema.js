const tableQuery = {
    user_table :  "CREATE TABLE IF NOT EXISTS `" + process.env.NODE_PROJECT + "`.`user` (`id` VARCHAR(36) NOT NULL , `firstname` VARCHAR(100) NULL , `lastname` VARCHAR(100) NULL , `email` VARCHAR(100) NOT NULL ,  `password` VARCHAR(100) NOT NULL , `age` TINYINT(100) NULL , `avatar` BLOB NULL , `bio` TEXT NULL , `status` BOOLEAN NOT NULL DEFAULT TRUE , `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`), INDEX `lastname_ind` (`lastname`), INDEX `firstname_ind` (`firstname`)) ENGINE = InnoDB;",
    album_table : "CREATE TABLE IF NOT EXISTS  `" + process.env.NODE_PROJECT + "`.`album` (`id` VARCHAR(36) NOT NULL , `user_id` VARCHAR(36) NOT NULL, `name` VARCHAR(100) NOT NULL , `status` BOOLEAN NOT NULL DEFAULT TRUE , `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `updatedAt` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`, `user_id`), FOREIGN KEY (`user_id`) REFERENCES user(id), UNIQUE(`name`)) ENGINE = InnoDB;",
    music_table : "CREATE TABLE IF NOT EXISTS  `" + process.env.NODE_PROJECT + "`.`music` (`id` VARCHAR(36) NOT NULL , `user_id` VARCHAR(36) NOT NULL, `file` BLOB NULL , `name` VARCHAR(100) NOT NULL , `status` BOOLEAN NOT NULL DEFAULT TRUE , `createAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `updatedAt` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`, `user_id`), FOREIGN KEY (`user_id`) REFERENCES user(id)) ENGINE = InnoDB;",
    role_table : "CREATE TABLE IF NOT EXISTS  `" + process.env.NODE_PROJECT + "`.`role` (`id` VARCHAR(36) NOT NULL , `status` BOOLEAN NOT NULL DEFAULT TRUE , `name` VARCHAR(100) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;",
    category_table : "CREATE TABLE IF NOT EXISTS  `" + process.env.NODE_PROJECT + "`.`category` (`id` VARCHAR(36) NOT NULL , `music_id` VARCHAR(36) NOT NULL, `name` VARCHAR(100) NOT NULL , PRIMARY KEY (`id`, `music_id`), FOREIGN KEY (`music_id`) REFERENCES music(id)) ENGINE = InnoDB;",
    user_role_table_many_to_many : "CREATE TABLE IF NOT EXISTS  `" + process.env.NODE_PROJECT + "`.`user_role` (`id` VARCHAR(36) NOT NULL , `role_id` VARCHAR(36) NOT NULL,`user_id` VARCHAR(36) NOT NULL, PRIMARY KEY (`id`, `role_id`, `user_id`), FOREIGN KEY (`role_id`) REFERENCES role(`id`) ON DELETE CASCADE, FOREIGN KEY (`user_id`) REFERENCES user(`id`) ON DELETE CASCADE) ENGINE = InnoDB;",
    album_music_table_many_to_many: "CREATE TABLE IF NOT EXISTS  `" + process.env.NODE_PROJECT + "`.`user_album` (`id` VARCHAR(36) NOT NULL , `album_id` VARCHAR(36) NOT NULL,`user_id` VARCHAR(36) NOT NULL, PRIMARY KEY (`id`, `album_id`, `user_id`), FOREIGN KEY (`album_id`) REFERENCES album(`id`) ON DELETE CASCADE, FOREIGN KEY (`user_id`) REFERENCES user(`id`) ON DELETE CASCADE) ENGINE = InnoDB;",
    user_album_table_many_to_many: "CREATE TABLE IF NOT EXISTS  `" + process.env.NODE_PROJECT + "`.`album_music` (`id` VARCHAR(36) NOT NULL , `album_id` VARCHAR(36) NOT NULL,`music_id` VARCHAR(36) NOT NULL, PRIMARY KEY (`id`, `album_id`, `music_id`), FOREIGN KEY (`album_id`) REFERENCES album(`id`) ON DELETE CASCADE, FOREIGN KEY (`music_id`) REFERENCES music(`id`) ON DELETE CASCADE) ENGINE = InnoDB;",
}

createDB = async (connection) =>  {
    await connection.query(tableQuery.user_table, async  (err) =>  {
        if (err) {
            console.log(err)
        }
        console.log("Table `user_table` created");
        await  connection.query(tableQuery.album_table,  (err) =>  {
            if (err) {
                console.log(err)
            }
            console.log("Table `album_table` created");
        });
        await connection.query(tableQuery.music_table, async (err) =>  {
            if (err) {
                console.log(err)
            }
            console.log("Table `music_table` created");
            await connection.query(tableQuery.category_table,  (err) =>  {
                if (err) {
                    console.log(err)
                }
                console.log("Table `category_table` created");
            });
            await connection.query(tableQuery.album_music_table_many_to_many,  (err) =>  {
                if (err) {
                    console.log(err)
                }
                console.log("Table `album_music_table_many_to_many` created");
            });
            await connection.query(tableQuery.user_album_table_many_to_many,  (err) =>  {
                if (err) {
                    console.log(err)
                }
                console.log("Table `user_album_table_many_to_many` created");
            });
        });
    });
    await  connection.query(tableQuery.role_table, async (err) =>  {
        if (err) {
            console.log(err)
        }
        console.log("Table `role_table` created");
        await connection.query(tableQuery.user_role_table_many_to_many,  (err) =>  {
            if (err) {
                console.log(err)
            }
            console.log("Table `user_role_table_many_to_many` created");
        });
    });
}


module.exports = createDB;
