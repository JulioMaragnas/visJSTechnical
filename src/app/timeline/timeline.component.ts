import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Timeline, TimelineOptions, VisDataSet } from './visjs.index';
import { TimelineService } from './timeline.service';
import { data } from './campaings.metadata';

@Component({
  selector: 'app-timeline',
  template: /*html*/`
      <section class="animated fadeIn timeline-chart" id="timeline" #timeline></section>
  `,
  styles: [`
      #timeline{
        width: 1200px;
        height: 500px;
      }
  `]
})
export class TimelineComponent implements OnInit {
  @ViewChild('timeline') $timeline: ElementRef;
  // Declaracion de propiedades
  timeline: Timeline;
  brandParam: any;
  dataset: VisDataSet<any>;
  groups: any = [];
  options: TimelineOptions;
  brandsByCompany: any = [];
  campaignsByCategory: any;
  brandSelected = '';

  // options
  
  // options


  constructor(
    private _timeline: TimelineService
  ) {
    this.options = {
      margin: {
        axis: 25,
        item: 0
      },
      editable: {
        add: true,
        remove: false,
        overrideItems: false,
        updateTime: true,
      },
      height: '100%',
      locale: 'es-ES',
      orientation: {
        axis: 'top',
        item: 'top'
      },
      onAdd: () => false,
      onUpdate: (a) => {
        const { campaign } = this.groups.find(c => c.id === a['group']);
        // this._temp.notifyChange(true, a['group'], a['title'], campaign);
      },
      onMoving: () => false,
    }
   }

  ngOnInit() {
    this.getCampaigns();
  }

  async getCampaigns() {
    try {
      // getting data from API
      this.campaignsByCategory = await this._timeline.getInformation();
  
      // const campanas = data.map((x,index) => ({
      //   content: x.idCampana,
      //   start: x.datFecInicial,
      //   end: x.datFecFinal,
      //   id: x.idCampana,
      //   type: 'background',
      //   style: `background-color:${index % 2 === 0 ? 'gba(230, 240, 240, 0.65)': 'rgba(220, 230, 230, 0.65)' }`,
      // }))

      // this.campaignsByCategory.items = [...this.campaignsByCategory.items.map(y => ({...y, type: 'box'})), ...campanas];

      this.dataset = new VisDataSet([...this.campaignsByCategory.items]);
      this.groups = [...this.campaignsByCategory.groups];
      this.timeline = new Timeline(this.$timeline.nativeElement, this.dataset, this.groups, this.options);

    } catch (error) { console.log(error); }
  }

}
