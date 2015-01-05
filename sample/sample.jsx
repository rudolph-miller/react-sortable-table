/** @jsx React.DOM */

'use strict'
var React = require("react");

var SortableTable = require("../../react-sortable-table");


var SortedTableSample = React.createClass({
    getInitialState: function () {
        return {
            data: [
                { id: 3, name: "Satoshi", class: "B" },
                { id: 1, name: "Taro", class: "A" },
                { id: 2, name: "Ken", class: "A" },
                { id: 4, name: "Masaru", class: "C" }
            ]
        };
    },

    render: function () {
        var columns = [
            { header: "ID", key: "id", defaultSorting: "ASC", headerStyle: {fontSize: "15px", backgroundColor: "#FFDAB9", width: "100px" }, dataStyle: {fontSize: "15px", backgroundColor: "#FFDAB9"} },
            { header: "NAME", key: "name", headerStyle: {fontSize: "15px"}, sortable: false },
            { header: "CLASS", key: "class", headerStyle: {fontSize: "15px"} }
        ];

        var style = {
            backgroundColor: "#eee"
        };

        var iconStyle = {
            color: "#aaa",
            paddingLeft: "5px",
            paddingRight: "5px"
        };
        return (
            <SortableTable data={this.state.data} columns={columns} style={style} iconStyle={iconStyle} />
        );
    }
});


React.render(<SortedTableSample />, document.body);
