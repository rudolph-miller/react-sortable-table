import { Component, PropTypes } from 'react';
import SortableTableHeader from './sortable-table-header';
import SortableTableBody from './sortable-table-body';

export default class SortableTable extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    style: PropTypes.object,
    iconStyle: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state =  {
      sortings: this.getDefaultSortings(props)
    };
  }

  getDefaultSortings(props) {
    return props.columns.map((column) => {
      let sorting = "both";
      if (column.defaultSorting) {
        const defaultSorting = column.defaultSorting.toLowerCase();

        if (defaultSorting == "desc") {
          sorting = "desc";
        } else if (defaultSorting == "asc") {
          sorting = "asc";
        }
      }
      return sorting;
    });
  }

  sortData(data, sortings) {
    let sortedData = this.props.data;
    for (var i in sortings) {
      const sorting = sortings[i];
      const column = this.props.columns[i];
      const key = this.props.columns[i].key;
      switch (sorting) {
        case "desc":
          if (column.descSortFunction &&
              typeof(column.descSortFunction) == "function") {
          sortedData = column.descSortFunction(sortedData, key);
        } else {
          sortedData = this.descSortData(sortedData, key);
        }
        break;
        case "asc":
          if (column.ascSortFunction &&
              typeof(column.ascSortFunction) == "function") {
          sortedData = column.ascSortFunction(sortedData, key);
        } else {
          sortedData = this.ascSortData(sortedData, key);
        }
        break;
      }
    }
    return sortedData;
  }

  ascSortData(data, key) {
    return this.sortDataByKey(data, key, ((a, b) => {
      if ( this.parseFloatable(a) && this.parseFloatable(b) ) {
        a = this.parseIfFloat(a);
        b = this.parseIfFloat(b);
      }
      if ( a >= b ) {
        return 1;
      } else if ( a < b) {
        return -1;
      }
    }).bind(this));
  }

  descSortData(data, key) {
    return this.sortDataByKey(data, key, ((a, b) => {
      if ( this.parseFloatable(a) && this.parseFloatable(b) ) {
        a = this.parseIfFloat(a);
        b = this.parseIfFloat(b);
      }
      if ( a <= b ) {
        return 1;
      } else if ( a > b) {
        return -1;
      }
    }).bind(this));
  }

  parseFloatable(value) {
    return ( typeof(value) === "string" && ( /^\d+$/.test(value) || /^\d+$/.test(value.replace(/[,.%$]/g, "")) ) ) ? true : false;
  }

  parseIfFloat(value) {
    return parseFloat(value.replace(/,/g, ""));
  }

  sortDataByKey(data, key, fn) {
    const clone = Array.apply(null, data);

    return clone.sort((a, b) => {
      return fn(a[key], b[key]);
    });
  }

  onStateChange(index) {
    const sortings = this.state.sortings.map(((sorting, i) => {
      if (i == index)
        sorting = this.nextSortingState(sorting);

      return sorting;
    }).bind(this));

    this.setState({
      sortings
    });
  }

  nextSortingState(state) {
    let next;
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
  }

  render() {
    const sortedData = this.sortData(this.props.data, this.state.sortings);

    return (
      <table
        className="table"
        style={this.props.style} >
        <SortableTableHeader
          columns={this.props.columns}
          sortings={this.state.sortings}
          onStateChange={this.onStateChange.bind(this)}
          iconStyle={this.props.iconStyle} />
        <SortableTableBody
          columns={this.props.columns}
          data={sortedData}
          sortings={this.state.sortings} />
      </table>
    );
  }
}
