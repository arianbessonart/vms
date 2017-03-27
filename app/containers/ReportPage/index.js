import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { selectMainReport } from '../App/selectors';
import { loadReports } from './actions';

class ReportPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.fetchReports();
  }

  render() {
    const { report } = this.props;
    return (
      <div>
        <LineChart width={900} height={300} data={report}
                   margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="month"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey="2014" stroke="#00BFFF" activeDot={{r: 6}}/>
          <Line type="monotone" dataKey="2015" stroke="#F542A1" activeDot={{r: 6}}/>
          <Line type="monotone" dataKey="2016" stroke="#42F54E" activeDot={{r: 6}}/>
          <Line type="monotone" dataKey="2017" stroke="#000000" activeDot={{r: 6}}/>
          <Line type="monotone" dataKey="2018" stroke="#F7663E" activeDot={{r: 6}}/>
          <Line type="monotone" dataKey="2019" stroke="#82ca9d" activeDot={{r: 6}}/>
        </LineChart>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchReports: () => {
      dispatch(loadReports());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  report: selectMainReport(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage);
