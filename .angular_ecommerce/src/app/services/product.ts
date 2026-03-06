export class Product {
    _id!: string;
    name!: string;
    description?: string;  
    category!: {
      _id: string;
      name: string;
      description?: string;
    };
    price!: number;
    stock!: number;
    images!: string[];
    rating?: number; 
  
    constructor(data: any) {
      this._id = data._id;
      this.name = data.name;
      this.description = data.description || '';
      this.category = {
        _id: data.category?._id || '',
        name: data.category?.name || '',
        description: data.category?.description || ''
      };
      this.price = data.price;
      this.stock = data.stock;
      this.images = data.images || [];
      this.rating = data.rating || 0;
    }
  }
  