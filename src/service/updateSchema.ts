import { url } from "@/constants/network";
import { Content } from "vanilla-jsoneditor";

export const uploadSchema = async (schema: Content) => {
  try {
    // Create headers object with content type set to application/json
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Convert the schema object to a JSON string
    var raw = JSON.stringify(schema);

    // Define request options including method, headers, and body
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    // Send a POST request to the specified URL
    const response = await fetch(`${url}/save_schema`, requestOptions);

    // Convert response to text
    const result = await response.json();
    if (result.error) {
      throw new Error(JSON.stringify({ message: result.error }));
    }
    console.log(result); // Log the result
  } catch (error) {
    // Log and handle errors
    throw new Error(error); // Output error message in JSON format
  }
};
