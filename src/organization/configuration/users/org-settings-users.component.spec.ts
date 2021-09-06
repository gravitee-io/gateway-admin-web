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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { OrganizationSettingsModule } from '../organization-settings.module';
import { OrgSettingsUsersComponent } from './org-settings-users.component';

describe('OrgSettingsUsersComponent', () => {
  let component: OrgSettingsUsersComponent;
  let fixture: ComponentFixture<OrgSettingsUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OrganizationSettingsModule],
    });
    fixture = TestBed.createComponent(OrgSettingsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init correctly', () => {
    expect(component).toBeTruthy();
  });
});
