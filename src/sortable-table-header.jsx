/** @jsx React.DOM */

'use strict'

var React = require("react");

var icons = require("./icons");
var SortIconBoth = icons.SortIconBoth;
var SortIconDesc = icons.SortIconDesc;
var SortIconAsc = icons.SortIconAsc;

var SortableTableHeader = React.createClass({
    onClick: function (index) {
        this.props.onStateChange(index);
    },

    render: function () {
        var headers = this.props.columns.map(function (column, index) {
            var sorting = this.props.sortings[index];
            return (
                <SortableTableHeaderItem key={index} index={index} header={column.header} sorting={sorting} onClick={this.onClick} style={column.headerStyle} />
            );
        }.bind(this));
        
        return (
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
        );
    }
});

var SortableTableHeaderItem = React.createClass({
    onClick: function (e) {
        this.props.onClick(this.props.index);
    },

    render: function () {
        var sortIcon = <SortIconBoth />;
        if (this.props.sorting == "desc") {
            sortIcon = <SortIconDesc />;
        } else if (this.props.sorting == "asc") {
            sortIcon = <SortIconAsc />;
        }

        return (
            <th style={this.props.style} onClick={this.onClick}>
                {this.props.header}
                {sortIcon}
            </th>
        );
    }
});

module.exports = SortableTableHeader;
