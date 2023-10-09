const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "..", ".env") });

// Create a new Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.API_KEY);

// Rest of your code...

// Function to perform a SELECT query
async function selectData(tableName) {
  try {
    // Perform the SELECT query using the Supabase client
    const { data, error } = await supabase.from(tableName).select("*");

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// Function to insert data into a table
async function insertData(tableName, data) {
  try {
    // Insert the data into the table using the Supabase client
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

// Function to update data in a table
async function updateData(tableName, dataToUpdate, filter) {
  try {
    // Update the data in the table using the Supabase client
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
