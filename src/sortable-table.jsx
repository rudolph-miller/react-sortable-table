/** @jsx React.DOM */

'use strict'

var React = require("react");

var SortableTableHeader = require("./sortable-table-header");
var SortableTableBody = require("./sortable-table-body");

var SortableTable = React.createClass({
    getInitialState: function () {
        var sortings = this.getDefaultSortings();
        var sortedData = this.sortData(this.props.data, sortings);
        
        return {
            sortings: sortings,
            data: sortedData
        };
    },

    getDefaultSortings: function () {
        return this.props.columns.map(function (column) {
            var sorting = "both";
            if (column.defaultSorting) {
                var defaultSorting = column.defaultSorting.toLowerCase();
                
                if (defaultSorting == "desc") {
                    sorting = "desc";
                } else if (defaultSorting == "asc") {
                    sorting = "asc";
                }
            }
            return sorting;
        });
    },

    sortData: function (data, sortings) {
        var sortedData = this.props.data;
        for (var i in sortings) {
            var sorting = sortings[i];
            var key = this.props.columns[i].key;
            switch (sorting) {
                case "desc":
                    sortedData = this.descSortData(sortedData, key);
                    break;
                case "asc":
                    sortedData = this.ascSortData(sortedData, key);
                    break;
            }
        }
        return sortedData;
    },

    ascSortData: function (data, key) {
        return this.sortDataByKey(data, key, function (a, b) {
            if ( a >= b ) {
                return 1;
            } else if ( a < b) {
                return -1;
            }
        });
    },

    descSortData: function (data, key) {
        return this.sortDataByKey(data, key, function (a, b) {
            if ( a <= b ) {
                return 1;
            } else if ( a > b) {
                return -1;
            }
        });
    },
    
    sortDataByKey: function (data, key, fn) {
        var clone = Array.apply(null, data);
        return clone.sort(function (a, b) {
            return fn(a[key], b[key]);
        });
    },
    
    onStateChange: function (index) {
        var sortings = this.state.sortings.map(function (sorting, i) {
            if (i == index)
                sorting = this.nextSortingState(sorting);
            return sorting;
        }.bind(this));
        var sortedData = this.sortData(this.props.data, sortings);
        this.setState({
            sortings: sortings,
            data: sortedData
        });
    },
    
    nextSortingState: function (state) {
        var next;
        switch (state) {
            case "both":
                next = "desc";
                break;
            case "desc":
                next = "asc";
                break;
            case "asc":
                next= "both"
                break;
        }
        return next;
    },
    
    render: function () {
        return (
            <table className="table">
                <SortableTableHeader columns={this.props.columns} sortings={this.state.sortings} onStateChange={this.onStateChange}/>
                <SortableTableBody columns={this.props.columns} data={this.state.data} sortings={this.state.sortings} />
            </table>
        );
    }
});


var data = [
    { id: 3, name: "Satoshi", class: "B" },
    { id: 1, name: "Taro", class: "A" },
    { id: 2, name: "Ken", class: "A" },
    { id: 4, name: "Masaru", class: "C" }
];

var columns = [
    { header: "ID", key: "id", defaultSorting: "ASC", headerStyle: {fontSize: "20px"}, itemStyle: {fontSize: "15px"} },
    { header: "NAME", key: "name", headerStyle: {fontSize: "20px"} },
    { header: "CLASS", key: "class", headerStyle: {fontSize: "20px"} }
];

React.render(<SortableTable data={data} columns={columns} />, document.body);

module.exports = SortableTable
