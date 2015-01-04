/** @jsx React.DOM */

'use strict'
var React = require("react");

var SortableTable = require("../../react-sortable-table");

var data = [
    { id: 3, name: "Satoshi", class: "B" },
    { id: 1, name: "Taro", class: "A" },
    { id: 2, name: "Ken", class: "A" },
    { id: 4, name: "Masaru", class: "C" }
];

var columns = [
    { header: "ID", key: "id", defaultSorting: "ASC", headerStyle: {fontSize: "20px", backgroundColor: "red" }, dataStyle: {fontSize: "15px"} },
    { header: "NAME", key: "name", headerStyle: {fontSize: "20px"} },
    { header: "CLASS", key: "class", headerStyle: {fontSize: "20px"} }
];

var style = {
    backgroundColor: "#ccc"
};

React.render(<SortableTable style={style} data={data} columns={columns} />, document.body);
