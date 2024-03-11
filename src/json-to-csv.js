const fs = require("fs");
const prompt = require("prompt-sync")();

const convertJsonToCsv = (jsonData) => {
  let csv = "";

  // Encabezados
  const firstItemInJson = jsonData[0];
  const headers = Object.keys(firstItemInJson);
  csv = csv + headers.join(";") + "; \n";

  // Datos

  // Recorremos cada fila
  jsonData.forEach((item) => {
    // Dentro de cada fila recorremos todas las propiedades
    headers.forEach((header) => {
      csv = csv + item[header] + ";";
    });
    csv = csv + "\n";
  });

  return csv;
};

const filePath = prompt("Introduce la ruta de un fichero JSON: ");

fs.readFile(filePath, (readError, data) => {
  if (readError) {
    console.log("Ha ocurrido un error leyendo el fichero");
  } else {
    try {
      const parsedData = JSON.parse(data);
      const csv = convertJsonToCsv(parsedData);

      const filePathOutput = prompt("Introduce la ruta del fichero a generar: ");
      fs.writeFile(filePathOutput, csv, (error) => {
        if (error) {
          console.log("Ha ocurrido un error escribiendo el fichero");
        } else {
          console.log("Fichero guardado correctamente!");
        }
      });
    } catch (parseError) {
      console.log("Ha ocurrido un error PARSEANDO el fichero");
    }
  }
});
