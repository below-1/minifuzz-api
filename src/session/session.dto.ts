import { IsDefined, Min, Max, IsDate, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { IOutput } from './output.model';

export class OutputDTO implements IOutput {
  @IsDefined()
  @Min(0)
  @Max(7)
  consequence: number;

  @IsDefined()
  @Min(0)
  @Max(1)
  confidence: number;
}

export class CreateSessionDTO {

  @IsDefined()
  @Min(0)
  @Max(50)
  matchMakingPerDay: number;

  @IsDefined()
  @Min(0)
  @Max(24)
  increaseDuration: number;

  @IsDefined()
  @Min(0)
  @Max(10)
  runwayIntensity: number;

  @IsDefined()
  @Min(0)
  @Max(10)
  angerWhenStopped: number;

  @IsDefined()
  @Min(0)
  @Max(10)
  desireToReplay: number;

  @IsDefined()
  @Min(0)
  @Max(10)
  sideEffectAwareness: number;

  @IsDefined()
  @Min(0)
  @Max(10)
  procrastination: number;

  @IsDefined()
  @Min(0)
  @Max(1000000)
  gamingCost: number;

  @IsDefined()
  @IsArray()
  @ValidateNested()
  outputs: OutputDTO[];

  @Type(() => Date)
  @IsDefined()
  @IsDate()
  start: string;

  @Type(() => Date)
  @IsDefined()
  @IsDate()
  end: string;
}