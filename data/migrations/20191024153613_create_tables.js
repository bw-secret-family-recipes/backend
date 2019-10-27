
exports.up = function (knex) {
   return knex.schema
      .createTable('users', tbl => {
         tbl.increments();
         tbl.string('first_name', 128).notNullable();
         tbl.string('last_name', 128).notNullable();
         tbl.string('username', 128).notNullable().unique();
         tbl.string('password', 128).notNullable()
         tbl.string('email', 256).notNullable().unique();
      })
      .createTable('recipes', tbl => {
         tbl.increments();
         tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
         tbl.string('recipe_name', 128).notNullable();
         tbl.string('source', 128);
         tbl.text('recipe_instructions').notNullable();
      })
      .createTable('categories', tbl => {
         tbl.increments();
         tbl.integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('recipes')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
         tbl.string('category_name', 64);
      })
      .createTable('ingredients', tbl => {
         tbl.increments();
         tbl.integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('recipes')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
         tbl.float('quantity').notNullable();
         tbl.string('unit_type', 64).notNullable();
         tbl.string('ingredient_name', 128).notNullable();
      });
};

exports.down = function (knex) {
   return knex.schema
      .dropTableIfExists('ingredients')
      .dropTableIfExists('categories')
      .dropTableIfExists('recipes')
      .dropTableIfExists('users')
};


