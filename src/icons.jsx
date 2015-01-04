/** @jsx React.DOM */

'use strict'

var React = require("react");

var SortIconBoth = React.createClass({
    render: function () {
        return (
            <FaIcon icon="fa-sort" />
        );
    }
});

var SortIconAsc = React.createClass({
    render: function () {
        return (
            <FaIcon icon="fa-sort-asc" />
        );
    }
});

var SortIconDesc = React.createClass({
    render: function () {
        return (
            <FaIcon icon="fa-sort-desc" />
        );
    }
});

var FaIcon = React.createClass({
    render: function () {
        var className = "fa fa-lg ";
        className += this.props.icon;
        return (
            <i className={className} />
        );
    }
});

exports.SortIconBoth = SortIconBoth;
exports.SortIconDesc = SortIconDesc;
exports.SortIconAsc = SortIconAsc;
