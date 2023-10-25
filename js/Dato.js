class Dato {
  constructor(desc, val) {
    this._desc = desc;
    this._val = val;
  }
  get desc() {
    return this._desc;
  }
  get val() {
    return this._val;
  }
  set desc(desc) {
    this._desc = desc;
  }
  set val(val) {
    this.val = val;
  }
}
