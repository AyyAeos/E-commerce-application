
//add message
export interface Message {
  fromName: string;
  message: string;
  timestamp?: number | string;
}

//add user 
export interface SystemMessage {
  isSystem: boolean;
  message: string[] | string;
}
