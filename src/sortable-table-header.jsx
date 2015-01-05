/** @jsx React.DOM */

'use strict'

var React = require("react");

var icons = require("./icons");
var SortIconBoth = icons.SortIconBoth;
var SortIconDesc = icons.SortIconDesc;
var SortIconAsc = icons.SortIconAsc;

var SortableTableHeader = React.createClass({
    propTypes: {
        columns: React.PropTypes.array.isRequired,
        sortings: React.PropTypes.array.isRequired,
        onStateChange: React.PropTypes.func,
        iconStyle: React.PropTypes.object
    },
        
    onClick: function (index) {
        this.props.onStateChange(index);
    },

    render: function () {
        var headers = this.props.columns.map(function (column, index) {
            var sorting = this.props.sortings[index];
            return (
                <SortableTableHeaderItem sortable={column.sortable} key={index} index={index} header={column.header} sorting={sorting} onClick={this.onClick} style={column.headerStyle} iconStyle={this.props.iconStyle} />
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
    getDefaultProps: function () {
        return {
            sortable: true
        };
    },
    
    onClick: function (e) {
        if (this.props.sortable)
            this.props.onClick(this.props.index);
    },

    render: function () {
        var sortIcon;
        if (this.props.sortable) {
            sortIcon = <SortIconBoth style={this.props.iconStyle} />;
            if (this.props.sorting == "desc") {
                sortIcon = <SortIconDesc style={this.props.iconStyle} />;
            } else if (this.props.sorting == "asc") {
                sortIcon = <SortIconAsc style={this.props.iconStyle} />;
            }
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
