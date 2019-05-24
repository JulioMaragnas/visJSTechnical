import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(
    private _http: HttpClient
  ) { }

  async getInformation () {
    try {
      return await this._http.get(environment.service)
      .pipe(
        map(prj => ({
          groups: [
            // @ts-ignore
            ...prj.map(p => ({
              id: Number(p.Id),
              content: `Campaña ${p['IdObject']}`,
              title: `${p.Name}`,
              campaign: p['IdObject'] || null
            }))
          ],
          items: [
            ...prj
              // @ts-ignore
              .map(pr=> ({...pr, Items: pr.Items && pr.Items.map( x => ({...x, idProject: pr.idProject}))}))
              .flatMap(p => ([
                ...p.Items && p.Items
                .filter(i => i.EstimatedEndDate && i.EstimatedInitialDate)
                .map(item => ({
                  align: 'center',
                  content: `${item.Description}`,
                  end: item.EstimatedEndDate,
                  group: p.Id,
                  idTask: item.Id,
                  start: item.EstimatedInitialDate,
                  style: `background-color: ${item.Color}; color: white;`,
                  title: `${item.Description}`
                }))
              ]))
          ]
        }))
      )
      .toPromise();

    } catch (error) {
      
    }
  }
}
