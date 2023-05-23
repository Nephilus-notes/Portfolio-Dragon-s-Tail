export class StatusFlag {
    name: string;
    resetFunction: Function;
    active: boolean;
    rounds: number;
    useFunction: Function|null;
  
    constructor(name: string, resetFunction:Function|null = null, useFunction: Function|null = null, active: boolean = false, rounds: number = 0) {
      this.name = name;
      this.active = active;
      this.rounds = rounds;
      if (resetFunction == null) {
          this.resetFunction = this.reset;
      } else {
          this.resetFunction = resetFunction;
      }
        this.useFunction = useFunction;
    }

    public reset() {
        this.active = false;
        this.rounds = 0;
    }

    public setStatus(rounds: number) {
        this.active = true;
        this.rounds = rounds;
    }
  }