const SHEET_ID = "PASTE_YOUR_SHEET_ID";
const SHEET_NAME = "Sheet1";
const FOLDER_ID = "PASTE_YOUR_DRIVE_FOLDER_ID";

function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index")
    .setTitle("Shubharambh Admin");
}

function uploadProduct(formObject) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const folder = DriveApp.getFolderById(FOLDER_ID);

  const fileBlob = formObject.image;
  const category = formObject.category;

  if (!fileBlob || !category) {
    throw new Error("Category and image are required.");
  }

  const uploadedFile = folder.createFile(fileBlob);
  uploadedFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  const imageUrl = "https://drive.google.com/uc?export=view&id=" + uploadedFile.getId();

  sheet.appendRow([category, imageUrl]);

  return {
    success: true,
    image: imageUrl,
    category: category
  };
}
