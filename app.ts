const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
const defaultRouter = '/api/v1';

interface TimeInfo {
  readonly createdAt: Date | number | string;
  updatedAt: Date | number | string;
  deletedAt: Date | number | string;
}

interface Product {
  id: number;
  name: string;
  purchasePrice: number;
  tradePrice: number;
  brand: string;
  category: string;
  quantityStock: number;
  lowStockWarning: number;
  timeInfo: TimeInfo
}

const mockedProducts: Product[] = [
  {
    id: 1,
    name: "skol 600",
    purchasePrice: 5.25,
    tradePrice: 10.00,
    brand: "skol",
    category: "beer",
    quantityStock: 45,
    lowStockWarning: 20,
    timeInfo: {
      createdAt: new Date(),
      updatedAt: 0,
      deletedAt: 0
    }
  },
  {
    id: 2,
    name: "skol 1l",
    purchasePrice: 4.25,
    tradePrice: 10.00,
    brand: "skol",
    category: "beer",
    quantityStock: 45,
    lowStockWarning: 20,
    timeInfo: {
      createdAt: new Date(),
      updatedAt: 0,
      deletedAt: 0
    }
  },
  {
    id: 3,
    name: "itaipava 600",
    purchasePrice: 5.25,
    tradePrice: 10.00,
    brand: "itaipava",
    category: "beer",
    quantityStock: 60,
    lowStockWarning: 20,
    timeInfo: {
      createdAt: new Date(),
      updatedAt: 0,
      deletedAt: 0
    }
  },
  {  
    id: 4,
    name: "itaipava lata",
    purchasePrice: 2.25,
    tradePrice: 5.00,
    brand: "skol",
    category: "beer",
    quantityStock: 45,
    lowStockWarning: 20,
    timeInfo: {
      createdAt: new Date(),
      updatedAt: 0,
      deletedAt: 0
    }
  },
  {  
    id: 5,
    name: "coca-cola lata",
    purchasePrice: 3.00,
    tradePrice: 5.00,
    brand: "coca-cola",
    category: "refrigerante",
    quantityStock: 100,
    lowStockWarning: 30,
    timeInfo: {
      createdAt: new Date(),
      updatedAt: 0,
      deletedAt: 0
    }
  }
];

//middleware for access a body requests
app.use(express.json());

// GET - return all products registered
app.get(`${defaultRouter}/products`, (req: any, res: any): void => {
  res.status(200).json({
    status: 'success',
    data: {
      products: mockedProducts,
      size: mockedProducts.length
    }
  });
});

// GET:id - return a specif product
app.get(`${defaultRouter}/products/:id`, (req: any, res: any): void => {
  console.log(req.params);

  const id = parseInt(req.params.id, 10);

  const found: Product | undefined = mockedProducts.find(el => el.id === id);

  if(!found) {
    res.status(404).json({
      status: "not found",
      message: `Product with ID ${id} not found!`
    })
  };

  res.status(200).json({
    status: "success",
    data: {
      product: found
    }
  });
});

// POST - create a product
app.post(`${defaultRouter}/products`, (req: any, res: any): void => {

  const newId = mockedProducts.length + 1;
  
  mockedProducts.push(Object.assign({
    id: newId
  }, req.body));

  res.status(200).json({
    status: "success",
    data: {
      message: "Product created with success!"
    }
  });
});

// PATCH:id - update part of object
app.patch(`${defaultRouter}/products/:id`, (req: any, res: any): void => {
  const id = parseInt(req.params.id, 10);
  const found: Product | undefined = mockedProducts.find(el => el.id === id);

  if(!found) {
    res.status(404).json({
      status: "not found",
      data: {
        message: `Product with ID ${id} not found!`
      }
    })
  };

  console.log(id);

  res.status(200).json({
    status: "success",
    data: {
      message: `Product with ID ${id} updated with success!`
    }
  });
  
});

// DELETE:id delete product
app.delete(`${defaultRouter}/products/:id`, (req: any, res: any): void => {
  const id = parseInt(req.params.id, 10);
  const found: Product | undefined = mockedProducts.find(el => el.id === id);

  if(!found) {
    res.status(404).json({
      status: "not found",
      data: {
        message: `Product with ID ${id} not found!`
      }
    })
  };

  console.log(id);

  res.status(204).json({
    status: "success",
    data: null
  });
  
});

app.listen(port, (): void => {
  console.log(`App running in port ${port}...`);
});