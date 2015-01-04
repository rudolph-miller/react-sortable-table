var React = require("react");


var SortableTable = React.createClass({
    getInitialState: function () {
        var columns = this.setDefaultSorting(this.props.columns);
        return {
            data: this.props.data,
            columns: columns
        };
    },

    setDefaultSorting: function (columns) {
        return columns.map(function (column) {
            var sorting = "both";
            if (column.defaultSorting) {
                var defaultSorting = column.defaultSorting.toLowerCase();
                
                if (defaultSorting == "desc") {
                    sorting = "desc";
                } else if (defaultSorting == "asc") {
                    sorting = "asc";
                }
            }

            return {
                header: column.header,
                sorting: sorting,
                headerStyle: column.headerStyle
            };
        });
    },

    onStateChange: function (index) {
        this.setState({
            columns: this.state.columns.map(function (column, i) {
                var sorting = column.sorting;
                if (i == index)
                    sorting = this.nextSortingState(sorting);
                return {
                    header: column.header,
                    sorting: sorting,
                    headerStyle: column.headerStyle
                };
            }.bind(this))
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
                <SortableTableHeaderRow columns={this.state.columns} onStateChange={this.onStateChange}/>
            </table>
        );
    }
});

var SortableTableHeaderRow = React.createClass({
    onClick: function (index) {
        this.props.onStateChange(index);
    },

    render: function () {
        var headers = this.props.columns.map(function (column, index) {
            return (
                <SortableTableHeader key={index} index={index} header={column.header} sorting={column.sorting} onClick={this.onClick} />
            );
        }.bind(this));
        
        return (
            <tr>
                {headers}
            </tr>
        );
    }
});

var SortableTableHeader = React.createClass({
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

var data = [
    { id: 1, name: "Taro", class: "A" },
    { id: 2, name: "Ken", class: "A" },
    { id: 3, name: "Satoshi", class: "B" },
    { id: 4, name: "Masaru", class: "C" }
];

var columns = [
    { header: "ID", key: "id", defaultSorting: "ASC", headerStyle: {fontSize: "20px"}, itemStyle: {fontSize: "15px"} },
    { header: "NAME", key: "name", headerStyle: {fontSize: "20px"} },
    { header: "CLASS", key: "class", headerStyle: {fontSize: "20px"} }
];

React.render(<SortableTable data={data} columns={columns} />, document.body);

module.exports = SortableTable
