import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class ReportPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
  }

  render() {

    const data = [
      {month: 'January', 2017: 4000, 2016: 2400},
      {month: 'February', 2017: 3000, 2016: 1398},
      {month: 'March', 2017: 2000, 2016: 9800},
      {month: 'April', 2017: 2780, 2016: 3908},
      {month: 'May', 2017: 1890, 2016: 4800},
      {month: 'June', 2017: 2390, 2016: 3800},
      {month: 'July', 2017: 3490, 2016: 4300},
      {month: 'August', 2017: 3490, 2016: 4300},
      {month: 'September', 2017: 3490, 2016: 4300},
      {month: 'October', 2017: 3490, 2016: 4300},
      {month: 'November', 2016: 4300},
      {month: 'December', 2016: 4300},
    ];


    return (
      <div>
        <LineChart width={900} height={300} data={data}
                   margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="month"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey="2016" stroke="#8884d8" activeDot={{r: 8}}/>
          <Line type="monotone" dataKey="2017" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
  };
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage);
