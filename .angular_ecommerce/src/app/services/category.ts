export class Category {
    _id: string;  
    name: string;
    description: string;
    image: string;
    isChecked:boolean;
    __v: number; 
  
    constructor(name: string, description: string, image: string, _id: string, isChecked:boolean, __v: number) {
      this.name = name;
      this.description = description;
      this.image = image;
      this._id = _id;
      this.isChecked = isChecked;
      this.__v = __v;
    }
  }
  