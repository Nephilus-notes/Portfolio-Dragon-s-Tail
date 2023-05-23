export class StatusFlag {
    name: string;
    active: boolean;
    rounds: number;
  
    constructor(name: string, active: boolean = false, rounds: number = 0) {
      this.name = name;
      this.active = active;
      this.rounds = rounds;
    }
  }