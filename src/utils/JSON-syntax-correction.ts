/* eslint-disable @typescript-eslint/no-unused-vars */
export function correctJsonSyntax(jsonString: string): string | null {
  // Remove trailing commas before closing brackets or braces
  jsonString = jsonString.replace(/,\s*(?=[}\]])/g, "");

  // Ensure proper closure of brackets and braces
  try {
    // Check if the JSON parses correctly after the basic fixes
    JSON.parse(jsonString);
  } catch (e) {
    // Try to correct any missing brackets
    const openCurlyBraces = (jsonString.match(/{/g) || []).length;
    let closeCurlyBraces = (jsonString.match(/}/g) || []).length;

    const openSquareBrackets = (jsonString.match(/\[/g) || []).length;
    let closeSquareBrackets = (jsonString.match(/]/g) || []).length;

    while (openCurlyBraces > closeCurlyBraces) {
      jsonString += "}";
      closeCurlyBraces++;
    }

    while (openSquareBrackets > closeSquareBrackets) {
      jsonString += "]";
      closeSquareBrackets++;
    }

    try {
      // Try parsing again after fixing bracket closure
      JSON.parse(jsonString);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e) {
      // If parsing fails, return null as we couldn't fix the JSON
      return null;
    }
  }

  // If successful, return the corrected JSON string
  return jsonString;
}
