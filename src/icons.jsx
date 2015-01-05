/** @jsx React.DOM */

'use strict'

var React = require("react");

var SortIconBoth = React.createClass({
    render: function () {
        return (
            <FaIcon icon="fa-sort" style={this.props.style} />
        );
    }
});

var SortIconAsc = React.createClass({
    render: function () {
        return (
            <FaIcon icon="fa-sort-asc" style={this.props.style} />
        );
    }
});

var SortIconDesc = React.createClass({
    render: function () {
        return (
            <FaIcon icon="fa-sort-desc" style={this.props.style} />
        );
    }
});

var FaIcon = React.createClass({
    render: function () {
        var className = "fa fa-lg ";
        className += this.props.icon;
        return (
            <i className={className} style={this.props.style} align="right" />
        );
    }
});

exports.SortIconBoth = SortIconBoth;
exports.SortIconDesc = SortIconDesc;
exports.SortIconAsc = SortIconAsc;
