import * as fs from 'fs';
import * as uuid from 'uuid';
import * as json2csv from 'json2csv';

class ExportFiles {
    toCsv(jsonContent, fields) {
        try {
            return json2csv.parse(jsonContent, { fields });
        } catch (error) {
           throw new Error(`Error to convert to csv - ${error.message}`);
        }
    }

    saveCsvFile(pathToSave, content) {
        try {
            const fileName = `${uuid.v4()}.csv`;
            fs.writeFileSync(`${pathToSave}/${fileName}`, content);
            return fileName;
        } catch (error) {
            throw new Error(`Error to export csv file - ${error.message}`);
        }
    }
}

export default new ExportFiles();