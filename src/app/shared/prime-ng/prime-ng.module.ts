import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

import { ToastModule } from 'primeng/toast';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ImageModule } from 'primeng/image';

import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ListboxModule } from 'primeng/listbox';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ChipModule } from 'primeng/chip';

import { TabMenuModule } from 'primeng/tabmenu';

import { ConfirmDialogModule } from 'primeng/confirmdialog';


import { MessagesModule } from 'primeng/messages';


import { InputSwitchModule } from 'primeng/inputswitch';
import { ScrollerModule } from 'primeng/scroller';
import { TreeTableModule } from 'primeng/treetable';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { BlockUIModule } from 'primeng/blockui';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DataViewModule } from 'primeng/dataview';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';


import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardModule,
    PanelModule,
    PanelMenuModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    ToastModule,
    BreadcrumbModule,
    TableModule,
    BadgeModule,
    TagModule,
    DialogModule,
    ToolbarModule,
    ImageModule,
    AccordionModule,
    FileUploadModule,
    GalleriaModule,
    ListboxModule,
    FieldsetModule,
    PasswordModule,
    DividerModule,
    CheckboxModule,
    SkeletonModule,
    DropdownModule,
    DynamicDialogModule,
    ChipModule,
    TabMenuModule,
    ConfirmDialogModule,
    MessagesModule,
    InputSwitchModule,
    ScrollerModule,
    TreeTableModule,
    ProgressSpinnerModule,
    BlockUIModule,
    MultiSelectModule,
    OverlayPanelModule,
    AvatarModule,
    AvatarGroupModule,
    DataViewModule,
    CalendarModule,
    InputNumberModule,
    RadioButtonModule
  ],


  providers: [
    DialogService
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimeNgModule { }
