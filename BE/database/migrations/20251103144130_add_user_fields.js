/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.table('users', function(table) {
    table.string('first_name');
    table.string('middle_name');
    table.string('last_name');
    table.string('title');
    table.boolean('is_super_admin').defaultTo(false);
    table.string('organization_id');
    table.boolean('is_archived').defaultTo(false);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('first_name');
    table.dropColumn('middle_name');
    table.dropColumn('last_name');
    table.dropColumn('title');
    table.dropColumn('is_super_admin');
    table.dropColumn('organization_id');
    table.dropColumn('is_archived');
  });
}
