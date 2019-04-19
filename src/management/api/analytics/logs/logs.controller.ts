/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import ApiService, { LogsQuery } from '../../../../services/api.service';
import { StateService } from '@uirouter/core';
import _ = require('lodash');

class ApiLogsController {

  private api: any;
  private logs: {total: string; logs: any[], metadata: any};
  private query: LogsQuery;
  private metadata: {
    applications: any[],
    plans: any[];
    tenants?: any[];
  };
  private init: boolean;

  constructor(
    private ApiService: ApiService,
    private resolvedApi,
    private plans: any,
    private applications: any,
    private tenants: any,
    private $scope,
    private Constants,
    private $state: StateService
  ) {
  'ngInject';
    this.ApiService = ApiService;
    this.$scope = $scope;
    this.api = resolvedApi.data;
    this.metadata = {
      applications: applications.data,
      plans: plans.data
    };

    let hasTenants = _.chain(this.api.proxy.groups)
      .map((group) =>  group.endpoints)
      .find((endpoint) => _.has(endpoint, 'tenants'));

    if (hasTenants !== undefined) {
      this.metadata.tenants = tenants.data;
    }

    this.onPaginate = this.onPaginate.bind(this);

    this.query = new LogsQuery();
    this.query.size = 15;
    this.query.page = 1;
    this.query.from = this.$state.params['from'];
    this.query.to = this.$state.params['to'];
    this.query.query = this.$state.params['q'];
    this.query.field = '-@timestamp';

    this.$scope.$watch('logsCtrl.query.field', (field) => {
      if (field && this.init) {
        this.refresh();
      }
    });
  }

  timeframeChange(timeframe) {
    this.init = true;
    this.query.from = timeframe.from;
    this.query.to = timeframe.to;
    this.query.page = 1;
    this.refresh();
  }

  onPaginate(page) {
    this.query.page = page;
    this.refresh();
  }

  refresh() {
    this.ApiService.findLogs(this.api.id, this.query).then((logs) => {
      this.logs = logs.data;
    });
  }

  getMetadata(id) {
    return this.logs.metadata[id];
  }

  filtersChange(filters) {
    this.query.page = 1;
    this.query.query = filters;
    this.refresh();
  }

  exportAsCSV() {
    this.ApiService.exportLogsAsCSV(this.api.id, this.query).then((response) => {
      let hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:attachment/csv,' + response.data;
      hiddenElement.target = '_self';
      let fileName = 'logs-' + this.api.name + '-' + this.api.version + '-' + _.now();
      fileName = fileName.replace(/[\s]/gi, '-');
      fileName = fileName.replace(/[^\w]/gi, '-');
      hiddenElement.download = fileName + '.csv';
      hiddenElement.click();
      document.body.removeChild(hiddenElement);
    });
  }
}

export default ApiLogsController;
