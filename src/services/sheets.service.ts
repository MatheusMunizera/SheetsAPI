import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Service } from "../core/base/service";
import { SheetsResponseMapper } from "../core/domain/mappers/sheets/sheets-response.mapper";
import { SheetsMapper } from "../core/domain/mappers/sheets/sheets.mapper";
import { SheetsRepository } from "../core/repositories/sheet.repository";
import { SheetsResponseDto } from "../shared/dtos/sheets/sheets-response.dto";
import { SheetsDto } from "../shared/dtos/sheets/sheets.dto";





@Injectable()
export class SheetsService implements Service<SheetsDto>{

    private sheetsMapper: SheetsMapper;
    private sheetsResponseMapper: SheetsResponseMapper;



    constructor(private readonly repository: SheetsRepository) {
        this.sheetsMapper = new SheetsMapper();
        this.sheetsResponseMapper = new SheetsResponseMapper();
    }


    public postSheets(sheets: SheetsDto): Observable<SheetsResponseDto> {
        let entity = this.sheetsMapper.mapFrom(sheets);


        return this.repository.create(entity)
            .pipe(map(this.sheetsResponseMapper.mapTo))
    }

    public getAllSheets(): Observable<SheetsResponseDto[]> {
       return this.repository.getAll().pipe(
        map(data => data.map(this.sheetsResponseMapper.mapTo))
       )
    }



}