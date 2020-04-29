## Problem Statement

### Create a spreadsheet application like Google sheets using Javascript, RxJS, and CSS

### User Requirements:
<p>As a user, I should be able to add rows to the spreadsheet using a plus button.</p>
<p>As a user, I should be able to add columns to the spreadsheet using a plus button.</p>
<p>As a user, I should be able to delete rows on the spreadsheet using a minus button.</p>
<p>As a user, I should be able to delete columns on the spreadsheet using a minus button.</p>
<p>As a user, I should be able to select multiple rows or columns and display their sum in a cell by using a formula. The formula should be of the format "=SUM(START_CELL:END_CELL)". Example "=SUM(A1:A10)" to display the sum of all items from cell A1 to A10. Any changes to the cell content in the selected range should update the sum.</p>
<p>As a user, I should be able to perform simple algebraic operations (+, -, *, /) with cell references. Example "=A1+A2".</p>
<p>As a user, I should be able to export the sheet as a CSV file.</p>
<p>As a user, I should be able to load a CSV from the node server on clicking a load button.</p>

### Technical Requirements:
<p>The goal of this assignment is to learn about JavaScript events & RxJS.</p>
<p>Events for the formula should be implemented using RxJS and buttons can use simple event listeners.</p>
<p>On clearing formula, all subscribers and events should be cleared from the page.</p>
<p>No javascript frameworks should be used except RxJS.</p>
<p>No CSS frameworks should be used.</p>
<p>Should use ES6 syntax.</p>
<p>Should document your code extensively.</p>
<p>Should have .gitignore, ReadMe.md files.</p>
<p>ReadMe.md file should have markdown with project description and instructions to run the project.</p>


## My Infomation

### NUID: 001087950
### Name: Bochao Wang

## Technologies used
### JavaScript
### RXJS
### SCSS
### CSS
### HTML

## Requirements
### Node js

## Steps to run
<p>input "npm run start" in terminal and open localhost:8080 in browser</p>



## other direction
<p>Please refer the following guidelines regarding Assignment 6, as discussed in class:

 

<p>User should not be able to delete last row/column. That is, there should be 1 row and 1 column in the spreadsheet always.
<p>Addition or Deletion of row/column should only add/delete 1 row/column at a time.
<p>Add button should add a new row to the bottom of the selected row.
<p>Add button should add a new column to the right of the selected column.
<p>You can choose to disable the add and delete buttons when no row/column is selected.
<p>There should be 6 buttons in your application:
<p>Add Row
<p>Add Column
<p>Delete Row
<p>Delete Column
<p>Import from CSV
<p>Export to CSV
<p>Assume that all the data in the spreadsheet would be numbers, or empty value.
<p>For the formulas, SUM function and arithmetic operations should be supported. Arithmetic operations include addition, <p>subtraction, multiplication and division. The formula can be inputted by prefixing the formula with "=".
<p>The formulas can be applied on a range of cells. This range can either be row wise or column wise. Example: "=SUM(A1:A5)" or "=SUM(A1:D1)".
<p>Logic for formulas need to be implemented using rxjs.
<p>Handle errors in formula for invalid data. Empty cell is considered as invalid data.
<p>If the formula has same cell reference (circular reference), error should be thrown. Example: if a formula on cell A refers cell B, but cell B refers cell A, it should throw an error.
<p>There should not be any checkboxes to select the row/column.
<p>Each cell should hold 2 types of data - actual data and the display value. It is not required to implement the formula bar.
<p>Row, column, cell size can be fixed, but should have a reasonable size to have the data visible.
