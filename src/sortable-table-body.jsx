/** @jsx React.DOM */

'use strict'

var React = require("react");

var SortableTableBody = React.createClass({
    render: function () {
        var bodies = this.props.data.map(function (item, index) {
            return (
                <SortableTableRow key={index} data={item} columns={this.props.columns} />
            );
        }.bind(this));
        
        return (
            <tbody>
                {bodies}
            </tbody>
        );
    }
});

var SortableTableRow = React.createClass({
    render: function () {
        var tds = this.props.columns.map(function (item, index) {
            var value = this.props.data[item.key];
            return (
                <td key={index} style={item.dataStyle}>{value}</td>
            );
        }.bind(this));
            
        return (
            <tr>
                {tds}
            </tr>
        );
    }
});

module.exports = SortableTableBody;
