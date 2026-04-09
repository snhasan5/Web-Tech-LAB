const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'sample.txt');
const initialContent = 'Hello from Node.js file system module.\n';
const appendedContent = 'This line was appended asynchronously.\n';

console.log('Starting file operations...');

// 1) Create or overwrite a file.
fs.writeFile(filePath, initialContent, (writeError) => {
  if (writeError) {
    console.error('Error creating file:', writeError.message);
    return;
  }

  console.log('File created successfully.');

  // 2) Read file contents.
  fs.readFile(filePath, 'utf8', (readError, data) => {
    if (readError) {
      console.error('Error reading file:', readError.message);
      return;
    }

    console.log('Initial file content:');
    console.log(data);

    // 3) Append new data.
    fs.appendFile(filePath, appendedContent, (appendError) => {
      if (appendError) {
        console.error('Error appending to file:', appendError.message);
        return;
      }

      console.log('Data appended successfully.');

      // 4) Read again to verify append.
      fs.readFile(filePath, 'utf8', (secondReadError, updatedData) => {
        if (secondReadError) {
          console.error('Error reading updated file:', secondReadError.message);
          return;
        }

        console.log('Updated file content:');
        console.log(updatedData);

        // 5) Delete the file.
        fs.unlink(filePath, (deleteError) => {
          if (deleteError) {
            console.error('Error deleting file:', deleteError.message);
            return;
          }

          console.log('File deleted successfully.');
          console.log('All file operations completed.');
        });
      });
    });
  });
});
