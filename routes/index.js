var express = require('express');

var router = express.Router();
const Models = require('../models');
const { google } = require('googleapis');
const fs = require('fs');
const ggSheet = require('../connect_gg_sheet');
/* GET home page. */
router.get('/qqq', async function (req, res) {
  try {
    const result = JSON.parse(JSON.stringify(await Models.Clergy.findAll()));
    for (let cle of result) {
      cle.Appointments = await Models.Appointment.findAll({
        where: { ClergyID: cle.Id },
      });
      for (let appointment of cle.Appointments) {
        const position = await Models.Position.findOne({
          where: { Code: appointment.Position },
          attributes: ['Name'],
        });
        appointment.Position = position.Name;
      }
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error.message || error);
  }
});

// Đường dẫn đến file JSON chứa credentials
const keyPath =
  'https://drive.google.com/drive/folders/1qsEPj_griVHilZXLNYPxnt4QYB5QDUCg';

// ID của Google Spreadsheet
const spreadsheetId =
  'https://docs.google.com/spreadsheets/d/1cf4v6eJOofXW4kaRskV8prLGsfznKqDkcj_MZRXppwQ/edit?hl=vi#gid=0';

// Phạm vi truy cập của Google Sheets API
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

// Tạo một OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  '131464224698-1nmabbenapq1usu6v0r474gmumfnja17.apps.googleusercontent.com',
  'EkS4Mwv7ac0lmXaAvtCCvKN3',
  'locahost'
);

router.get('/', async function (req, res) {
  try {
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

    const values = [
      [new Date().toISOString(), 'Data 1', 'Data 2'],
      // Thêm dữ liệu khác tại đây
    ];

    const resource = {
      values,
    };

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1', // Tên của Sheet
      valueInputOption: 'RAW',
      resource,
    });

    res.send('Data has been written to Google Sheet.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error writing to Google Sheet.');
  }
});

module.exports = router;
