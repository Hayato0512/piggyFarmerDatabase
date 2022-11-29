export interface PigData {
  key: string;
  data: Data;
}

export interface Data {
  personInfo: PersonInfo;
  pigInfo: PigInfo;
  Location: Location;
  extraNotes: string;
  timeAndDate: string;
  status: string;
}
export interface PersonInfo {
  name: string;
  phone: string;
}

export interface PigInfo {
  breed: string;
  pid: number;
}

export interface Location {
  name: string;
}
