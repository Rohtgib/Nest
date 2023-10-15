const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const supabase = createClient(process.env.SUPABASE_URL, process.env.API_KEY);

async function selectData(tableName) {
  try {
    const { data, error } = await supabase.from(tableName).select("*");

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

async function insertData(tableName, data) {
  try {
    const { data: insertedData, error } = await supabase
      .from(tableName)
      .insert(data);

    if (error) {
      throw error;
    }

    return insertedData;
  } catch (error) {
    throw error;
  }
}

async function updateData(tableName, dataToUpdate, filter) {
  try {
    const { data: updatedData, error } = await supabase
      .from(tableName)
      .update(dataToUpdate)
      .match(filter);

    if (error) {
      throw error;
    }

    return updatedData;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  supabase,
  selectData,
  insertData,
  updateData,
};
