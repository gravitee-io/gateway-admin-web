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
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'oauth2',
  template: require('./oauth2.component.html'),
  styles: [require('./oauth2.component.scss')],
})
export class Oauth2Component implements OnChanges {
  @Input()
  clientId: string;

  @Output()
  clientIdChange = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`change`, changes);
  }
}
