const request = require("request"),
      PDFParse = require("pdf2json"),
      fs = require("fs"),
      path = require("path");
      

const parser = new PDFParse(),
      cleanData = [];

parser.on("pdfParser_dataError", (errData) => console.log(errData))
parser.on("pdfParser_dataReady", pdfData => {
      // Generate column mapping
      var columns = findColumns(pdfData.formImage.Pages[1]);
      // Generate array of Page arrays representing rows in the PDF
      pdfData.formImage.Pages.forEach((item, index) => {
            var cleaned = findAndCreateRow(item, columns);
            cleanData.push(cleaned);
      })
      // Write output to local JSON file
      fs.writeFile("industry_codes.json", JSON.stringify(cleanData));
})

function parsePDF() {
      return parser.loadPDF(path.join(__dirname, "./raw.pdf"))
}


// Extracts all text values and bounding X coordinate values for the Column headers on page 1
// Output is an array of Objects that map Industry Code types to columns throughout the PDF
function findColumns(page) {
      const headerRowYValue = 2.476,
            headerValues = [];
      for (var i = 0; i < page.Texts.length; i++) {
            var el = page.Texts[i],
                index = i,
                text = decodeURIComponent(el.R[0].T),
                xValBegin = (el.x - .3).toFixed(4),
                xValEnd = (page.Texts[index + 1].y === headerRowYValue ? (page.Texts[index + 1].x - .4).toFixed(4) : (el.x + 3).toFixed(4) ),
                newHeader = {};

            if (el.y === headerRowYValue) {
                  newHeader.xBegin = parseFloat(xValBegin);
                  newHeader.xEnd = parseFloat(xValEnd);
                  newHeader.text = decodeURIComponent(el.R[0].T)
                  headerValues.push(newHeader)
            }
            else {
                  break;
            }
      }
      return headerValues;
}


// Outputs an array of Objects for each page with industry codes and description for each row
function findAndCreateRow(page, columns) {
      const firstRowYValue = 2.889,
            rows = {};
      for (var i = 0; i < page.Texts.length; i++) {
            var el = page.Texts[i],
                index = i,
                xValBegin = el.x,
                yValue = el.y,
                key = yValue.toString(),
                currentColumn = undefined;
                
                if (yValue <= firstRowYValue) {
                      continue;
                }
                if (!rows[key]) {
                      rows[key] = {}
                }
                columns.forEach((col, index) => {
                      if (xValBegin >= col.xBegin && xValBegin <= col.xEnd) {
                            currentColumn = col.text;
                      }
                })
                if (currentColumn) {
                  if (currentColumn === "ISO Description" || currentColumn === "ISO CGL") {
                        continue;
                  }
                  if (currentColumn === "General Description") {
                        var decodeDescription = decodeURIComponent(el.R[0].T),
                            previousY = page.Texts[i - 1].y;
                        if (rows[previousY.toString()] && el.y !== previousY) {
                              rows[previousY.toString()][currentColumn] += decodeDescription;

                        }
                        else {
                              rows[key][currentColumn] = decodeDescription
                        }
                  }
                  else {
                        var codeToNumber = parseInt(el.R[0].T, 10);
                        if (isNaN(codeToNumber) ) {
                              rows[key][currentColumn] = "N/A"
                        }
                        else {
                              rows[key][currentColumn] = codeToNumber;
                        }
                  }
            }
      }
      for (var code in rows) {
            if (rows.hasOwnProperty(code) && (!rows[code]["General Description"] || !rows[code]["NCCI"])) {
                  delete rows[code]
            }
      }
      return rows;
}

parsePDF();