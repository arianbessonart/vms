
import {
  LOAD_REPORT,
  LOAD_REPORT_SUCCESS,
} from './constants';

export function loadReports() {
  return {
    type: LOAD_REPORT,
  };
}

export function reportsLoaded(reports) {
  return {
    type: LOAD_REPORT_SUCCESS,
    reports,
  };
}
