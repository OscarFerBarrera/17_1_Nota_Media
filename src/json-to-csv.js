const fs = require("fs");
const prompt = require("prompt-sync")();

const creaNotaMedia = (data) => {
  const alumnos = [];
  const newArray = [];

  data.forEach((x) => {
    if (!alumnos.includes(x.name)) {
      alumnos.push(x.name);
      const newObjec = {
        name: x.name,
        mark: x.mark,
        cont: 1,
      };
      newArray.push(newObjec);
    } else {
      newArray.forEach((z) => {
        if (z.name === x.name) {
          z.mark = z.mark + x.mark;
          z.cont = z.cont + 1;
        }
      });
    }
  });
  const arrNotas = [];
  newArray.forEach((x) => {
    const newObjec = {
      name: x.name,
      media: x.mark / x.cont,
    };
    arrNotas.push(newObjec);
  });

  return arrNotas;
};

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
      const dataNotaMedia = creaNotaMedia(parsedData);
      const csv = convertJsonToCsv(dataNotaMedia);
      console.log(csv);
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
