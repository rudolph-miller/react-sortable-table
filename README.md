# Sortable Table in React.js

[![npm version](https://badge.fury.io/js/react-sortable-table.svg)](http://badge.fury.io/js/react-sortable-table)

<font color='red'>※It's not installable. I'll fix it. See https://github.com/Rudolph-Miller/react-sortable-table/issues/4 </font>

# Feature

- Simple API
- Customizable style
- Customizable sorting functions

__This component is depends on [Font Awesome](http://fortawesome.github.io/Font-Awesome/)__  
Please activate Font Awosome. [Get started with Font Awosome](http://fortawesome.github.io/Font-Awesome/get-started/)    
[LICENSE of Font Awesome](http://fortawesome.github.io/Font-Awesome/license/)

# Example

https://gh-pages.rudolph-miller.com/react-sortable-table/
- ID: default sorting
- NAME: custom sorting function that sort names by the family name
- CLASS: unsortable

# Install

```
npm install react-sortable-table
```

# Usage

```js
import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';
import SortableTable from 'react-sortable-table';

function getFamilyName(name) {
  return name.split(" ").slice(-1)[0]
}

const FamilyNameSorter = {
  desc: (data, key) => {
    var result = data.sort(function (_a, _b) {
      const a = getFamilyName(_a[key]);
      const b = getFamilyName(_b[key]);
      if ( a <= b ) {
        return 1;
      } else if ( a > b) {
        return -1;
      }
    });
    return result;
  },

  asc: (data, key) => {
    return data.sort(function (_a, _b) {
      const a = getFamilyName(_a[key]);
      const b = getFamilyName(_b[key]);
      if ( a >= b ) {
        return 1;
      } else if ( a < b) {
        return -1;
      }
    })
  }
};


class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [
        { id: 3, name: "Satoshi Yamamoto", class: "B" },
        { id: 1, name: "Taro Tanak", class: "A" },
        { id: 2, name: "Ken Asada", class: "A" },
        { id: 4, name: "Masaru Tokunaga", class: "C" }
      ]
    };
  }

  render() {
    const columns = [
      {
        header: "ID",
        key: "id",
        defaultSorting: "ASC",
        headerStyle: { fontSize: "15px", backgroundColor: "#FFDAB9", width: "100px" },
        dataStyle: { fontSize: "15px", backgroundColor: "#FFDAB9"}
      },
      {
        header: "NAME",
        key: "name",
        headerStyle: { fontSize: "15px" },
        descSortFunction: FamilyNameSorter.desc,
        ascSortFunction: FamilyNameSorter.asc
      },
      {
        header: "CLASS",
        key: "class",
        headerStyle: { fontSize: "15px" },
        sortable: false
      }
    ];

    const style = {
      backgroundColor: "#eee"
    };

    const iconStyle = {
      color: "#aaa",
      paddingLeft: "5px",
      paddingRight: "5px"
    };

    return (
      <SortableTable
        data={this.state.data}
        columns={columns}
        style={style}
        iconStyle={iconStyle} />
    );
  }
}

render(<App />, document.getElementById('app'));
```

# PropTypes

- data: React.PropTypes.array.isRequired
- columns: React.PropTypes.array.isRequired

# Copyright

Copyright (c) 2015 Rudolph-Miller (chopsticks.tk.ppfm@gmail.com)

#License

Licensed under the MIT License.
